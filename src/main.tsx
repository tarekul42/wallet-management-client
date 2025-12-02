import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./routes/index.tsx";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store.ts";
import { ThemeProvider } from "./providers/theme.provider.tsx";
import { Toaster } from "sonner";
import { setCredentials } from "./redux/features/auth/authSlice.ts";
import { decodedToken } from "./utils/jwt.ts";

const token = localStorage.getItem("token");
if (token) {
  const user = decodedToken(token);
  store.dispatch(setCredentials({ token, user }));
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
        <Toaster richColors />
      </ThemeProvider>
    </ReduxProvider>
  </StrictMode>,
);
