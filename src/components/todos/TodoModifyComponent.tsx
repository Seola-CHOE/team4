import React, { useState } from 'react';
import { ITodo } from "../../types/todo.ts";

interface ModifyComponentProps {
  todo: ITodo;
  onUpdate: (todo: ITodo) => void;
  onDelete: (tno: number) => void;
  onClose: () => void;
}

const ModifyComponent: React.FC<ModifyComponentProps> = ({ todo, onUpdate, onDelete, onClose }) => {
  const [title, setTitle] = useState(todo.title);
  const [writer, setWriter] = useState(todo.writer);
  const [dueDate, setDueDate] = useState(new Date(todo.dueDate).toISOString().substring(0, 10));

  const handleUpdate = (e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedTodo = { ...todo, title, writer, dueDate };
    onUpdate(updatedTodo);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(todo.tno);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded p-5">
        <h2 className="text-lg font-semibold">Edit Todo</h2>
        <div className="mt-4">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="mt-4">
          <label>Writer:</label>
          <input
            type="text"
            value={writer}
            onChange={(e) => setWriter(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="mt-4">
          <label>Due Date:</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <button onClick={handleUpdate} className="bg-blue-500 text-white p-2 rounded">Update</button>
          <button onClick={handleDelete} className="bg-red-500 text-white p-2 rounded">Delete</button>
          <button onClick={onClose} className="bg-gray-300 p-2 rounded">Close</button>
        </div>
      </div>
    </div>
  );
};

export default ModifyComponent;
