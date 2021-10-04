import Home from './pages/Home';
import {UploadProvider} from './context/uploadContext';

function App() {
  
  return (
    <UploadProvider>
      <div className="relative">
        <div className="min-h-screen">
          <div className="lines">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </div>

        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2  w-screen">
          <Home />
        </div>
      </div>
    </UploadProvider>
  );
}

export default App;
