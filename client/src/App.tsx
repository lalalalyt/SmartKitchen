import AppContainer from "./components/container/AppContainer";
import ModeContextProvider from "./contexts/ModeContext/provider";

function App() {
  return (
    <ModeContextProvider>
        <AppContainer />
    </ModeContextProvider>
  );
}

export default App;
