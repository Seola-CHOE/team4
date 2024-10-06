import TodoListComponent from '../../components/todos/TodoListComponent';
import {Link, Navigate} from 'react-router-dom';
import Todo from "../Todo.tsx";

function TodoListPage() {

    return (
        <div className="relative p-6"> {/* 부모 div에 패딩을 추가하여 간격 조정 */}
            {/* 버튼을 작게 만들고, 오른쪽에 배치 */}
            <div className="flex justify-end mb-4"> {/* flex 컨테이너로 버튼을 오른쪽 정렬 */}
                <Link
                    to='add'
                    className="inline-flex items-center justify-center rounded-full bg-primary py-2 px-4 text-center text-sm font-medium text-white hover:bg-opacity-90"
                >
                    ADD
                </Link>
            </div>

            {/* 할 일 목록 컴포넌트 */}

            <TodoListComponent />


        </div>

    );
}

export default TodoListPage;
