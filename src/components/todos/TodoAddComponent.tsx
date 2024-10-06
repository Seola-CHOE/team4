import { ITodo } from "../../types/todo.ts";
import { ChangeEvent, useCallback, useState } from "react";
import { postTodo } from "../../api/todoAPI.ts";
import { useNavigate } from "react-router-dom";

// 초기 상태 설정
const initState: ITodo = {
    tno: undefined,
    title: '',
    writer: '',
    dueDate: '',
};

function TodoAddComponent() {
    const [todo, setTodo] = useState<ITodo>({ ...initState });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setTodo((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }, []);


    const handleClick = () => {
        setLoading(true);
        postTodo(todo)
            .then((newTodo: ITodo) => {
                console.log(newTodo);
                setTodo({ ...initState });
                navigate('/todo/list');
            })
            .catch((error) => {
                console.error("Failed to add todo:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    };


    const handleCancel = () => {
        navigate('/todo/list');
    };

    return (
        <div className='flex justify-center items-center h-screen'>

            <div className='w-full max-w-md p-8 border border-gray-200 rounded-lg shadow-lg bg-white'>
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">My New Todo</h2>

                <div className='flex flex-col space-y-4'>

                    <label className="text-lg font-semibold text-gray-700">Title</label>
                    <input
                        type="text"
                        name="title"
                        className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter Title"
                        value={todo.title}
                        onChange={handleChange}
                    />


                    <label className="text-lg font-semibold text-gray-700">Writer</label>
                    <input
                        type="text"
                        name="writer"
                        className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter Writer"
                        value={todo.writer}
                        onChange={handleChange}
                    />


                    <label className="text-lg font-semibold text-gray-700">Due Date</label>
                    <input
                        type="date"
                        name="dueDate"
                        className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={todo.dueDate}
                        onChange={handleChange}
                    />


                    <div className="flex justify-end space-x-4 mt-4"> {/* space-x-4로 버튼 간격 설정 */}

                        <button
                            type="button"
                            className="bg-blue-500 text-graydark font-semibold py-3 px-6 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            onClick={handleClick}
                            disabled={loading}
                        >
                            {loading ? 'Loading...' : 'Submit'}
                        </button>


                        <button
                            type="button"
                            className="bg-gray-400 text-graydark font-semibold py-3 px-6 rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                            onClick={handleCancel}
                            disabled={loading}
                        >
                            Cancel
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default TodoAddComponent;
