import Home from './pages/Home';

function App() {
  
  return (
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
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2  w-screen">
        <Home />
      </div>
    </div>
  );
}

export default App;
