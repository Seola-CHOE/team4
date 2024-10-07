import React, { useState, useEffect } from 'react';
import { ITodo } from '../../types/todo';

interface ModifyComponentProps {
  todo: ITodo;
  onUpdate: (updatedTodo: ITodo) => void;
  onClose: () => void;
}

const ModifyComponent: React.FC<ModifyComponentProps> = ({ todo, onUpdate, onClose }) => {

  const [updatedTodo, setUpdatedTodo] = useState<ITodo>({ ...todo });

  useEffect(() => {

    if (todo.tno !== updatedTodo.tno) {
      setUpdatedTodo({ ...todo });
    }
  }, [todo, updatedTodo.tno]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedTodo((prevTodo) => ({
      ...prevTodo,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onUpdate(updatedTodo);
    onClose();
  };

  return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">

          <h2 className="text-xl font-semibold mb-4">Modify Todo</h2>


          <div className="flex flex-col space-y-4">

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


            <div className="flex space-x-4 justify-end pt-4">

              <button
                  className="bg-blue-500 text-graydark p-2 rounded-lg hover:bg-blue-600 focus:outline-none"
                  onClick={handleSave}
              >
                Save
              </button>

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
