import { createContext, useState } from "react";
import AppContainer from "./components/container/AppContainer";

export const ModeContext = createContext<[string, (newMode: string) => void]>([
  "HOME",
  () => {},
]);

function App() {
  const [mode, setMode] = useState("HOME");
  const transite = (newMode: string) => {
    setMode(newMode);
  };

  

  return (
    <ModeContext.Provider value={[mode, transite]}>
      <AppContainer />
    </ModeContext.Provider>
  );
}

export default App;
