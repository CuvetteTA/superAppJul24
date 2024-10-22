import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardPage from "./routes/dashboard";
import ErrorPage from "./routes/404";
import LoginPage from "./routes/login";
import Categories from "./routes/categories";
import EntertainmentPage from "./routes/entertainment";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardPage />, // Focus here
    errorElement: <ErrorPage />, // Focus here
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/categories",
    element: <Categories />, // Focus here 
  },
  {
    path: "/entertainment",
    element: <EntertainmentPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
