import { useNavigate, useParams} from 'react-router-dom';
import { useEffect, useState } from "react";
import { ITodo } from '../../types/todo.ts';
import { getOne } from '../../api/todoAPI.ts';

const initialState: ITodo = {
  tno: 0,
  title: '',
  writer: '',
  dueDate: '',
  complete: false,
};

function TodoReadComponent() {
  const { tno } = useParams<{ tno: string }>();
  const [todo, setTodo] = useState<ITodo>(initialState);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!tno) {
      console.error("Invalid tno: undefined");
      return;
    }

    const tnoNum = Number(tno);
    if (isNaN(tnoNum) || tnoNum <= 0) {
      console.error("Invalid tno:", tno);
      return;
    }

    setLoading(true);
    getOne(tnoNum)
        .then(result => {
          console.log("Fetched todo:", result);
          setTodo(result);
        })
        .catch(error => {
          console.error("Failed to fetch todo:", error);
        })
        .finally(() => {
          setLoading(false);
        });
  }, [tno]);


  const handleCancel = () => {
    navigate(-1);
  };

  return (
      <div className="flex justify-center mt-10">
        {loading ? (
            <div>Loading...</div>
        ) : (
            <div className="grid grid-cols-4 gap-8 w-full max-w-4xl">
              <div className="col-span-5 xl:col-span-3">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                    <h3 className="text-4xl font-bold text-black dark:text-white">My Todo</h3>

                    <div className="mb-5.5">
                      <label className="mb-3 block text-1xl font-medium text-black dark:text-white">No.</label>
                      <input
                          className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          value={todo.tno}
                          readOnly
                      />
                    </div>

                    <div className="mb-5.5">
                      <label className="mb-3 block text-1xl font-medium text-black dark:text-white">Title</label>
                      <input
                          className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          value={todo.title}
                          readOnly
                      />
                    </div>

                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                      <div className="w-full sm:w-1/2">
                        <label className="mb-3 block text-1xl font-medium text-black dark:text-white" htmlFor="fullName">Writer</label>
                        <input
                            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            value={todo.writer}
                            readOnly
                        />
                      </div>

                      <div className="w-full sm:w-1/2">
                        <label className="mb-3 block text-1xl font-medium text-black dark:text-white">Due Date</label>
                        <input
                            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            value={todo.dueDate}
                            readOnly
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-4.5">
                      <button
                          className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
                          type="button"
                          onClick={handleCancel}
                      >
                        Back
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        )}
      </div>
  );
}

export default TodoReadComponent;