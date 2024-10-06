import Breadcrumb from '../components/Breadcrumb';
import NewCover from '../images/new.jpg';
import TodoListPage from './todos/TodoListPage.tsx';
import { Navigate } from 'react-router-dom';


const Todo = () => {
  return (
      <>
        <Breadcrumb pageName="Todo" />

        <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="relative z-20 h-35 md:h-65">
            <img
                src={NewCover}
                alt="Todo cover"
                className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
            />
          </div>

          <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
            <div className="mt-4">
              <h3 className="mb-1.5 text-4xl font-semibold text-black dark:text-white">
                MY TODO LIST
              </h3>
              <TodoListPage/>

              <Navigate to={'/todo/list'}></Navigate>
            </div>
          </div>
        </div>
      </>
  );
};

export default Todo;
