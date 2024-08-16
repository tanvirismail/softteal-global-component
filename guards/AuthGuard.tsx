import { useState, ReactNode, useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// hooks
import useAuth from '../hooks/useAuth';
import Login from '../pages/auth/login';
// components
import LoadingScreen from '@/_global/components/LoadingScreen';

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
};

export default function AuthGuard({ children }: Props) {
  const { isAuthenticated, isInitialized } = useAuth();

  const { pathname, push } = useRouter();

  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);
  const [host, setHost] = useState<string | null>(null);

  useEffect(() => {
    const host = window.location.host;
    setHost(host + (process.env.PUBLIC_BASEPATH || ''));  
  },[]);

  const redirectToExternalDomain = (url:string) => {
    window.location.replace(url);
  };

  useEffect(() => {
    if (requestedLocation && pathname !== requestedLocation) {
      push(requestedLocation);
    }
    if (isAuthenticated) {
      setRequestedLocation(null);
    }
  }, [isAuthenticated, pathname, push, requestedLocation]);

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    if (process.env.AUTHSERVER_HOST && host !== process.env.AUTHSERVER_HOST) {
      // redirect to authserver login route
      redirectToExternalDomain(process.env.AUTHSERVER_HOST + '/auth/login')
      return <></>
    } else {
      return <Login />;
    }
  }

  return <>{children}</>;
}
