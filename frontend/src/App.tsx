import { useEffect } from "react";
import UploadInput from "./components/shared/UploadInput";
import TestDataServices from "./services/test.service";

function App() {
  
  useEffect(() => {
    TestDataServices.getAll().then(res => {
      console.log('1 ', res);
    });
  })

  return (
    <div className="container sm">
      <UploadInput />
    </div>
  );
}

export default App;
