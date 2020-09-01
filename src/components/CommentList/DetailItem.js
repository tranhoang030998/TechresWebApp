import React, { createElement, useState } from "react";
import { Comment, Tooltip, Avatar, Typography } from "antd";
import moment from "moment";
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
} from "@ant-design/icons";

const { Text, Paragraph } = Typography;
const DetailItem = ({ comment }) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);

  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction("liked");
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction("disliked");
  };

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === "liked" ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(
          action === "disliked" ? DislikeFilled : DislikeOutlined
        )}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,
    <span key="comment-basic-reply-to">Reply to</span>,
  ];

  return (
    <Comment
      actions={actions}
      author={<Text strong>Test User</Text>}
      avatar={<Avatar src="logo_user.jpg" alt="logo_user.jpg" />}
      content={
        <Paragraph>
          {/* We supply a series of design principles, practical patterns and high
          quality design resources (Sketch and Axure), to help people create
          their product prototypes beautifully and efficiently. */}
          {comment.message}
        </Paragraph>
      }
      datetime={
        <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
          <span>{moment(comment.created_time).fromNow()}</span>
        </Tooltip>
      }
    />
  );
};
export default DetailItem;
