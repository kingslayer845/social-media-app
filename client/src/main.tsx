import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root/Root";
import ErrorPage from "./routes/root/ErrorPage";
import { QueryClient, QueryClientProvider } from "react-query";
import LoginPage from "./routes/auth/LoginPage";
import SignupPage from "./routes/auth/SignupPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectRoute from "./components/ProtectRoute";
import HomePage from "./routes/home/HomePage";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectRoute>
        <Root />
      </ProtectRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
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
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
