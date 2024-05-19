import "./App.css";
import "react-datepicker/dist/react-datepicker.css";
import NavBar from "./Components/NavBar";
import WebState from "./context/WebState";
import Dd from "./Components/Dd";
import Alert from "./Components/Alert";

function App() {
  return (
    <>
      <WebState>
        <NavBar />
        <Alert />
        <Dd />
      </WebState>
    </>
  );
}

export default App;
