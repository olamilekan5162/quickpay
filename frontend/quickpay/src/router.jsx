import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Verification from "./routes/Verification";
import LinkGeneration from "./routes/LinkGeneration";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/generate",
    element: <LinkGeneration />,
  },
  {
    path: "/verify",
    element: <Verification />,
  },
]);
