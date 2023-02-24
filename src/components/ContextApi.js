import React, { createContext, useContext, useMemo,useState } from 'react';

const Authcontext = createContext({
  auth: false,
  setAuth: () => {}
});

export const Authprovider = ({ children }) => {
 const [auth, setAuth] = useState(false);
 return (
    <Authcontext.Provider value={{auth,setAuth}}>
      {useMemo(() => children, [children])}
    </Authcontext.Provider>
  );
};

export function useAuthContext() {
  return useContext(Authcontext);
}