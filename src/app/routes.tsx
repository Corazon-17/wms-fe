import Layout from "@/layouts/Layout";
import Login from "@/pages/auth/login";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "dashboard",
    Component: Layout,
    children: [{ path: "", element: <div>Hello</div> }],
  },
]);
