import React, { useEffect, useState } from "react";

import { useParams, useNavigate, Link } from "react-router-dom";

import {
  Breadcrumb,
  Layout,
  Divider,
  Checkbox,
  Button,
  Row,
  Col,
  Input,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const { Search } = Input;
const { Header, Content } = Layout;

export const TodoItemPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;

  const [todoItem, setTodoItem] = useState(null);
  const [requestUpdate, setRequestUpdate] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (requestUpdate) {
      fetch(`http://localhost:3001/todos/${id}`)
        .then((loadedData) => loadedData.json())
        .then((loadedTodo) => {
          setTodoItem(loadedTodo);
        });
    }
    setRequestUpdate(false);
    setLoading(false);
  }, [requestUpdate]);

  const onCheckboxClick = async () => {
    setLoading(true);
    await fetch(`http://localhost:3001/todos/${todoItem.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        completed: !todoItem.completed,
      }),
    });
    setRequestUpdate(true);
  };

  const onSaveTodoTitle = async () => {
    setLoading(true);
    await fetch(`http://localhost:3001/todos/${todoItem.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        title: todoItem.title,
      }),
    });
    setRequestUpdate(true);
    setIsEditMode(false);
  };

  const onDeleteClick = async () => {
    setLoading(true);
    await fetch(`http://localhost:3001/todos/${todoItem.id}`, {
      method: "DELETE",
    });
    navigate("/");
    setRequestUpdate(true);
  };

  if (!todoItem?.id && loading) {
    return <div>Loading...</div>;
  }

  if (!todoItem?.id && !loading) {
    return <div>Такое дело не существует</div>;
  }

  return (
    <Layout className="layout">
      <Header className="header">
        <h3>{`Дело № ${todoItem.id}`}</h3>
      </Header>
      <Content style={{ padding: "50px 50px" }}>
        <Link to="/">
          <div>{"<- Назад"}</div>
        </Link>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Список дел</Breadcrumb.Item>
          <Breadcrumb.Item>{`Дело № ${todoItem.id}`}</Breadcrumb.Item>
        </Breadcrumb>
        <Divider />
        <Row gutter={16} className="todo-item-page">
          <Col span={2}>
            <Checkbox checked={todoItem.completed} onClick={onCheckboxClick} />
          </Col>
          <Col span={18}>
            {isEditMode ? (
              <Search
                placeholder="Введите новое значение дела"
                value={todoItem.title}
                enterButton="Сохранить"
                onChange={(e) =>
                  setTodoItem({ ...todoItem, title: e.target.value })
                }
                onSearch={onSaveTodoTitle}
              />
            ) : (
              <span>{todoItem.title}</span>
            )}
          </Col>
          <Col span={4}>
            <Button
              value="small"
              icon={<EditOutlined />}
              onClick={() => setIsEditMode(true)}
            />
            <br />
            <br />
            <Button
              danger
              value="small"
              icon={<DeleteOutlined />}
              onClick={onDeleteClick}
            />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};
