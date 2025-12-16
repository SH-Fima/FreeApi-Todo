import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateTodoMutation, useGetTodosQuery } from "../redux/api";


const UpdateTodo = () => {
  const { id } = useParams(); 
  const { data } = useGetTodosQuery(); 
  const [updateTodo] = useUpdateTodoMutation();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {

    if (data?.data) {
      const todo = data.data.find((t) => t._id === id);
      if (todo) {
        setTitle(todo.title || "");
        setDescription(todo.description || "");
      }
    }
  }, [data, id]);


  const handleConfirm = async () => {
    if (!title.trim() || !description.trim()) {
      alert("Title and description cannot be empty!");
      return;
    }

    try {
      await updateTodo({ id, title, description }).unwrap();

      console.log("Todo update done!");

      navigate("/"); 
    } catch (err) {
      console.error("Failed to update todo", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-animate">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Update Todo
        </h2>

        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"/>
        </div>

        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"/>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateTodo;
