import React, { useEffect, useState } from 'react';
import { useGetTodosQuery, useDeleteTodoMutation } from '../redux/api';
import { useNavigate } from "react-router-dom";
import AddTodo from './AddTodo';

const Home = () => {
  const { data, isLoading, error } = useGetTodosQuery();
  const [todos, setTodos] = useState([]);
  const [deleteTodo] = useDeleteTodoMutation();
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all"); 
  


  useEffect(() => {
    if (data?.data) {
      const fetchedTodos = data.data.map((todo) => ({
        id: todo._id,
        title: todo.title,
        description: todo.description,
        completed: todo.isComplete,
      }));

      setTodos(fetchedTodos);
    }
  }, [data]);



  const handleToggle = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };



  const handleDelete = async (id) => {
    try {
      const response = await deleteTodo(id).unwrap();
      console.log("DELETE:", response);
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    } catch (err) {
      console.error("Failed to delete todo:", err);
    }
  };



  if (isLoading) {
    return (
      <p className="text-center mt-10 text-white text-xl">
      Loading...
      </p>
    );
  }


  if (error) {
    console.error("Error:", error);
    return <p className="text-center mt-10 text-white text-xl">
    Failed to load todos.
    </p>;
  }


  const filteredTodos = todos.filter((todo) => {
    if (filter === "active")
      return !todo.completed;
    if (filter === "completed") 
      return todo.completed;

    return true;
  });   


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-indigo-500 flex flex-col items-center py-10 px-4">
      <h1 className="text-4xl font-bold text-white mb-8 drop-shadow-lg text-center">
        Your Todo List
      </h1>

      <AddTodo />
      

      {/* this oneee below | all, active, completed */}
      <div className="flex gap-3 mt-6">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg ${filter === "all" ? "bg-white text-purple-600" : "bg-purple-500 text-white" }`} >

          All
        </button>

        <button
          onClick={() => setFilter("active")}
          className={`px-4 py-2 rounded-lg ${filter === "active" ? "bg-white text-purple-600" : "bg-purple-500 text-white"}`} >

          Active
        </button>

        <button
          onClick={() => setFilter("completed")}
          className={`px-4 py-2 rounded-lg ${filter === "completed" ? "bg-white text-purple-600" : "bg-purple-500 text-white"}`}>

          Completed
        </button>
      </div>   



      <div className="w-full max-w-lg mt-10 space-y-4">
        {todos.length === 0 ? (
          <p className="text-white text-center text-lg">No todos found!</p>
        ) : (
          filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className="flex justify-between items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggle(todo.id)}
                  className="w-5 h-5 accent-purple-500"
                />
                <div>
                  <span
                    className={
                      todo.completed
                        ? "line-through text-gray-500 font-medium"
                        : "text-gray-800 font-medium"}
                  >
                    {todo.title}
                  </span>
                  <p className="text-gray-600">{todo.description}</p>
                </div>
              </div>


              <div className="flex gap-3">
                <button
                  onClick={() => navigate(`/update/${todo.id}`)}
                  className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  Update
                </button>
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
