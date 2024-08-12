import jwtDecode from 'jwt-decode';
// routes
import { PATH_AUTH } from '../routes/paths';
//
import axios from './axios';
import ModuleList from '@/config/ModuleList';

// ----------------------------------------------------------------------

const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode<{ exp: number }>(accessToken);

  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

const handleTokenExpired = (exp: number) => {
  // eslint-disable-next-line prefer-const
  let expiredTimer;

  const currentTime = Date.now();

  // Test token expires after 10s
  // const timeLeft = currentTime + 10000 - currentTime; // ~10s
  const timeLeft = exp * 1000 - currentTime;

  clearTimeout(expiredTimer);

  expiredTimer = setTimeout(() => {
    alert('Token expired');

    localStorage.removeItem('accessToken');

    window.location.href = PATH_AUTH.login;
  }, timeLeft);
};

const setSession = (accessToken: string | null) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    // send push message for anoher module
    if(ModuleList.length > 0) {
      ModuleList.map((moduleData, index) => {
        const iframe:any = document.getElementById(`crossDomainIframe-${index}`);
        iframe?.contentWindow?.postMessage({ key: 'accessToken', value: accessToken }, moduleData.url);
      });
    }

    // This function below will handle when token is expired
    const { exp } = jwtDecode<{ exp: number }>(accessToken); // ~3 days by minimals server
    handleTokenExpired(exp);
  } else {
    // send push message for anoher module
    if(ModuleList.length > 0) {
      ModuleList.map((moduleData, index) => {
        const iframe:any = document.getElementById(`crossDomainIframe-${index}`);
        if(iframe) {
          iframe?.contentWindow?.postMessage({ key: 'accessToken', value: null }, moduleData.url);
        }
      });
    }
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

export { isValidToken, setSession };
