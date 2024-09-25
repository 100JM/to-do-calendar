import { Toaster } from "react-hot-toast";

import Login from "./components/Login";
import TodoDialog from "./components/TodoDialog";

export default function Home() {
  return (
    <div className="w-full h-full p-4 text-sm absolute">
      <TodoDialog />
      <Login />
      <Toaster position="top-right" />
    </div>
  );
}