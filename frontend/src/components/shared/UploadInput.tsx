import React, {useRef, useState} from "react";
import TestDataServices from "../../services/test.service";


function UploadInput(){
  const fileInput:any = useRef();
  const [file, setFile] = useState<any>(null);

  const handleFileUpload = (event:any) => {    
    setFile(event.target.files[0])    
  };

  const fileUpload = (event:any) => {
    event.preventDefault();
    const formData = new FormData();
    
    formData.append("file", file);
    
    TestDataServices.postFile(formData).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);  
    });
  };

  return (
    <div className="flex m-auto justify-center">
      <div
        className="bg-white px-10 mr-2 cursor-pointer text-blue-500 font-bold">
        <label onClick={() => fileInput.current.click()} htmlFor="upload-btn" className="font-extrabold cursor-pointer">Select a file</label>
        <input ref={fileInput} onChange={handleFileUpload} id="upload-btn" className="hidden" type="file" name="binance_file"/>
        <span>{file?.name}</span>
      </div>
      <button onClick={fileUpload} className="flex justify-center rounded-sm bg-white text-blue-500 font-bold px-10">
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M11.492 10.172l-2.5 3.064-.737-.677 3.737-4.559 3.753 4.585-.753.665-2.5-3.076v7.826h-1v-7.828zm7.008 9.828h-13c-2.481 0-4.5-2.018-4.5-4.5 0-2.178 1.555-4.038 3.698-4.424l.779-.14.043-.789c.185-3.448 3.031-6.147 6.48-6.147 3.449 0 6.295 2.699 6.478 6.147l.044.789.78.14c2.142.386 3.698 2.246 3.698 4.424 0 2.482-2.019 4.5-4.5 4.5m.978-9.908c-.212-3.951-3.472-7.092-7.478-7.092s-7.267 3.141-7.479 7.092c-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.522-5.408"/></svg>
        <label className="ml-2 cursor-pointer">
          Upload
        </label>
      </button>
    </div>
  )
}

export default UploadInput;