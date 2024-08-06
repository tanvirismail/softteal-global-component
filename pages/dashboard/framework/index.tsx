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
  Card,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
// routes
import { PATH_DASHBOARD } from '@/routes';
import { PATH_DEVICE } from '@/routes';
// hooks
import useSettings from '../../../hooks/useSettings';
// @types
// _mock_
import { _userList } from '../../../_mock';
// layouts
import Layout from '../../../layouts';
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
import SvgIconStyle from '@/_global/components/SvgIconStyle';
import cssStyles from '@/_global/utils/cssStyles';
import Image from '@/_global/components/Image';
import { ShopFilterSidebar, ShopProductSearch, ShopProductSort } from '@/_global/sections/@dashboard/e-commerce/shop';
import { FormProvider } from 'react-hook-form';

import orderBy from 'lodash/orderBy';
// form
import { useForm } from 'react-hook-form';

// redux
import { useDispatch, useSelector } from '@/_global/redux/store';
import { getProducts, filterProducts } from '@/_global/redux/slices/product';

// @types
import { Product, ProductFilter } from '@/_global/@types/product';
import NewFramework from '@/_global/sections/@dashboard/framework/NewFramework';


// ----------------------------------------------------------------------

DeviceFrameworkList.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------
const OverlayStyle = styled('div')(({ theme }) => ({
  ...cssStyles().bgBlur({ blur: 2, color: theme.palette.primary.lighter }),
  top: 0,
  zIndex: 8,
  content: "''",
  width: '100%',
  height: '100%',
  position: 'absolute',
}));

export default function DeviceFrameworkList() {
  const { themeStretch } = useSettings();

  const dispatch = useDispatch();

  const [openFilter, setOpenFilter] = useState(false);

  const { products, sortBy, filters } = useSelector((state) => state.product);

  const filteredProducts = applyFilter(products, sortBy, filters);

  const defaultValues = {
    gender: filters.gender,
    category: filters.category,
    colors: filters.colors,
    priceRange: filters.priceRange,
    rating: filters.rating,
  };

  const methods = useForm({
    defaultValues,
  });

  const { reset, watch, setValue } = methods;

  const values = watch();

  const min = values.priceRange[0];

  const max = values.priceRange[1];

  const isDefault =
    min === 0 &&
    max === 200 &&
    !values.rating &&
    values.gender.length === 0 &&
    values.colors.length === 0 &&
    values.category === 'All';

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(filterProducts(values));
  }, [dispatch, values]);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    if (openFilter) {
      handleCloseFilter();
    }
    reset({
      gender: [],
      category: 'All',
      colors: [],
      priceRange: [0, 200],
      rating: '',
    });
  };

  const handleRemoveGender = (value: string) => {
    const newValue = filters.gender.filter((item) => item !== value);
    setValue('gender', newValue);
  };

  const handleRemoveCategory = () => {
    setValue('category', 'All');
  };

  const handleRemoveColor = (value: string) => {
    const newValue = filters.colors.filter((item) => item !== value);
    setValue('colors', newValue);
  };

  const handleRemovePrice = () => {
    setValue('priceRange', [0, 200]);
  };

  const handleRemoveRating = () => {
    setValue('rating', '');
  };


  const [newDialog, setNewDialog] = useState(false);


  return (
    <Page title="Framework List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Framework List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Framework', href: PATH_DASHBOARD.framework.index },
            { name: 'List' },
          ]}
          action={
            
            <Button onClick={()=>setNewDialog(true)} variant="contained" startIcon={<Iconify icon={'eva:plus-fill'} />}>
              New
            </Button>
           
          }
        />
         <NewFramework open={newDialog} setOpen={setNewDialog}/>

        <Stack
          spacing={2}
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ sm: 'center' }}
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <ShopProductSearch />

          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <FormProvider methods={methods}>
              <ShopFilterSidebar
                isDefault={isDefault}
                isOpen={openFilter}
                onOpen={handleOpenFilter}
                onClose={handleCloseFilter}
                onResetAll={handleResetFilter}
              />
            </FormProvider>

            <ShopProductSort />
          </Stack>
        </Stack>

        <Box
          sx={{
            display: 'grid',
            gap: 3,
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            },
          }}
        >

          <Card sx={{ textAlign: 'center' }}>
            <Box sx={{ position: 'relative' }}>
              <SvgIconStyle
                src="/global-assets/assets/shape-avatar.svg"
                sx={{
                  width: 80,
                  height: 36,
                  zIndex: 10,
                  left: 0,
                  right: 0,
                  bottom: -15, 
                  mx: 'auto',
                  position: 'absolute',
                  color: 'background.paper',
                }}
              />
              <Avatar
                alt=""
                src="#"
                sx={{
                  width: 32,
                  height: 32,
                  zIndex: 11,
                  left: 0,
                  right: 0,
                  bottom: -16,
                  mx: 'auto',
                  position: 'absolute',
                }}
              />
              <OverlayStyle />
              <Image src="#" alt="" ratio="16/9" />
            </Box>
            <Stack sx={{ display: 'flex', textAlign: 'left', mt: 4, p: 2.5, alignItems: 'center', flexDirection: 'row' }}>
              <Box sx={{ flexGrow: 1, minWidth: 0, pr: 3 }}>
                <Typography variant="subtitle1" >
                  Test framework
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  IOT Platform
                </Typography>
              </Box>
              {/* <Button variant="contained" >
                Get
              </Button> */}
            </Stack>
          </Card>

        </Box>

      </Container>
    </Page>
  );
}
// ----------------------------------------------------------------------

function applyFilter(products: Product[], sortBy: string | null, filters: ProductFilter) {
  // SORT BY
  if (sortBy === 'featured') {
    products = orderBy(products, ['sold'], ['desc']);
  }
  if (sortBy === 'newest') {
    products = orderBy(products, ['createdAt'], ['desc']);
  }
  if (sortBy === 'priceDesc') {
    products = orderBy(products, ['price'], ['desc']);
  }
  if (sortBy === 'priceAsc') {
    products = orderBy(products, ['price'], ['asc']);
  }
  // FILTER PRODUCTS
  if (filters.gender.length > 0) {
    products = products.filter((product) => filters.gender.includes(product.gender));
  }
  if (filters.category !== 'All') {
    products = products.filter((product) => product.category === filters.category);
  }
  if (filters.colors.length > 0) {
    products = products.filter((product) =>
      product.colors.some((color) => filters.colors.includes(color))
    );
  }

  const min = filters.priceRange[0];
  const max = filters.priceRange[1];

  if (min !== 0 || max !== 200) {
    products = products.filter((product) => product.price >= min && product.price <= max);
  }

  if (filters.rating) {
    products = products.filter((product) => {
      const convertRating = (value: string) => {
        if (value === 'up4Star') return 4;
        if (value === 'up3Star') return 3;
        if (value === 'up2Star') return 2;
        return 1;
      };
      return product.totalRating > convertRating(filters.rating);
    });
  }
  return products;
}
