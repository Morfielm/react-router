import React, { useEffect, useState, useMemo } from "react";
import { TodoElement } from "./TodoElement";
import { SearchTodo } from "./SearchTodo";
import { NewTodoInput } from "./NewTodoInput";

import { Breadcrumb, Layout, Divider } from "antd";

const { Header, Content } = Layout;

export const JsonServerTodoList = () => {
  const [todos, setTodos] = useState([]);
  const [requestUpdate, setRequestUpdate] = useState(true);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [isSorted, setIsSorted] = useState(false);

  const sortedTodos = useMemo(() => {
    const sortedTodos = [...todos];
    if (isSorted) {
      sortedTodos.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        }
      });
    }
    return sortedTodos.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [todos, searchValue, isSorted]);

  useEffect(() => {
    if (requestUpdate) {
      fetch("http://localhost:3001/todos")
        .then((loadedData) => loadedData.json())
        .then((loadedTodos) => {
          setTodos(loadedTodos);
        });
    }
    setRequestUpdate(false);
    setLoading(false);
  }, [requestUpdate]);

  const onAddTodoItem = async (value) => {
    setLoading(true);
    await fetch("http://localhost:3001/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        title: value,
        completed: false,
      }),
    });
    setRequestUpdate(true);
  };

  const onSearchChange = (value) => {
    setSearchValue(value);
  };
  const onToggleSort = () => {
    setIsSorted(!isSorted);
  };

  return (
    <Layout className="layout">
      <Header className="header">
        <h3>Todo лист (JSON Server)</h3>
      </Header>
      <Content style={{ padding: "50px 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Список дел</Breadcrumb.Item>
        </Breadcrumb>
        <Divider/>
        <SearchTodo
          isSorted={isSorted}
          onSearchChange={onSearchChange}
          onToggleSort={onToggleSort}
        />
        <Divider />
        <NewTodoInput onAddTodoItem={onAddTodoItem} loading={loading} />
        {sortedTodos?.map((todo) => {
          return <TodoElement key={todo.id} item={todo} loading={loading} />;
        })}
      </Content>
    </Layout>
  );
};
