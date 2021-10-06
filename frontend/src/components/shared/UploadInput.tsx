import React, {useContext, useRef, useState} from "react";
import TestDataServices from "../../services/test.service";
import {UploadContext} from "../../context/uploadContext";
import clearIcon from "../../assets/clear.svg";
import fileUploadIcon from "../../assets/fileupload.svg";


function UploadInput(){
  const fileInput:any = useRef();
  const [file, setFile] = useState<any>(null);
  const {setBusy, setErrorStatus} = useContext(UploadContext)

  const handleFileUpload = (event:any) => {  
    setFile(event.target.files[0])    
  };

  const fileUpload = () => {
    setBusy(true);
    const formData = new FormData();
    formData.append("file", file);
    
    TestDataServices.postFile(formData).then(response => {
      TestDataServices.fileDownload(file.name.split('.')[0]).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${file.name.split('.')[0]}.xlsx`);
        document.body.appendChild(link);
        link.click();
        setErrorStatus(false);
        setBusy(false);
      }).catch(error => {
        setErrorStatus(true)
      });
    }).catch(error => {
      setErrorStatus(true)  
    });
  };

  return (
    <div>
      <div className="flex m-auto justify-center">
        <label
          htmlFor="upload-btn"
          onClick={_ => fileInput.current.click}
          className="bg-white px-10 mr-2 cursor-pointer text-blue-500 font-bold"
        >
          Select a file
        </label>
        <input ref={fileInput} onChange={handleFileUpload} id="upload-btn" className="hidden" type="file" name="binance_file"/>
        {Boolean(file) &&
          (
            <button onClick={fileUpload} className="flex justify-center bg-white text-blue-500 font-bold px-10">
              <img src={fileUploadIcon} alt="upload" className="w-6 h-6 mr-2"/>
              <label className="ml-2 cursor-pointer">
                Upload
              </label>
            </button>
          )}
      </div>
      {Boolean(file) && (
        <div className="flex m-auto justify-center items-center mt-5">
          <p className="text-white font-bold">{file?.name}</p>
          <button onClick={_ => {
            fileInput.current.value = null;
            setFile(null)
          }}>
            <img src={clearIcon} alt="clear"/>
          </button>
        </div>
      )}
    </div>
  )
}

export default UploadInput;