import SearchForm from "../components/SearchForm";
import TodoDialog from "../components/TodoDialog";
import { Toaster } from "react-hot-toast";

export default function SearchPage() {

    return (
        <>
            <SearchForm />
            <TodoDialog />
            <Toaster position="top-right" />
        </>
    );
};