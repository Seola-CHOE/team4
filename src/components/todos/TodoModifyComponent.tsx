import React, { useState } from 'react';
import { ITodo } from '../../types/todo';

interface ModifyComponentProps {
  todo: ITodo;
  onUpdate: (updatedTodo: ITodo) => void;
  onClose: () => void;
}

const ModifyComponent: React.FC<ModifyComponentProps> = ({ todo, onUpdate, onClose }) => {
  const [updatedTodo, setUpdatedTodo] = useState<ITodo>({ ...todo });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedTodo((prevTodo) => ({
      ...prevTodo,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onUpdate(updatedTodo); // 수정된 데이터를 부모 컴포넌트로 전달
    onClose(); // 모달 닫기
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Modify Todo</h2>
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            name="title"
            className="border border-gray-300 p-2 rounded-lg"
            value={updatedTodo.title}
            onChange={handleChange}
            placeholder="Title"
          />
          <input
            type="text"
            name="writer"
            className="border border-gray-300 p-2 rounded-lg"
            value={updatedTodo.writer}
            onChange={handleChange}
            placeholder="Writer"
          />
          <input
            type="date"
            name="dueDate"
            className="border border-gray-300 p-2 rounded-lg"
            value={updatedTodo.dueDate}
            onChange={handleChange}
            placeholder="Due Date"
          />
          <div className="flex space-x-4">
            <button
              className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
              onClick={handleSave} // Save 버튼 클릭 시 수정 내용 저장
            >
              Save
            </button>
            <button
              className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModifyComponent;
