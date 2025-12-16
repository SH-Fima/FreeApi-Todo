import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import UpdateTodo from './components/UpdateTodo';
import AddTodo from './pages/AddTodo';

const App = () => {
  return (
    <Routes>
     
      <Route path="/" element={<Home />} />

     
      <Route path="/update/:id" element={<UpdateTodo />} />

      
      <Route path="/todo/add" element={<AddTodo />} />
    </Routes>
  );
};

export default App;
