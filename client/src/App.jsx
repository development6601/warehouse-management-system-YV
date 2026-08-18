import { useSelector } from "react-redux";
import AppRoutes from "./routes/AppRoutes";
import { setStore } from "./utils/injectors/storeInjector";
import { store } from "./store/store";


function App() {

  // Injectore
  setStore(store)

  return (
    <AppRoutes />
  );
}


export default App;