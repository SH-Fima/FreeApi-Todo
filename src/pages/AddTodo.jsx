import React, { useState } from "react";
import { useAddTodosMutation } from "../redux/api";

const AddTodo = () => {   
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [addTodo, { isLoading }] = useAddTodosMutation();

  const handleTodo = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("Please enter both title and description!");
      return;
    }

    try {
      const newTodo = await addTodo({
        title,
        description,
      }).unwrap();

      console.log("Todo add successfull:", newTodo);
      
      setTitle("");
      setDescription("");

    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  return (
    <div className="max-w-xl w-full mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-5 text-gray-800 text-center">
        Add New Task
      </h2>

      <form className="space-y-4">
        <input
          type="text"
          placeholder="Task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-800 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500" />

        <input
          type="text"
          placeholder="Task description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-7 rounded-lg bg-gray-100 text-gray-800 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500" />


        <button
          onClick={handleTodo}
          className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
          disabled={isLoading}>
            
          {isLoading ? "Adding..." : "Add Task"}
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
