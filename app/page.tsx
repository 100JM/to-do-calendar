import Login from "./components/Login";
import Image from "next/image";
import mainLogo from "./public/images/main_logo.png";

export default function Home() {
  return (
    <div className="w-full h-full p-4 absolute">
      <div className="w-full h-2/3 flex justify-center items-center">
        <Image src={mainLogo} alt='main_logo' priority />
      </div>
      <Login />
    </div>
  );
}