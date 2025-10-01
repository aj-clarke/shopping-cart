import ReactDOM from "react-dom/client";
import { ThemeProvider } from "./providers/ThemeProvider";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
