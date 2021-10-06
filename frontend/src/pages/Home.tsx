import React, {useContext, useEffect, useState} from "react";
import UploadInput from "../components/shared/UploadInput";
import { UploadContext } from "../context/uploadContext";

const Home = () => {
  const {busy, errorStatus} = useContext(UploadContext);
  const [counter, setCounter] = useState(1);

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
              <span>Something went wrong</span>
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
