import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WelcomePage from "./Welcome";
import NotFound from "./404";

const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
