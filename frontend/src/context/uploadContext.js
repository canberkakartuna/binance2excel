import React, {createContext, useState} from 'react';

export const UploadContext = createContext();

export const UploadProvider = (props) => {
  const [busy, setBusy] = useState(false);

  return (
    <UploadContext.Provider value={[busy, setBusy]}>
      {props.children}
    </UploadContext.Provider>
  );
}