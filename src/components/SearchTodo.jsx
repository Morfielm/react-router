import React from "react";
import { Space, Input, Button } from "antd";
const { Search } = Input;

export const SearchTodo = ({ onSearchChange, isSorted, onToggleSort }) => {
  return (
    <Space direction="horizontal">
      <Search
        placeholder="Поиск дела"
        allowClear
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <Button onClick={onToggleSort}>
        {!isSorted ? "Включить сортировку" : "Выключить сортировку"}
      </Button>
    </Space>
  );
};
