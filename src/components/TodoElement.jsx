import React from "react";
import { Row, Col, Button, Divider } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export const TodoElement = ({
  item,
  loading,
  onCheckboxClick,
  onDeleteClick,
}) => {
  const { title, id } = item;

  return (
    <Link to={`/task/${id}`} >
      <div className="todo-item">
        <Divider />
        <Row gutter={16}>
          <Col span={18}>
            <span className="todo-item-text">{title}</span>
          </Col>
          {!!onDeleteClick && (
            <Col span={6}>
              <Button
                danger
                value="small"
                loading={loading}
                icon={<DeleteOutlined />}
                onClick={() => onDeleteClick(id)}
              />
            </Col>
          )}
        </Row>
      </div>
    </Link>
  );
};
