import Layout from "@/layouts/Layout";
import Login from "@/pages/auth/login";
import Outbond from "@/pages/dashboard/outbond";
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
      { path: "outbound", Component: Outbond },
      { path: "inventory", element: <div>Inventory</div> },
      { path: "settings", element: <div>Settings</div> },
    ],
  },
]);
