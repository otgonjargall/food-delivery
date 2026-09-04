"use client"
import Image from "next/image";
import { Button } from "../ui/button";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { Link } from "lucide-react";
import{Popover, PopoverContent, PopoverTrigger} from "../ui/popover"
import { ChevronRight,MapPin, ShoppingBasket, User2 } from "lucide-react";

export const Header =()=>{
    const context = useContext(UserContext)
    return(
        <div className="w-full bg-black flex justify-between items-center py-3 px-28">
            <div>
                <Image src={"/nom.png"} width={146} height={44} priority alt="header"/>
            </div>
          
            {context?.user?(
                <div className="flex gap-3">
                    <div className="rounded-full bg-white h-10 px-4 items-center">
                        <div className="flex gap-2 items-center justify-center  mt-2">
                            <MapPin className="text-red-500 "/>
                            <p className="text-red-500">Delivery Address:</p>
                            <p>Add Location</p>
                            <ChevronRight />
                        </div>
                    </div>

                    <Button className="w-10 h-10 rounded-full" variant="secondary">
                        <ShoppingBasket />
                    </Button>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button className="bg-red-500 rounded-full hover:bg-red-700 w-10 h-10" >
                                <User2 />
                            </Button>
                        </PopoverTrigger>

                        <PopoverContent>
                            {context.user.email}
                            <Button onClick={() => context?.logout()} variant="secondary" className="w-fit">
                                Logout
                            </Button >
                        </PopoverContent>
                    </Popover>
                </div>
            ) : (       
                 <div className="flex gap-4">
                  <Link href="/signup">
                   <Button className="bg-[#f4f4f5] hover:bg-[#f4f5f55f] text-foreground cursor-pointer">
                    Sign up
                </Button>
                </Link>
                <Link href="/signin">
                 <Button className="bg-red-500 hover:bg-red-700 cursor-pointer">
                    Sign in
                </Button>
                </Link>
            </div>)}  
            
        </div>
        
    )
}

