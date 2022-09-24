import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {CreateNft} from "pages";
import './App.css';

function App() {
  return (
    <div className="App">
      <main><CreateNft /></main>
      <ToastContainer />
    </div>
  );
}

export default App;
