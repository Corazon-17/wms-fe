import Layout from "@/components/layouts/Layout";
import Login from "@/pages/auth/login";
import Outbound from "@/pages/dashboard/outbound";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "dashboard",
    Component: Layout,
    children: [
      { path: "", element: <div>Hello</div> },
      { path: "inbound", element: <div>Hello</div> },
      { path: "outbound", Component: Outbound },
      { path: "inventory", element: <div>Inventory</div> },
      { path: "settings", element: <div>Settings</div> },
    ],
  },
]);
