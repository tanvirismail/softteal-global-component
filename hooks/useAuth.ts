import { useContext } from 'react';
//
import { AuthContext } from '@/_global/contexts/JWTContext';
// import { AuthContext } from '@/_global/contexts/Auth0Context';
// import { AuthContext } from '@/_global/contexts/FirebaseContext';
// import { AuthContext } from '@/_global/contexts/AwsCognitoContext';

// ----------------------------------------------------------------------

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error('Auth context must be use inside AuthProvider');

  return context;
};

export default useAuth;
