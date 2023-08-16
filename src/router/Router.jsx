import React from "react";
import { Routes, Route } from "react-router-dom";

import { JsonServerTodoList } from "../components/JsonServerTodoList";
import { TodoItemPage } from "../components/TodoItemPage";

const NotFound = () => <div>Такая страница не существует</div>;

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<JsonServerTodoList />} />
      <Route path="/task/:id" element={<TodoItemPage/>}/>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
