import Login from "./components/Login";
import Image from "next/image";

import mainLogo from "./public/images/main_logo.png";
import githubSvg from "./public/images/github.svg";
import gmailSvg from "./public/images/gmail.svg";
import velogSvg from "./public/images/velog.svg";

export default function Home() {
  return (
    <div className="w-full h-full p-4 absolute">
      <div className="w-full h-2/3 flex flex-col relative">
        <div className="flex justify-center items-center absolute inset-0">
          <Image src={mainLogo} alt='main_logo' priority />
        </div>
        <div className="mt-auto self-end relative">
          <div className="flex">
            <a href="https://github.com/100JM/to-do-calendar" target="_blank" rel="noopener noreferrer" className="cursor-pointer">
              <Image src={githubSvg} alt='Contact via GitHub' className="mx-2" width={24} height={24} />
            </a>
            <a href="mailto:bjm.931026@gmail.com" target="_blank" rel="noopener noreferrer" className="cursor-pointer">
              <Image src={gmailSvg} alt='Contact via GitHub' className="mx-2" width={24} height={24} />
            </a>
            <a href="https://velog.io/@100-100" target="_blank" rel="noopener noreferrer" className="cursor-pointer">
              <Image src={velogSvg} alt='Contact via GitHub' className="mx-2" width={24} height={24} />
            </a>
          </div>
        </div>
      </div>
      <Login />
    </div>
  );
}