import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import useDateStore from '../store/date';
import useModalStore from '../store/modal';
import dayjs from 'dayjs';

const ImportantTodoList: React.FC = () => {
    const { data: session } = useSession();
    const { todoList, setSelectedDateEventInfo } = useDateStore();
    const { setShowAddArea, setIsTodoButton, setShowTodoDialog } = useModalStore();

    const [ importantMyTodoList, setImportantMyTodoList ] = useState<Array<any>>([]);

    const handleClickImportantTodo = (id: string) => {
        setSelectedDateEventInfo(id);
        setShowAddArea(true);
        setIsTodoButton(true)
        setShowTodoDialog(true);
    };

    useEffect(() => {
        const myList = todoList.filter((todo) => {
            return todo.important === true;
        }).sort((a,b) => {
            const dateA = new Date(a.end.split('T')[0]);
            const dateB = new Date(b.end.split('T')[0]);

            return dateA.getTime() - dateB.getTime();
        });

        setImportantMyTodoList(myList);
    }, [todoList, session]);

    return (
        <>
            <div className="w-full h-10 flex items-center justify-center pb-2"><span className="text-center text-lg">중요 일정</span></div>
            <div style={{ width: "100%", height: "calc(92% - 2.5rem)", overflowY: "auto" }}>
                {
                    (importantMyTodoList.length > 0) ?
                        importantMyTodoList.map((i) => {
                            const importantEndDate: string = i.allDay ? dayjs(i.end).add(-1, 'day').format('YYYY-MM-DD') : i.end.split('T')[0];
                            const importantEndDday: number = dayjs(importantEndDate).startOf('day').diff(dayjs().startOf('day'), 'day');

                            return (
                                <div key={i.id} className="p-2 border border-gray-300 rounded-xl shadow mb-3 flex cursor-pointer hover:bg-gray-100" onClick={() => handleClickImportantTodo(i.id)}>
                                    <div className="w-4 rounded-md mr-2" style={{ backgroundColor: `${i.color}` }}></div>
                                    <div style={{ width: "calc(100% - 1.5rem)" }}>
                                        <div className="overflow-hidden text-ellipsis whitespace-nowrap">{i.title}</div>
                                        <div>{`시작일 ${i.start.split('T')[0]}`}</div>
                                        <div className="flex justify-between">
                                            <div>{`종료일 ${importantEndDate}`}</div>
                                            <div>
                                                {
                                                    (importantEndDday > 0) ?
                                                        (
                                                            (importantEndDday <= 3) ?
                                                                <>
                                                                    <i className="bi bi-alarm text-red-500">
                                                                        {` D-day ${importantEndDday}일`}
                                                                    </i>
                                                                </>
                                                                :
                                                                ` D-day ${importantEndDday}일`
                                                        )
                                                        :
                                                        (
                                                            (importantEndDday === 0) ?
                                                                <>
                                                                    <i className="bi bi-alarm text-red-500">
                                                                        {'D-day 오늘'}
                                                                    </i>
                                                                </>
                                                                :
                                                                '종료된 일정'
                                                        )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        :
                        <div className="w-full h-full flex items-center justify-center text-base">
                            등록된 중요 일정이 없습니다.
                        </div>
                }
            </div>
        </>
    );
};

export default ImportantTodoList;