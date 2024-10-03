import React, { useState } from 'react';
import { ITodo } from '../../types/todo';

interface ModifyComponentProps {
  todo: ITodo; // 수정할 todo
  onClose: () => void; // 모달 닫기 함수
  onModify: (modifiedTodo: ITodo) => void; // 수정된 todo 전달 함수
}

const ModifyComponent: React.FC<ModifyComponentProps> = ({ todo, onClose, onModify }) => {
  const [modifiedTodo, setModifiedTodo] = useState<ITodo>({ ...todo }); // todo 상태 초기화

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setModifiedTodo(prev => ({ ...prev, [name]: value })); // 상태 업데이트
  };

  const handleSubmit = () => {
    onModify(modifiedTodo); // 수정된 todo 전달
    onClose(); // 모달 닫기
  };

  if (!todo) return null; // todo가 null이면 아무 것도 렌더링하지 않음

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded shadow-md">
        <h2 className="text-lg font-bold mb-4">수정하기</h2>
        <div>
          <label className="block mb-2">
            제목
            <input
              type="text"
              name="title"
              value={modifiedTodo.title}
              onChange={handleChange}
              className="border rounded p-2 w-full"
            />
          </label>
          <label className="block mb-2">
            작가
            <input
              type="text"
              name="writer"
              value={modifiedTodo.writer}
              onChange={handleChange}
              className="border rounded p-2 w-full"
            />
          </label>
          <label className="block mb-2">
            날짜
            <input
              type="date"
              name="dueDate"
              value={modifiedTodo.dueDate}
              onChange={handleChange}
              className="border rounded p-2 w-full"
            />
          </label>
          <button onClick={handleSubmit} className="bg-gray-300 p-2 rounded">수정 완료</button>
          <button onClick={onClose} className="bg-gray-300 p-2 rounded">취소</button>
        </div>
      </div>
    </div>
  );
};

export default ModifyComponent;
