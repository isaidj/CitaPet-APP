import React, {createContext} from 'react';
const PrincipalContext = createContext();
export const PrincipalProvider = ({children}) => {
  const data = {};
  return (
    <PrincipalContext.Provider value={data}>
      {children}
    </PrincipalContext.Provider>
  );
};
export default PrincipalContext;
