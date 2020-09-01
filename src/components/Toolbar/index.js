import { Typography } from "antd";
import React from "react";
import "./Toolbar.css";
import "./Toolbar.scss";

const { Title, Paragraph, Text } = Typography;

export default function Toolbar(props) {
  const { title, leftItems, rightItems } = props;
  return (
    <div className="toolbar">
      <div className="left-items">{leftItems}</div>
      <Title level={3} className="toolbar-title">
        {title}
      </Title>
      <div className="right-items">{rightItems}</div>
    </div>
  );
}
