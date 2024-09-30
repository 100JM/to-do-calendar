import useDateStore from "@/app/store/date";

const TodoList: React.FC = () => {
    const { selectedDateEventList } = useDateStore();

    return (
        <div className="w-full min-h-80 overflow-y-auto">
            <ul>
                {selectedDateEventList.map((t) => (
                    <li key={t.id} className="p-1 rounded mb-2 text-white" style={{backgroundColor: t.backgroundColor}}>
                        <button className="w-full text-start overflow-hidden text-ellipsis whitespace-nowrap" >
                            {t.title}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;