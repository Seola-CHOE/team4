import React, { useState, useEffect } from 'react';
import { ITodo } from '../../types/todo';

interface ModifyComponentProps {
  todo: ITodo;
  onUpdate: (updatedTodo: ITodo) => void;
  onClose: () => void;
}

const ModifyComponent: React.FC<ModifyComponentProps> = ({ todo, onUpdate, onClose }) => {
  // todo 상태 관리
  const [updatedTodo, setUpdatedTodo] = useState<ITodo>({ ...todo });

  useEffect(() => {
    // 새로운 todo가 전달될 때 상태 초기화
    if (todo.tno !== updatedTodo.tno) {
      setUpdatedTodo({ ...todo });
    }
  }, [todo, updatedTodo.tno]);

  // 입력 필드 변경 시 상태 업데이트
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedTodo((prevTodo) => ({
      ...prevTodo,
      [name]: value,
    }));
  };

  // 변경사항 저장
  const handleSave = () => {
    onUpdate(updatedTodo); // 부모 컴포넌트로 수정된 데이터 전달
    onClose(); // 모달 닫기
  };

  return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          {/* 모달 제목 */}
          <h2 className="text-xl font-semibold mb-4">Modify Todo</h2>

          {/* Todo 입력 필드 */}
          <div className="flex flex-col space-y-4">
            {/* Title 입력 필드 */}
            <div className="flex items-center space-x-4">
              <label className="w-24 text-right">Title:</label>
              <input
                  type="text"
                  name="title"
                  className="border border-gray-300 p-2 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={updatedTodo.title || ''}
                  onChange={handleChange}
                  placeholder="Title"
              />
            </div>

            {/* Writer 입력 필드 */}
            <div className="flex items-center space-x-4">
              <label className="w-24 text-right">Writer:</label>
              <input
                  type="text"
                  name="writer"
                  className="border border-gray-300 p-2 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={updatedTodo.writer || ''}
                  onChange={handleChange}
                  placeholder="Writer"
              />
            </div>

            {/* Due Date 입력 필드 */}
            <div className="flex items-center space-x-4">
              <label className="w-24 text-right">Due Date:</label>
              <input
                  type="date"
                  name="dueDate"
                  className="border border-gray-300 p-2 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={updatedTodo.dueDate ? new Date(updatedTodo.dueDate).toISOString().split('T')[0] : ''}
                  onChange={handleChange}
              />
            </div>

            {/* Save 및 Cancel 버튼 */}
            <div className="flex space-x-4 justify-end pt-4">
              {/* Save 버튼 */}
              <button
                  className="bg-blue-500 text-graydark p-2 rounded-lg hover:bg-blue-600 focus:outline-none"
                  onClick={handleSave}
              >
                Save
              </button>
              {/* Cancel 버튼 */}
              <button
                  className="bg-gray-500 text-graydark p-2 rounded-lg hover:bg-gray-600 focus:outline-none"
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
