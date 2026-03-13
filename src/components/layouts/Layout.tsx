import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { menus } from "@/constants/menu";
import { cn } from "@/lib/utils";
import { Bell, LogOut, MenuSquare } from "lucide-react";
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router";
import { Logo } from "../Logo";

const handleLogout = () => {
  localStorage.clear();
  window.location.replace("/");
};

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

type HeaderProps = {
  className?: string;
};

const HeaderMenu = (props: HeaderProps) => {
  const { pathname } = useLocation();

  return (
    <div className={cn("gap-3 items-center", props.className)}>
      {menus.map((menu) => {
        const isActive = pathname === menu.path;
        return (
          <Link
            key={menu.path}
            to={menu.path}
            className={cn(
              "px-2 py-1 hover:bg-white hover:text-primary rounded-md",
              isActive && "bg-white text-primary",
            )}
          >
            {menu.label}
          </Link>
        );
      })}
    </div>
  );
};

const HeaderUtility = () => {
  return (
    <div className={cn("flex items-center gap-4 md:gap-8")}>
      <Button className="bg-white text-black size-8">
        <Bell className="rotate-30 size-5" />
      </Button>
      <Avatar className="size-12 bg-white p-1">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Button
        variant="ghost"
        className="p-0 hidden md:block"
        onClick={handleLogout}
      >
        <LogOut className="size-6" />
      </Button>
      <HeaderMobile className="block md:hidden" />
    </div>
  );
};

const HeaderMobile = (props: HeaderProps) => {
  const { pathname } = useLocation();

  const [open, setOpen] = useState<boolean>(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className={props.className}>
        <MenuSquare className="size-8" />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader hidden>
          <SheetTitle></SheetTitle>
        </SheetHeader>
        <div className="flex flex-col justify-between size-full gap-2">
          <div className="bg-primary p-4">
            <Logo size="sm" className="text-white" expand />
          </div>

          <div className="flex flex-col flex-grow gap-2">
            {menus.map((menu) => {
              const isActive = pathname === menu.path;

              return (
                <Link
                  key={menu.path}
                  to={menu.path}
                  className={cn(
                    "px-4 py-3 font-semibold hover:bg-primary hover:text-white rounded",
                    isActive && "bg-primary text-white",
                  )}
                  onClick={() => setOpen(false)}
                >
                  {menu.label}
                </Link>
              );
            })}
          </div>

          <Button
            variant="destructive"
            className="py-5 justify-self-end mb-4"
            onClick={handleLogout}
          >
            <LogOut />
            Logout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
