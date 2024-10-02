import useDateStore from "@/app/store/date";
import useModalStore from "@/app/store/modal";

const TodoList: React.FC = () => {
    const { selectedDateEventList, setSelectedDateEventInfo } = useDateStore();
    const { setShowAddArea } = useModalStore();

    const handleClickTodoList = (id: string) => {
        setSelectedDateEventInfo(id);
        setShowAddArea(true);
    };

    return (
        <div className="w-full min-h-80 overflow-y-auto">
            <ul>
                {selectedDateEventList.map((t) => (
                    <li key={t.id} className="p-1 rounded mb-2 text-white" style={{backgroundColor: t.backgroundColor}}>
                        <button className="w-full text-start overflow-hidden text-ellipsis whitespace-nowrap" onClick={() => handleClickTodoList(t.id)}>
                            {t.title}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;