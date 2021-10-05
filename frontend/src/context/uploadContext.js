import React, {createContext, useState} from 'react';

export const UploadContext = createContext();

export const UploadProvider = (props) => {
  const [busy, setBusy] = useState(null);
  const [errorStatus, setErrorStatus] = useState(null);

  return (
    <UploadContext.Provider value={{busy, setBusy, errorStatus, setErrorStatus}}>
      {props.children}
    </UploadContext.Provider>
  );
}