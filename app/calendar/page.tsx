import { Toaster } from "react-hot-toast";

import Calendar from "../components/Calendar";
import UserDialog from "../components/UserDialog";
import TodoDialog from "../components/TodoDialog";

export default function CalendarPage() {
    return (
        <div className="w-full h-full p-4 text-sm absolute">
            <UserDialog />
            <TodoDialog />
            <Calendar />
            <Toaster position="top-right" />
        </div>
    );
}