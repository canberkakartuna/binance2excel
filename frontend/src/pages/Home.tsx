import React, {useContext, Fragment, useEffect} from "react";
import UploadInput from "../components/shared/UploadInput";
import { UploadContext } from "../context/uploadContext";

const Home = () => {
  const [busy, setBusy] = useContext(UploadContext);

  return (
  <div className="flex flex-col h-screen justify-center items-center text-center">
    {
      busy ? (
        <div><h1>Uploading...</h1></div>
      ) : (
        <div>
          <h1 className="text-5xl text-white mb-5">Binance2Excel</h1>
          <p className="text-2xl text-white font-light mb-5">
            This tool allows you to convert your Binance trade history into an Excel
          </p>
          <UploadInput />
        </div>
      )
    }
  </div>
  );
}

export default Home;
