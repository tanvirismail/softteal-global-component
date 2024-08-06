import { useContext } from 'react';
import { SettingsContext } from '@/_global/contexts/SettingsContext';

// ----------------------------------------------------------------------

const useSettings = () => useContext(SettingsContext);

export default useSettings;
