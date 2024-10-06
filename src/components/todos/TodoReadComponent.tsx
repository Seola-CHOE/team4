import { useNavigate, useParams, useLocation } from 'react-router-dom';
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
  const { tno } = useParams<{ tno: string }>(); // URL 파라미터로부터 tno 가져오기
  const [todo, setTodo] = useState<ITodo>(initialState); // Todo 상태 초기화
  const [loading, setLoading] = useState<boolean>(false); // 로딩 상태 관리
  const navigate = useNavigate();
  const location = useLocation(); // 현재 경로와 query parameter를 가져오기 위해 useLocation 사용

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
    // 현재 위치의 query parameter 추출
    const searchParams = new URLSearchParams(location.search);
    const page = searchParams.get("page"); // 현재 page 값 가져오기
    const size = searchParams.get("size"); // 현재 size 값 가져오기

    // query parameter를 포함한 경로로 이동
    if (page && size) {
      // page와 size 값이 있으면 해당 경로로 이동
      navigate(`/todo?page=${page}&size=${size}`, { replace: true });
    } else if (page) {
      // page 값만 있으면 해당 경로로 이동
      navigate(`/todo?page=${page}`, { replace: true });
    } else {
      // 기본 경로로 이동
      navigate('/todo', { replace: true });
    }
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
                        <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        <svg className="fill-current" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g opacity="0.8">
                            <path fillRule="evenodd" clipRule="evenodd" d="M3.72039 12.887C4.50179 12.1056 5.5616 11.6666 6.66667 11.6666H13.3333C14.4384 11.6666 15.4982 12.1056 16.2796 12.887C17.061 13.6684 17.5 14.7282 17.5 15.8333V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333C16.2064 18.3333 15.8333 17.9602 15.8333 17.5V15.8333C15.8333 15.1703 15.5699 14.5344 15.1011 14.0655C14.6323 13.5967 13.9964 13.3333 13.3333 13.3333H6.66667C6.00363 13.3333 5.36774 13.5967 4.8989 14.0655C4.43006 14.5344 4.16667 15.1703 4.16667 15.8333V17.5C4.16667 17.9602 3.79357 18.3333 3.33333 18.3333C2.8731 18.3333 2.5 17.9602 2.5 17.5V15.8333C2.5 14.7282 2.93899 13.6684 3.72039 12.887Z" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M9.99967 3.33329C8.61896 3.33329 7.49967 4.45258 7.49967 5.83329C7.49967 7.214 8.61896 8.33329 9.99967 8.33329C11.3804 8.33329 12.4997 7.214 12.4997 5.83329C12.4997 4.45258 11.3804 3.33329 9.99967 3.33329ZM5.83301 5.83329C5.83301 3.53211 7.69849 1.66663 9.99967 1.66663C12.3009 1.66663 14.1663 3.53211 14.1663 5.83329C14.1663 8.13448 12.3009 9.99996 9.99967 9.99996C7.69849 9.99996 5.83301 8.13448 5.83301 5.83329Z" />
                          </g>
                        </svg>
                      </span>
                          <input
                              className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                              type="text"
                              name="fullName"
                              id="fullName"
                              value={todo.writer}
                              readOnly
                          />
                        </div>
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
                          onClick={handleCancel} // 이전 경로로 이동
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
