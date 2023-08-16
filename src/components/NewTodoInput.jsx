import React from "react";
import { Input } from "antd";
const { Search } = Input;

export const NewTodoInput = ({ loading, onAddTodoItem }) => {
  const [value, setValue] = React.useState("");

  const onPressButton = () => {
    onAddTodoItem(value);
    setValue("");
  };

  return (
    <Search
      loading={loading}
      style={{ margin: "20px 0" }}
      placeholder="Введите новое задание"
      enterButton="Добавить"
      size="large"
      allowClear
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onSearch={onPressButton}
    />
  );
};
