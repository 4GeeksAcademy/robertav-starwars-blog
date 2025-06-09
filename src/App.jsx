import React, { useContext } from "react";
import Navbar from "./components/Navbar";
import RoutesComponent from "./routes";
import { GlobalProvider, GlobalContext } from "./context/GlobalStore";
import { useFetchData } from "./hooks/useFetchData";

function ThemedApp() {
  const { state } = useContext(GlobalContext);
  useFetchData();

  return (
    <div className={state.theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"} style={{ minHeight: "100vh" }}>
      <Navbar />
      <RoutesComponent />
    </div>
  );
}

const App = () => (
  <GlobalProvider>
    <ThemedApp />
  </GlobalProvider>
);

export default App;

