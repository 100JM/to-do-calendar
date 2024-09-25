import { Toaster } from "react-hot-toast";

import Calendar from "./components/Calendar";
import TodoDialog from "./components/TodoDialog";

export default function Home() {
  return (
    <div className="w-full h-full p-4 text-sm absolute">
      <TodoDialog />
      <Calendar />
      <Toaster position="top-right" />
    </div>
  );
}