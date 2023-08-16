import React from "react";
import { Row, Col, Checkbox, Button, Divider } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

export const TodoElement = ({
  item,
  loading,
  onCheckboxClick,
  onDeleteClick,
}) => {
  const { title, completed, id } = item;

  return (
    <>
      <Divider />
      <Row gutter={16}>
        <Col span={18}>
          <Checkbox
            checked={completed}
            disabled={loading}
            onClick={() => {
              if (onCheckboxClick) {
                onCheckboxClick(id);
              }
            }}
          >
            {title}
          </Checkbox>
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
    </>
  );
};
