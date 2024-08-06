import { Fragment, useCallback, useEffect, useState } from 'react';
// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// @mui
import {
  Button,
  Container,
  TableCell,
  Avatar,
  Typography,
  Stack,
  TextField,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Switch,
  Grid,
  Box,
  Autocomplete,
  CircularProgress,
  Dialog,
  DialogTitle,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
// routes
import { PATH_DASHBOARD } from '@/routes/paths';
import { PATH_DEVICE } from '@/routes';
// hooks
import useSettings from '@/_global/hooks/useSettings';
// @types
// _mock_
import { _userList } from '@/_global/_mock';
// layouts
import Layout from '@/_global/layouts';
// components
import Page from '@/_global/components/Page';
import Iconify from '@/_global/components/Iconify';
import HeaderBreadcrumbs from '@/_global/components/HeaderBreadcrumbs';
import axios from '@/_global/utils/axios';
import qs from 'qs';
import Label from '@/_global/components/Label';
import Datatable from '@/_global/Ncomponents/datatable/datatable';
import TableActionCell from '@/_global/Ncomponents/datatable/TableActionCell';
import { DatePicker, DateTimePicker, LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import moment, { Moment } from 'moment';
import dayjs, { Dayjs } from 'dayjs';
import download from 'downloadjs';
import { paramCase } from 'change-case';
// ----------------------------------------------------------------------

UserList.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------


export default function UserList() {
  const { push } = useRouter();

  const theme = useTheme();
  const { themeStretch } = useSettings();
  const [checkbox, setCheckbox] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [recordsTotal, setRecordsTotal] = useState(0);
  const [recordsFiltered, setRecordsFiltered] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const tableHead = [
    { name: 'first_name', label: 'Name', align: 'left' }, // width, minWidth
    { name: 'email', label: 'Email', align: 'left' },
    { name: 'username', label: 'Username', align: 'left' },
    { name: 'status', label: 'Status', align: 'left' },
    { name: '' },
  ];
  const [queryParams, setQueryParams] = useState({
    start: 0,
    length: 5,
    search: {
      value: "",
      name: "",
      status: "",
      isActive: false,
      multipleSelect: {}
    },
    columns: [
      {
        data: "first_name",
      },
      {
        data: "last_name",
      },
      {
        data: "email",
      },
      {
        data: "username",
      },
      {
        data: "status",
      },
      {
        data: "created_at",
        searchable: "false",
      },
      {
        data: "action",
        searchable: "false",
        orderable: "false",
      },
    ],
    order: [
      // {
      //   column: 'first_name',
      //   dir: "desc" // desc // asc
      // }
    ],
  });

  const handleStart = (value:any) => {
    setQueryParams({...queryParams, start: value });
  }
  const handleRowsPerPage = (value:any) => {
    setQueryParams({...queryParams, length: value });
  }
  const handleSearch = (value:any) => {
    setQueryParams({...queryParams, start: 0, search: {value: value} });
  }
  const handleOrderBy = (value:any) => {
    setQueryParams({...queryParams, order: value });
  }

  const getData = useCallback(async () => {
    setIsLoading(true)
    try {
      // const response = {
      //   draw: 0,
      //   recordsTotal: 200,
      //   recordsFiltered: 15,
      //   data: data
      // }

      const response = await axios.get('/api/user/datatable' + "?" + qs.stringify(queryParams));     
      const resData = response.data.data;
       
      setTableData(resData.rows);
      setRecordsFiltered(resData.count);
      setRecordsTotal(resData.recordsTotal);
      setIsLoading(false)

    } catch (error) {
      console.log(error);
    }
  }, [ queryParams ]);

  useEffect(() => {
    getData();
  }, [queryParams]);


  // edit action
  const handleEditRow = (id: string) => {
    push(PATH_DEVICE.device.edit(id));
  };
  // edit action

  // delete action
  const handleDeleteRow = async(id: string) => {
    console.log(id);
    console.log("delete");
    return true
  };
  const handleDeleteRows = (selected: string[]) => {
    console.log(selected);
    console.log("multiple delete");
    return true
  };
  // delete action

  // export report
  const handleFileExport = async(type:string) => {
    console.log( "call api for "+type );
    try {
      if(type == 'pdf'){
        const response = await axios.get('/api/export/pdf',{
          responseType: "arraybuffer",
        });
        download( new Blob([response.data]), "invoice.pdf" ); 
      }
      else if(type == 'csv'){
        const response = await axios.get('/api/export/csv',{
          responseType: "arraybuffer",
        });
        download( new Blob([response.data]), "invoice.csv" ); 
      }
      else if(type == 'xlsx'){
        const response = await axios.get('/api/export/xlsx',{
          responseType: "arraybuffer",
        });
        download( new Blob([response.data]), "invoice.xlsx" ); 
      }
      else if(type == 'html'){
        push(PATH_DEVICE.device.deviceExportHtml)
      }
    } catch (error) {
      console.log(error);
    }
    return true;
  }
  // export report

  // filter
  /** select */
  const optionsStatus = [
    { label: "All", value: "all" },
    { label: "Active", value: "active", id: 1 },
    { label: "Inactive", value: "inactive", id: 0 }
  ];
  const [filterStatus, setFilterStatus] = useState('all');
  const onFilterStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterStatus(event.target.value);
    setQueryParams({...queryParams, search: { ...queryParams.search, status: event.target.value } });
  };
  /** select */

  /** multiple Select */
  const [multipleSelect, setMultipleSelect] = useState<string[]>([]);
  const multipleOptions = [
    { label: "HTML", value: "html", id: 1 },
    { label: "PHP", value: "php", id: 2 },
    { label: "JS", value: "js", id: 3 }
  ];
  const handleMultipleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setMultipleSelect( typeof value === 'string' ? value.split(',') : value );
    setQueryParams({...queryParams, search: { ...queryParams.search, multipleSelect: multipleSelect } });
  };
  /** multiple Select */
  
  /** Asynchronous Select */ 
  // const [asyncSelectvalue, setAsyncSelectValue] = useState<any>([]);
  // const [asyncSelectInputValue, setAsyncSelectInputValue] = useState('');
  const [asynchronousSelectData] = useState([
    { id: 1, value: 'sdf sdfsd'  },
    { id: 2, value: 'fgh fg hgf'  },
    { id: 3, value: 'dfgrre ere'  },
    { id: 4, value: 'ewewedgg  gd'  },
    { id: 5, value: 'xcv cf'  },
  ]);
  function sleep(delay = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }
  interface OptionI {
    id: number;
    value: string;
  }
  const [asynchronousSelectOpen, setAsynchronousSelectOpen] = useState(false);
  const [asynchronousSelectOptions, setAsynchronousSelectOptions] = useState<readonly OptionI[]>([]);
  const loading = asynchronousSelectOpen && asynchronousSelectOptions.length === 0;
  useEffect(() => {
    let active = true;
    if (!loading) {
      return undefined;
    }
    (async () => {
      await sleep(1e3); // For demo purposes.
      if (active) {
        setAsynchronousSelectOptions([...asynchronousSelectData]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);
  useEffect(() => {
    if (!asynchronousSelectOpen) {
      setAsynchronousSelectOptions([]);
    }
  }, [asynchronousSelectOpen]);
  /** Asynchronous Select */

  /** text */
  const [filterName, setFilterName] = useState('');
  const handleFilterName = (value: string) => {
    setFilterName(value);
    setQueryParams({...queryParams, search: { ...queryParams.search, name: value } });
  };
  /** text */

  /** switch */
  const [checkSwitch, setCheckSwitch] = useState(false);
  const handleSwitchChange = () => {
    setCheckSwitch( !checkSwitch );
    setQueryParams({...queryParams, search: { ...queryParams.search, isActive: !checkSwitch } });
  };
  /** switch */

  /** date */
  const [dateValue, setDateValue] = useState<Dayjs | null>( dayjs('2022-04-17') );
  /** date */

  const resetFilterForm = () => {
    setFilterStatus("");
    setFilterName("");
    setCheckSwitch( false );
    setMultipleSelect([])
    setQueryParams({...queryParams, search: { 
      ...queryParams.search, 
      isActive: false, 
      name: "", 
      status: "", 
      multipleSelect: {} 
    }});
  };
  const requestFilterForm = () => {
    setQueryParams({...queryParams, search: { ...queryParams.search, isActive: checkSwitch, name: filterName, status: filterStatus } });
  };


  const filterFields = () => {
    return (
      <>
        <Box
          sx={{
            display: 'grid',
            columnGap: 2,
            rowGap: 2,
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
          }}
        >
          <TextField
            fullWidth
            select
            label="Status"
            value={filterStatus}
            onChange={onFilterStatus}
            SelectProps={{
              MenuProps: {
                sx: { '& .MuiPaper-root': { maxHeight: 260 } },
              },
            }}
            sx={{
              maxWidth: { sm: 240 },
              textTransform: 'capitalize',
            }}
            size='small'
          >
            {optionsStatus.map((option, key) => (
              <MenuItem
                key={key}
                value={option.value}
                sx={{
                  mx: 1,
                  my: 0.5,
                  borderRadius: 0.75,
                  typography: 'body2',
                  textTransform: 'capitalize',
                }}
              >
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            value={filterName}
            onChange={(event) => handleFilterName(event.target.value)}
            placeholder="Search user..."
            label="User"
            size='small'
          />
          <TextField
            fullWidth
            select
            label="Languages"
            value={multipleSelect}
            onChange={handleMultipleSelect}
            SelectProps={{
              multiple: true,
              MenuProps: {
                sx: { '& .MuiPaper-root': { maxHeight: 260 } },
              },
            }}
            sx={{
              width: "100%",
              maxWidth: { sm: 240 },
              textTransform: 'capitalize',
            }}
            size='small'
          >
            {multipleOptions.map((option, key) => (
              <MenuItem
                key={key}
                value={option.value}
                sx={{
                  mx: 1,
                  my: 0.5,
                  borderRadius: 0.75,
                  typography: 'body2',
                  textTransform: 'capitalize',
                }}
              >
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <FormGroup>
            <FormControlLabel control={<Switch checked={checkSwitch} onChange={handleSwitchChange} />} label="is Active?" labelPlacement="start" />
          </FormGroup>

          <Autocomplete
            id="asynchronous-demo"
            size='small'
            open={asynchronousSelectOpen}
            onOpen={() => {
              setAsynchronousSelectOpen(true);
            }}
            onClose={() => {
              setAsynchronousSelectOpen(false);
            }}
            // defaultValue={asynchronousSelectData[1]}
            // value={asyncSelectvalue}
            onChange={(event: any, newValue: any) => {
              console.log(newValue);
            }}
            // inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              console.log(newInputValue);
            }}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            getOptionLabel={(option) => option.value}
            options={asynchronousSelectOptions}
            loading={loading}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Asynchronous"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <Fragment>
                      {loading ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </Fragment>
                  ),
                }}
              />
            )}
          />
          <Autocomplete
            id="asynchronous-multiple"
            size='small'
            multiple
            open={asynchronousSelectOpen}
            onOpen={() => {
              setAsynchronousSelectOpen(true);
            }}
            onClose={() => {
              setAsynchronousSelectOpen(false);
            }}
            defaultValue={[asynchronousSelectData[1], asynchronousSelectData[2]]}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            getOptionLabel={(option) => option.value}
            options={asynchronousSelectOptions}
            loading={loading}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Asynchronous"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <Fragment>
                      {loading ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </Fragment>
                  ),
                }}
              />
            )}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              format='YYYY-MM-DD'
              // views={['month', 'year']}
              label="Basic date picker"
              value={dateValue} 
              slotProps={{ 
                textField: { 
                  size: 'small',
                  // helperText: 'MM/DD/YYYY',
                },
                actionBar: { actions: ['today','clear'] },
              }} 
              onChange={(newValue) => {
                console.log( dayjs(newValue).format() );
                setDateValue(newValue)
              }} 
            />
            <DateTimePicker 
              label="Basic date time picker" 
              slotProps={{ 
                textField: { 
                  size: 'small',
                },
              }} 
              onChange={(newValue) => {
                  console.log( dayjs(newValue).format() );
              }} 
            />
          </LocalizationProvider>
         
        </Box>
        <Stack justifyContent="flex-end" alignItems="flex-end" spacing={2} direction={{ xs: 'column', sm: 'row' }}  sx={{ mt: 3 }}>
          <Button variant="contained" onClick={requestFilterForm}>Filter</Button>
          <Button variant="text" onClick={resetFilterForm}>Reset</Button>
        </Stack>
      </>
    )
  }
  // filter

  // table reload
  const handleTableReload = () => {
    getData();
  }

  return (
    <Page title="Datatable">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Datatable"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Components' },
            { name: 'Datatable' },
          ]}
        />
        <Datatable
          // options={{search:false,refresh:false}}
          // customToolbar={
          //   <Button variant="contained" sx={{ml:2}} startIcon={<Iconify icon={'eva:plus-fill'} />}>
          //       New
          //   </Button>
          // }
          isLoading={isLoading}
          header={tableHead}
          orderBy={queryParams.order}
          handleOrderBy={handleOrderBy}
          columns={queryParams.columns}
          tableData={tableData}
          recordsTotal={recordsTotal}
          recordsFiltered={recordsFiltered}
          handleSearch={handleSearch}
          getData={getData}
          checkbox={checkbox}
          handleSelectedAction={handleDeleteRows}
          rowsPerPage={queryParams.length}
          handleRowsPerPage={handleRowsPerPage}
          handleFileExport={handleFileExport}
          fileExport={['html','pdf','csv','xlsx']}
          filterFields={filterFields()}
          filterPlaceholder="Search..."
          handleStart={handleStart}
          handleTableReload={handleTableReload}
          rows={(row:any) => {
            const { id, first_name, last_name, username, email, avatar, status } = row;
            return (
              <>
                <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar alt={first_name +' '+ last_name} src={avatar} sx={{ mr: 2 }} />
                  <Typography variant="subtitle2" noWrap>
                    {first_name +' '+ last_name}
                  </Typography>
                </TableCell>
                <TableCell align="left">{email}</TableCell>
                <TableCell align="left">{username}</TableCell>
                <TableCell align="left">
                  <Label
                    variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                    color={(status == '0' && 'error') || 'success'}
                    sx={{ textTransform: 'capitalize' }}
                  >
                    {status == '0' ? 'Inactive' : 'Active'}
                  </Label>
                </TableCell>
                <TableActionCell lists={[
                  {
                    label: "View",
                    icon: <Iconify icon={'eva:eye-outline'} />,
                    action: () => push(PATH_DEVICE.device.view(id)),
                  },
                  {
                    label: "Edit",
                    icon: <Iconify icon={'eva:edit-outline'} />,
                    action: () => push(PATH_DEVICE.device.edit(id)),
                  },
                  {
                    label: "Delete",
                    icon: <Iconify icon={'eva:trash-2-outline'} />,
                    confirm: {title:"Confirmation to Remove!",body:"Are you sure?"},
                    action: () => handleDeleteRow(id),
                    sx: { color: 'error.main' }
                  },
                ]}/>
              </>
            )
          }}
          // sx={{card:{backgroundColor:"transparent", boxShadow: "none"}}}
          // dense={true}
        />
      </Container>
    </Page>
  );
}
// ----------------------------------------------------------------------