import { useSnackbarApp } from "./components/alerts/UseSnackBar";
import { useModal } from "./components/modal/UseModal";
import { AppThemeProvider } from "./context/ThemeContext";
import { RotasMapeadas } from "./routes";

import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

function App() {
  const { Component: SnackbarApp } = useSnackbarApp();
  const { Component: ModalApp } = useModal();
  return (
    <AppThemeProvider>
      <RotasMapeadas />
      <SnackbarApp />
      <ModalApp />
    </AppThemeProvider>
  );
}

export default App;
