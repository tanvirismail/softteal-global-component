import { useContext } from 'react';
import { CollapseDrawerContext } from '@/_global/contexts/CollapseDrawerContext';

// ----------------------------------------------------------------------

const useCollapseDrawer = () => useContext(CollapseDrawerContext);

export default useCollapseDrawer;
