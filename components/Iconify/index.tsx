// icons
import { Icon, IconifyIcon, addIcon, addCollection } from '@iconify/react/offline';
// @mui
import { Box, BoxProps, SxProps } from '@mui/material';
import FluentIcon from './fluent';
import EvaIcon from './eva';
import SolarIcon from './solar';
import RIIcons from './ri';
import BXIcons from './bx';
import LucideIcons from './lucide';
import UimIcons from './uim';
import FAIcons from './fa';
import GalaIcons from './gala';
import ICIcons from './ic';
import CarbonIcons from './carbon';
import TablerIcons from './tabler';
import Fa6solidIcons from './fa6-solid';
import AntDesignIcons from './ant-design';

// ----------------------------------------------------------------------

export const IconList:any = {
    eva: EvaIcon,
    solar: SolarIcon,
    fluent: FluentIcon,
    ri: RIIcons,
    bx: BXIcons,
    lucide: LucideIcons,
    uim: UimIcons,
    fa: FAIcons,
    gala: GalaIcons,
    ic: ICIcons,
    carbon: CarbonIcons,
    tabler: TablerIcons,
    'fa6-solid': Fa6solidIcons,
    'ant-design': AntDesignIcons,
};

let IconNames:any = [];
Object.entries(IconList).map(([k,v]:any)=>{
    IconNames.push(
        ...((Object.keys(v.icons)).map(el => v.prefix + ':' + el))
    );
    addCollection(v);
});
export const IconNameList = IconNames;

interface Props extends BoxProps {
  sx?: SxProps;
  icon: IconifyIcon | string;
}

export default function Iconify({ icon, sx, ...other }: Props) {
  return <Box component={Icon} icon={icon} sx={{ ...sx }} {...other} />;
}
