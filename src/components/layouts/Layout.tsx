import { Outlet } from "react-router";
import { Logo } from "../Logo";
import { HeaderMenu, HeaderUtility } from "./Header";

export default function Layout() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <div className="flex sticky top-0 z-50 w-full justify-between items-center h-20 px-4 md:px-8 lg:px-12 bg-primary text-white">
        <Logo size="md" expand />
        <HeaderMenu className="hidden md:flex" />
        <HeaderUtility />
      </div>
      <div className="px-4 md:px-8 lg:px-12 py-4">
        <Outlet />
      </div>
    </div>
  );
}
