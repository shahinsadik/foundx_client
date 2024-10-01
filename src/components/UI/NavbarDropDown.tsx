"use client";

import { protectedRoutes } from "@/src/constant";
import { useUser } from "@/src/context/user.provider";
import { logout } from "@/src/services/AuthService";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";

const NavbarDropDown = () => {
  const pathname= usePathname()
  const{setIsLoading:userLoading, user} = useUser()
  const router = useRouter();
  const handleLogout = () =>{
    logout()
    userLoading(true);
    if(protectedRoutes.some((route)=>pathname.match(route))){
      router.push("/");
    }
  }
  const handleNavigation = (pathname: string) => {
    router.push(pathname);
  };

  
  return (
    <div className="hidden sm:flex gap-2">
      <Dropdown>
        <DropdownTrigger>
          <Avatar className="cursor-pointer" name={user?.name} src={user?.profilePhoto} />
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem onClick={() => handleNavigation("/profile")}>
            Profile
          </DropdownItem>
          <DropdownItem
            onClick={() => handleNavigation("/profile/create-post")}
          >
            Create Post
          </DropdownItem>
          <DropdownItem onClick={() => handleNavigation("/profile/setting")}>
            Settings
          </DropdownItem>

          <DropdownItem
            onClick={() => handleLogout()}
            className="text-danger"
            color="danger"
          >
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default NavbarDropDown;
