import { ChakraProvider } from "@chakra-ui/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/auth";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </ChakraProvider>
  </StrictMode>
);
