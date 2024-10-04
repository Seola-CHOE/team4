import { useParams } from "react-router-dom"; // useParams 훅 임포트
import { useEffect, useState } from "react"; // React 관련 훅 임포트
import { ITodo } from '../../types/todo.ts'; // ITodo 타입 임포트
import { getOne } from '../../api/todoAPI.ts'; // getOne API 임포트

// 초기 상태 설정
const initialState: ITodo = {
  tno: 0, // tno 속성 초기화
  title: '',
  writer: '',
  dueDate: '',
  complete: false, // complete 속성 추가 (Postman 데이터에 기반하여 추가)
};

function TodoReadComponent() {
  const { tno } = useParams<{ tno: string }>(); // useParams에서 tno 파라미터 가져오기
  const [todo, setTodo] = useState<ITodo>(initialState); // todo 상태 정의
  const [loading, setLoading] = useState<boolean>(false); // 로딩 상태 정의

  // tno가 undefined일 때 처리
  if (!tno) {
    console.error("Invalid tno: undefined");
    return <div>Error: Invalid tno</div>;
  }

  useEffect(() => {
    const tnoNum = Number(tno); // tno를 숫자로 변환하여 API에 전달
    if (isNaN(tnoNum) || tnoNum <= 0) {
      console.error("Invalid tno:", tno);
      return;
    }

    setLoading(true); // 로딩 상태 활성화
    getOne(tnoNum)
      .then(result => {
        setTodo(result); // 가져온 데이터를 상태로 설정
        setLoading(false); // 로딩 상태 비활성화
      })
      .catch(error => {
        console.error("Failed to fetch todo:", error);
        setLoading(false); // 에러 발생 시 로딩 상태 비활성화
      });
  }, [tno]); // tno가 변경될 때마다 useEffect 실행

  return (
    <div>
      {loading ? (
        <div>Loading...</div> // 로딩 중일 때 표시
      ) : (
        <div>
          <h1>Todo 상세 보기</h1>
          <div><strong>번호:</strong> {todo.tno}</div>
          <div><strong>제목:</strong> {todo.title}</div>
          <div><strong>작성자:</strong> {todo.writer}</div>
          <div><strong>마감일:</strong> {todo.dueDate}</div>
          <div><strong>완료 여부:</strong> {todo.complete ? '완료' : '미완료'}</div>
        </div>
      )}
    </div>
  );
}

export default TodoReadComponent;
