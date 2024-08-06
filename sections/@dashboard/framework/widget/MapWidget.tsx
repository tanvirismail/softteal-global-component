// @mui
import { Card, CardHeader, Box, CardProps } from '@mui/material';
// components
import ReactApexChart, { BaseOptionChart } from '@/_global/components/chart';
import WidgetSettingDialog from '../dialog/WidgetSettingDialog';
import GoogleMapReact from 'google-map-react';
import Iconify, { IconList } from '@/_global/components/Iconify';
// ----------------------------------------------------------------------

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  chartLabels: string[];
  chartData: {
    name: string;
    type: string;
    fill?: string;
    data: number[];
    unit?: string;
    color?: string;
  }[];
}

export default function MapWidget({
  dialog=false, 
  closeSettingDialog, 
  onSubmitData, 
  id,
  wid,
  inputData,
}: any) {

  const defaultProps = {
    center: { lat: 23.693745, lng: 90.480639 },
    zoom: 15
  };



  const renderMarkers = (map:any, maps:any) => {

    const position = { lat: 23.693745, lng: 90.480639 }; // from datastream
    const lastAccess = "2023-12-12 00:00:00"; // from datastream

    const icon = (inputData.icon).split(":");

    let pinSvgString = "";
    if( (icon[0] in IconList) && (icon[1] in IconList[icon[0]].icons) ){

      const selectedIcon = IconList[icon[0]];
      const width = selectedIcon.width;
      const height = selectedIcon.height;
      let body = (selectedIcon.icons[icon[1]].body).replace('currentColor', inputData.color);

      pinSvgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
        ${body}
      </svg>`;
      
    }
    const blob = new Blob([pinSvgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    const marker = new maps.Marker({
        map,
        position: position,
        title: inputData.title,
        zIndex: 1,
        animation: maps.Animation.DROP,
        icon: {
          url: url,
          // size: new maps.Size(32,32),
          scaledSize: new maps.Size(32,32)
        }
    });
    const contentString = `
        <div id="content">
            <h2 id="firstHeading" class="firstHeading">${inputData.title}</h2>
            <div id="bodyContent">
                <p>${position.lat}:${position.lng}</p>
                <p>Last access: ${lastAccess}</p>
            </div>
        </div>
    `;
    const infowindow = new maps.InfoWindow({
        content: contentString, 
        ariaLabel: "Uluru",
    });
    const getInfowindow = ()=>{
        infowindow.open({
            anchor: marker,
            map,
        });
    };
    getInfowindow();
    marker.addListener('click', () => getInfowindow());
  };
  
  return (
    <>
       <WidgetSettingDialog 
        open={dialog} 
        setOpen={closeSettingDialog}
        onSubmitData={(data:any)=>onSubmitData(id,data)}
        data={inputData}
        wid={wid}
        title="Map Settings"
        subtitle=""
      />

      <Card>
        <div style={{ height: '450px', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyBKu88idwPB0qzp_t3cKXsdfo1a6MteTDk" }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
                yesIWantToUseGoogleMapApiInternals
            />
        </div>
      </Card>
    </>
  );
}
