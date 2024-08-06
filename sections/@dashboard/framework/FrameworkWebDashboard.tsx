
import Iconify from "@/_global/components/Iconify";
import { Box, Button, ButtonGroup, Card, Grid, Paper, styled } from "@mui/material";
import { forwardRef, useState } from "react";
import { _bookingNew, _mapContact } from "@/_global/_mock";

import Label from '@/_global/components/Label';
import Image from '@/_global/components/Image';

// components
import GridLayout, { Responsive as ResponsiveGridLayout, WidthProvider }  from "react-grid-layout";
import "react-grid-layout/css/styles.css";
// widget component
import DisplayLEDWidget from '@/_global/sections/@dashboard/framework/widget/DisplayLEDWidget'
import SwitchWidget from "./widget/SwitchWidget";
import SliderWidget from "./widget/SliderWidget";
import SelectWidget from "./widget/SelectWidget";
import InputTextWidget from "./widget/InputTextWidget";
import InputNumberWidget from "./widget/InputNumberWidget";
import InputPushButtonWidget from "./widget/InputPushButtonWidget";
import InputSegmentedSwitchWidget from "./widget/InputSegmentedSwitchWidget";
import SingleStatWidget from "./widget/SingleStatWidget";
import RadialWidget from "./widget/RadialWidget";
import GaugeWidget from "./widget/GaugeWidget";
import ChartWidget from "./widget/ChartWidget";
import HeatmapChartWidget from "./widget/HeatmapChartWidget";
import MapWidget from "./widget/MapWidget";
import WidgetSlider from "./WidgetSlider";

const ResponsiveGridLayoutStyle = styled(WidthProvider(ResponsiveGridLayout))(({ theme }) => ({
    '.react-grid-layout': {
        position: 'relative',
        transition: 'height 200ms ease',
    },
    '.rgl-bg': {
        position: 'absolute',
        height: '100%',
        left: '10px',
        top: '0',
        right: '10px',
        background: 'linear-gradient(90deg, #f5f5f5 4.16666667%, transparent 4.16666667%, transparent 8.33333333%, #f5f5f5 8.33333333%, #f5f5f5 12.5%, transparent 12.5%, transparent 16.66666667%, #f5f5f5 16.66666667%, #f5f5f5 20.83333333%, transparent 20.83333333%, transparent 25%, #f5f5f5 25%, #f5f5f5 29.16666667%, transparent 29.16666667%, transparent 33.33333333%, #f5f5f5 33.33333333%, #f5f5f5 37.5%, transparent 37.5%, transparent 41.66666667%, #f5f5f5 41.66666667%, #f5f5f5 45.83333333%, transparent 45.83333333%, transparent 50%, #f5f5f5 50%, #f5f5f5 54.16666667%, transparent 54.16666667%, transparent 58.33333333%, #f5f5f5 58.33333333%, #f5f5f5 62.5%, transparent 62.5%, transparent 66.66666667%, #f5f5f5 66.66666667%, #f5f5f5 70.83333333%, transparent 70.83333333%, transparent 75%, #f5f5f5 75%, #f5f5f5 79.16666667%, transparent 79.16666667%, transparent 83.33333333%, #f5f5f5 83.33333333%, #f5f5f5 87.5%, transparent 87.5%, transparent 91.66666667%, #f5f5f5 91.66666667%, #f5f5f5 95.83333333%, transparent 95.83333333%)'
    },
    '.react-grid-item': {
        transition: 'all 200ms ease',
        transitionProperty: 'left, top'
    },
    '.react-grid-item img': {
        pointerEvents: 'none',
        userSelect: 'none',  
    },
    '.react-grid-item.cssTransforms': {
        transitionProperty: 'transform',
    },
    '.react-grid-item.resizing': {
        zIndex: 1,
        willChange: 'width, height',
    },
    '.react-grid-item.react-draggable-dragging': {
        transition: 'none',
        zIndex: 3,
        willChange: 'transform',
    },
    '.react-grid-item.dropping': {
        visibility: 'hidden',
    },
    '.react-grid-item.react-grid-placeholder': {
        background: 'red',
        opacity: 0.2,
        transitionDuration: '100ms',
        zIndex: 2,
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        MsUserSelect: 'none',
        OUserSelect: 'none',
        userSelect: 'none',
        borderRadius: 15
    },
    '.react-grid-item > .react-resizable-handle': {
        position: 'absolute',
        width: '20px',
        height: '20px',
    },
    '.react-grid-item > .react-resizable-handle::after': {
        content: '""',
        position: 'absolute',
        right: '6px',
        bottom: '6px',
        width: '9px',
        height: '9px',
        borderRight: '2px solid #C4CDD5',
        borderBottom: '2px solid #C4CDD5',
    },
    '.react-resizable-hide > .react-resizable-handle': {
        display: 'none',
    },
    '.react-grid-item > .react-resizable-handle.react-resizable-handle-sw': {
        bottom: 0,
        left: 0,
        cursor: 'sw-resize',
        transform: 'rotate(90deg)',
    },
    '.react-grid-item > .react-resizable-handle.react-resizable-handle-se': {
        bottom: 0,
        right: 0,
        cursor: 'se-resize',
    },
    '.react-grid-item > .react-resizable-handle.react-resizable-handle-nw': {
        top: 0,
        left: 0,
        cursor: 'nw-resize',
        transform: 'rotate(180deg)',
    },
    '.react-grid-item > .react-resizable-handle.react-resizable-handle-ne': {
        top: 0,
        right: 0,
        cursor: 'ne-resize',
        transform: 'rotate(270deg)',
    },
    '.react-grid-item > .react-resizable-handle.react-resizable-handle-w, .react-grid-item > .react-resizable-handle.react-resizable-handle-e': {
        top: '50%',
        marginTop: '-10px',
        cursor: 'ew-resize',
    },
    '.react-grid-item > .react-resizable-handle.react-resizable-handle-w': {
        left: 0,
        transform: 'rotate(135deg)',
    },
    '.react-grid-item > .react-resizable-handle.react-resizable-handle-e': {
        right: 0,
        transform: 'rotate(315deg)',
    },
    '.react-grid-item > .react-resizable-handle.react-resizable-handle-n, .react-grid-item > .react-resizable-handle.react-resizable-handle-s': {
        left: '50%',
        marginLeft: '-10px',
        cursor: 'ns-resize',
    },
    '.react-grid-item > .react-resizable-handle.react-resizable-handle-n': {
        top: 0,
        transform: 'rotate(225deg)',
    },
    '.react-grid-item > .react-resizable-handle.react-resizable-handle-s': {
        bottom: 0,
        transform: 'rotate(45deg)',
    },
      
}));

export default function DeviceDashboard() {

    const widgetList = ([
        // input
        { 
            wid: "iw2",
            grid: { w: 3, h: 2, minW: 3, maxW: 6 },
            settings: {
                title: "Switch",
                datastream: "",
                offLable: "OFF",
                onLable: "ON",
                offValue: "0",
                onValue: "1",
                showLable: true,
                hideTitle: false,
                color: "#54D62C",
            },
            dialog: false,
            cover: "/global-assets/assets/widget/input-switch.png",
            widget: (props?:any) => <SwitchWidget 
                closeSettingDialog={closeSettingDialog} 
                onSubmitData={ (id:any,data:any) => updateWidgetSetting(id,data) } 
                {...props}
            />,
        },
        { 
            wid: "iw3",
            grid: { w: 3, h: 2, minW: 3, maxW: 6, maxH:2, minH:2 },
            settings: {
                title: "Segmented Switch",
                datastream: "",
                hideTitle: false,
                option: [
                    {value:"A",label: "apple"},
                    {value:"B",label: "ball"},
                ]
            },
            dialog: false,
            cover: "/global-assets/assets/widget/input-segment-switch.png",
            widget: (props?:any) => <InputSegmentedSwitchWidget 
                closeSettingDialog={closeSettingDialog} 
                onSubmitData={ (id:any,data:any) => updateWidgetSetting(id,data) } 
                {...props}
            />,
        },
        { 
            wid: "iw4",
            grid: { w: 3, h: 2, minW: 3, maxW: 6, maxH:2, minH:2 },
            settings: {
                title: "Push Button",
                datastream: "",
                hideTitle: false
            },
            dialog: false,
            cover: "/global-assets/assets/widget/input-push-button.png",
            widget: (props?:any) => <InputPushButtonWidget 
                closeSettingDialog={closeSettingDialog} 
                onSubmitData={ (id:any,data:any) =>  updateWidgetSetting(id,data) } 
                {...props}
            />,
        },
        { 
            wid: "iw5",
            grid: { w: 3, h: 2, minW: 3, maxW: 6, maxH:2, minH:2 },
            settings: {
                title: "Slider",
                datastream: "",
                step: 1,
                minValue: 4,
                maxValue: 8,
                showValue: true,
                hideTitle: false,
            },
            dialog: false,
            cover: "/global-assets/assets/widget/input-slider.png",
            widget: (props?:any) => <SliderWidget 
                closeSettingDialog={closeSettingDialog} 
                onSubmitData={ (id:any,data:any) => updateWidgetSetting(id,data) } 
                {...props}
            />,
        },
        { 
            wid: "iw6",
            grid: { w: 3, h: 2, minW: 3, maxW: 6, maxH:2, minH:2 },
            settings: {
                title: "Select",
                datastream: "",
                option: [
                    {value:"a",label:"tanvir"},
                    {value:"b",label:"ismail"},
                ],
                hideTitle: false
            },
            dialog: false,
            cover: "/global-assets/assets/widget/input-select.png",
            widget: (props?:any) => <SelectWidget 
                closeSettingDialog={closeSettingDialog} 
                onSubmitData={ (id:any,data:any) => updateWidgetSetting(id,data) } 
                {...props}
            />,
        },
        { 
            wid: "iw7",
            grid: { w: 3, h: 2, minW: 3, maxW: 6, maxH:2, minH:2 },
            settings: {
                title: "Input text",
                datastream: "",
                hideTitle: false
            },
            dialog: false,
            cover: "/global-assets/assets/widget/input-text.png",
            widget: (props?:any) => <InputTextWidget 
                closeSettingDialog={closeSettingDialog} 
                onSubmitData={ (id:any,data:any) =>  updateWidgetSetting(id,data) } 
                {...props}
            />,
        },
        { 
            wid: "iw8",
            grid: { w: 3, h: 2, minW: 3, maxW: 6, maxH:2, minH:2 },
            settings: {
                title: "Input number",
                datastream: "",
                hideTitle: false,
            },
            dialog: false,
            cover: "/global-assets/assets/widget/input-number.png",
            widget: (props?:any) => <InputNumberWidget 
                closeSettingDialog={closeSettingDialog} 
                onSubmitData={ (id:any,data:any) => updateWidgetSetting(id,data) } 
                {...props}
            />,
        },
    
        // output
        { 
            wid: "ow1",
            grid: { w: 3, h: 2, minW: 3, maxW: 6, maxH:2, minH:2 },
            settings: {
                title: "LED",
                datastream: "",
                color: "#54D62C",
            },
            dialog: false,
            cover: "/global-assets/assets/widget/output-led.png",
            widget: (props?:any) => <DisplayLEDWidget 
                closeSettingDialog={closeSettingDialog} 
                onSubmitData={ (id:any,data:any) => updateWidgetSetting(id,data) } 
                {...props}
            />,
        },
        { 
            wid: "ow2",
            grid: { w: 4, h: 3, minW: 4, maxW: 6, maxH:3, minH:3 },
            settings: {
                title: "Single Stat",
                datastream: "",
                icon: "fluent:device-eq-16-filled",
            },
            dialog: false,
            cover: "/global-assets/assets/widget/output-single-stat.png",
            widget: (props?:any) => <SingleStatWidget 
                closeSettingDialog={closeSettingDialog} 
                onSubmitData={ (id:any,data:any) => updateWidgetSetting(id,data) } 
                {...props}
            />,
        },
        { 
            wid: "ow3",
            grid: { w: 4, h: 3, minW: 4, maxW: 6, maxH:3, minH:3 },
            settings: {
                title: "Radial",
                datastream: "",
            },
            dialog: false,
            cover: "/global-assets/assets/widget/output-radial.png",
            widget: (props?:any) => <RadialWidget
                closeSettingDialog={closeSettingDialog} 
                onSubmitData={ (id:any,data:any) => updateWidgetSetting(id,data) } 
                {...props}
            />,
        },
        { 
            wid: "ow4",
            grid: { w: 4, h: 3, minW: 4, maxW: 6, maxH:3, minH:3 },
            settings: {
                title: "Gauge",
                datastream: "",
            },
            dialog: false,
            cover: "/global-assets/assets/widget/output-gauge.png",
            widget: (props?:any) => <GaugeWidget 
                closeSettingDialog={closeSettingDialog} 
                onSubmitData={ (id:any,data:any) => updateWidgetSetting(id,data) } 
                {...props}
            />,
        },
        { 
            wid: "ow5",
            grid: { w: 6, h: 8, minW: 6, maxW: 12, maxH:12, minH:4  },
            settings: {
                title: "Chart",
                subheader: "",
                datastream: [
                    {
                      name: 'Power',
                      datastreamID: "1",
                      color: '#00A100',
                      type: 'column',
                      fill: 'solid',
                    },
                    {
                      name: 'Temperature',
                      datastreamID: "2",
                      color: '#128FD9',
                      type: 'area',
                      fill: 'gradient',
                    },
                    {
                      name: 'Humidity',
                      datastreamID: "3",
                      color: '#FF0000',
                      type: 'line',
                      fill: 'solid',
                    },
                ],

                toolbar: false,
                legend: false,
                dataLabels: false,
                stroke_curve: 'smooth',

            },
            dialog: false,
            cover: "/global-assets/assets/widget/output-chart.png",
            widget: (props?:any) => <ChartWidget 
                closeSettingDialog={closeSettingDialog} 
                onSubmitData={ (id:any,data:any) => updateWidgetSetting(id,data) } 
                {...props}
            />,
        },
        { 
            wid: "ow6",
            grid: { w: 6, h: 8, minW: 6, maxW: 12, maxH:12, minH:4  },
            settings: {
                title: "Heatmap",
                datastream: [
                    {
                      name: 'Power',
                      datastreamID: "1",
                      color: '#00A100',
                    },
                    {
                      name: 'Temperature',
                      datastreamID: "2",
                      color: '#128FD9',
                    },
                    {
                      name: 'Humidity',
                      datastreamID: "3",
                      color: '#FF0000',
                    },
                    {
                      name: 'Mode',
                      datastreamID: "4",
                      color: '#FFB200',
                    },
                ],
                subheader: "",
                inverse: false,
                dataLabels: false,
            },
            dialog: false,
            cover: "/global-assets/assets/widget/output-heatmap.png",
            widget: (props?:any) => <HeatmapChartWidget 
                closeSettingDialog={closeSettingDialog} 
                onSubmitData={ (id:any,data:any) => updateWidgetSetting(id,data) } 
                {...props}
            />,
        },
        // { 
        //     wid: "ow7",
        //     grid: { w: 6, h: 8, minW: 6, maxW: 12, maxH:12, minH:4 },
        //     settings: {
        //         title: "Device 1",
        //         datastream: "",
        //         color: "#229A16",
        //         icon: 'tabler:map-pin-filled',
        //     },
        //     dialog: false,
        //     cover: "/global-assets/assets/widget/output-map.png",
        //     widget: (props?:any) => <MapWidget 
        //         closeSettingDialog={closeSettingDialog} 
        //         onSubmitData={ (id:any,data:any) => updateWidgetSetting(id,data) } 
        //         {...props}
        //     />,
        // },
        // { 
        //     wid: "ow8",
        //     grid: { w: 3, h: 2, minW: 3, maxW: 6, maxH:2, minH:2 },
        //     settings: {
        //         title: "Table",
        //         datastream: "",
        //         color: "#54D62C",
        //     },
        //     dialog: false,
        //     cover: "/global-assets/assets/widget/output-table.png",
        //     widget: (props?:any) => <DisplayLEDWidget 
        //         closeSettingDialog={closeSettingDialog} 
        //         onSubmitData={ (id:any,data:any) => updateWidgetSetting(id,data) } 
        //         {...props}
        //     />,
        // },
     

     
    
    ]);
    const [items, setItems] = useState<any>([]);

    // dialog
    const closeSettingDialog = () => {
        const widget = items.map((item:any) => {
            item.dialog = false;
            return item;
        });
        setItems(widget);
    }
    const onSettingDialog = (key:any)=>{
        const widget = items.map((item:any) => {
            if(item.i == key){
                item.dialog = true;
            }
            return item;
        });
        setItems(widget);
    }
    const updateWidgetSetting = async (id:any,data:any)=>{ 
        const widget = items.map((item:any) => {
            if(item.i == id){
                item.settings = data
            }
            return item;
        });
        setItems(widget);
    }
    // dialog

    const onRemove = (key:any)=>{
        let filteredArray = items.filter((item:any) => item.i !== key)
        setItems(filteredArray);
    }
    const ActionButton = ({i}:any)=>{
        return  <ButtonGroup size="small" color="primary" sx={{
            position: "absolute",
            right: 1,
            top: 1,
        }}>
            <Button key="settings" onClick={()=>onSettingDialog(i)}>
                <Iconify icon="eva:settings-outline" />
            </Button>
            <Button key="trash" color={"error"} onClick={()=>onRemove(i)}>
                <Iconify icon="eva:trash-2-outline" />
            </Button>
        </ButtonGroup>
    }
    const generateDOM = () => {
        return items.map((v:any,k:any)=>(
            <Paper key={v.i} data-grid={v.grid} sx={{bgcolor: "transparent",border:'1px solid #E9FCD4'}}>
                {
                    (widgetList.find(item => item.wid == v.wid))?.widget({
                        inputData: v.settings,
                        dialog: v.dialog, 
                        id: v.i,
                        wid: v.wid
                    })
                }
                <ActionButton i={v.i}/>
            </Paper>
        ))
    }
    const ResizeHandle = forwardRef<HTMLInputElement, { handleAxis?: string }>((props, ref) => {
        const { handleAxis, ...restProps } = props;
        return (
            < Box ref={ref}
                className={`react-resizable-handle react-resizable-handle-${handleAxis}`}
                {...restProps}
            />
        );
    });
   
    // for drag item
    const [wid, setWID] = useState(0);
    const [droppingItem, setDroppingItem] = useState({i: '__dropping-elem__', h:2, w:3 });
    const onDragStart = (i:any, e:any) => {
        e.dataTransfer.setData("text/plain", "");
        const widget = widgetList.find(item => item.wid == i)
        setDroppingItem((old:any)=>{
            return {
                ...old, 
                i: widget?.wid, 
                h:widget?.grid.h, 
                w:widget?.grid.w
            };
        });
    }
    const onDrop = (layout:any, layoutItem:any, _event:any) => {
        const widget = widgetList.find(item => item.wid == layoutItem.i)
        const newProps = {
            ...widget,
            i: widget?.wid + '-n-' + wid.toString(),
            grid: {
                ...widget?.grid,
                x: layoutItem.x,
                y: layoutItem.y
            }
        }
     
        setWID(wid+1);
        setItems((old:any)=>[...old, newProps]);
    }
    // for drag item
   

    return (
        <>
          

            <Box sx={{ 
                // my:2, 
                // overflowY: "scroll", 
                // display: 'flex',
                overflowX: 'scroll',
                display: 'flex',
                flexDirection: 'row',
               
            }}>
                {
                    widgetList.map((WL:any, key:any)=>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            px: 1,
                            flex: '0 0 20%'
  }} key={key}>
                            <Card sx={{ position: 'relative' }}
                                className="droppable-element"
                                draggable={true}
                                unselectable="on"
                                // this is a hack for firefox
                                // Firefox requires some kind of initialization
                                // which we can do by adding this attribute
                                // @see https://bugzilla.mozilla.org/show_bug.cgi?id=568313
                                onDragStart={ (e:any) => onDragStart( WL.wid, e) }
                            >
                                <Image src={ WL.cover } sx={{ borderRadius: 1.5 }} />
                            </Card>
                        </Box>
                    )
                }
            </Box>


            <Card sx={{mb:3,p:2,position:'relative',minHeight:400}}>
                <Paper sx={{position: 'absolute',
                    display: 'grid',
                    columnGap: 1,
                    gridTemplateColumns: 'repeat(12, 1fr)',
                    left: '26px',
                    top: '26px',
                    right: '26px',
                    bottom: '26px',
                }} >
                    {
                        [...Array(12)].map((v,k)=>(
                            <Box key={k} sx={{bgcolor:'grey.100'}}/>
                        ))
                    }
                </Paper>
                <ResponsiveGridLayoutStyle
                    className="layout"
                    breakpoints={{ lg: 1200 }}
                    cols={{ lg: 12 }}
                    rowHeight={50}
                    isResizable={true}
                    // onLayoutChange={(data) => console.log(data) }
                    // onResize={(data)=>console.log(data)}
                    resizeHandles={[ "se" ]}
                    resizeHandle={<ResizeHandle />}
                    isDroppable={true}
                    onDrop={onDrop}
                    droppingItem={droppingItem}
                    sx={{minHeight:400}}
                >
                    { generateDOM() }
                </ResponsiveGridLayoutStyle>
            </Card>


        

        </>
    )    
}
