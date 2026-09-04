import { Footer } from "@/components/main/Footer";
import { Header } from "@/components/main/Header";
import Image from "next/image";
export default function Home(){
  
  return(
    <div>
      <Header/>
      <div className="w-full  flex justify-center items-center">
          <Image src={"/Bg.png"} width={1640} height={570} priority alt="header"/>           
      </div>
      main page
      <Footer/>
    </div>
  )
}

