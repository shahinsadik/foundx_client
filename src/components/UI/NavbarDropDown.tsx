"use client";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Avatar,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
const NavbarDropDown = () => {
    const router = useRouter()
    const handleNavigation = (pathname:string)=>{
        router.push(pathname)
  
    }
  return (
    <div className="hidden sm:flex gap-2">
      
      <Dropdown>
        <DropdownTrigger>
        <Avatar className="cursor-pointer" name="Junior" />
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem onClick={()=>handleNavigation('/profile')} >Profile</DropdownItem>
          <DropdownItem onClick={()=>handleNavigation('/profile/create-post')} >Create Post</DropdownItem>
          <DropdownItem onClick={()=>handleNavigation('/profile/setting')} >Settings</DropdownItem>
          <DropdownItem  className="text-danger" color="danger">
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default NavbarDropDown;
