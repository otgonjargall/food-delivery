import Image from "next/image";

export const Footer = () => {
    return (
        <footer className="w-full  flex justify-center items-center">
            <div className="">
               <Image src={"/Footer.png"} width={1640} height={755} priority alt="footer logo"/>
            </div>
        </footer>
    );
};