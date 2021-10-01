import UploadInput from "../components/shared/UploadInput";

const Home = () => {
  return (
  <div className="flex flex-col h-screen justify-center items-center text-center">
    <div>
      <h1 className="text-5xl text-white mb-5">Binance2Excel</h1>
      <p className="text-2xl text-white font-light mb-5">
        This tool allows you to convert your Binance trade history into an Excel
      </p>
      <UploadInput />
    </div>
  </div>
  );
}

export default Home;
