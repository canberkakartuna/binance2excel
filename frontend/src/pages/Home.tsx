import React, {useContext, useEffect, useState} from "react";
import UploadInput from "../components/shared/UploadInput";
import { UploadContext } from "../context/uploadContext";
import backIcon from "../assets/arrow_back.svg";
import ReactTooltip from 'react-tooltip';

const Home = () => {
  const {busy, errorStatus, setFile, setErrorStatus, setBusy} = useContext(UploadContext);
  const [counter, setCounter] = useState(1);

  const resetError = () => {
    setErrorStatus(false);
    setFile(null);
    setBusy(false);
  }

  useEffect(() => {
    if(busy){
      if(counter > 3) {
        setCounter(1);
      }
  
      const timeout = setTimeout(() => {
        setCounter(counter + 1);
      }, 1000);
  
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [counter, busy]);

  return (
  <div className="flex flex-col h-screen justify-center text-white">
    {
      (busy && !errorStatus) ? (
        <div className="text-2xl m-auto w-96 font-bold">
            <span>Your File Is Being Processed</span>
            <span>{'.'.repeat(counter)}</span>
        </div>
      ) : (
        errorStatus ? (
          <div className="text-2xl m-auto w-96 font-bold text-center">
            <div className="flex">
              <img
                data-tip
                data-for='back'
                src={backIcon}
                alt="back"
                className="mr-2 cursor-pointer"
                onClick={resetError}
              />
              <ReactTooltip id='back' type='warning'>
                <span>Back to upload</span>
              </ReactTooltip>
              <span>Something went wrong</span>
            </div>
          </div>
        ) : (
          <div className="items-center text-center">
            <h1 className="text-5xl mb-5">Binance2Excel</h1>
            <p className="text-2xl font-light mb-5">
              This tool allows you to convert your Binance trade history into an Excel
            </p>
            <UploadInput />
          </div>
        )
      )
    }
  </div>
  );
}

export default Home;
