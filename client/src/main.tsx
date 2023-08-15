import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root/Root";
import ErrorPage from "./routes/root/ErrorPage";
import { QueryClient, QueryClientProvider } from "react-query";
import LoginPage from "./routes/auth/LoginPage";
import SignupPage from "./routes/auth/SignupPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  { path: "/signup", element: <SignupPage /> },
]);
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
