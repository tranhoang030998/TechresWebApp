import { Avatar, Card, Row, Space, Typography } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./CommentItem.scss";
import DetailItem from "./DetailItem";
import { FacebookIcon, FacebookShareButton, TwitterIcon } from "react-share";
const { Text, Link, Paragraph, Title } = Typography;

function CommentItem({ comments }) {
  const currentPost = useSelector((state) => state.profile.currentPost);
  const [like, setLike] = useState(false);

  return (
    <Card className="card">
      {/* <!-- post title start --> */}
      <Row className="post-title mb-2" align="middle">
        {/* <!-- profile picture end --> */}
        <div className="profile-thumb mr-2">
          <Avatar
            shape="square"
            size={64}
            src="logo_user.jpg"
            alt="profile picture"
          />
        </div>
        {/* <!-- profile picture end --> */}

        <div className="posted-author">
          <Title level={4} className="author">
            Techres Intern
          </Title>
          <Typography className="post-time">
            {moment(currentPost.created_time).fromNow()}
            {/* 20 mintues ago */}
          </Typography>
        </div>
      </Row>
      {/* <!-- post title start --> */}
      <div className="post-content">
        <div className="post-thumb-gallery">
          <figure className="post-thumb img-popup">
            <a href={currentPost.full_picture}>
              <img src={currentPost.full_picture} alt="post image" />
            </a>
          </figure>
        </div>
        <Paragraph className="post-title" strong>
          Techres Intern posted on your timeline
        </Paragraph>
        <Paragraph className="post-desc">{currentPost.name}</Paragraph>
        <div className="post-meta">
          <div type="primary" className="post-meta-like post-after mr-2">
            <Row align="middle">
              {!like ? (
                <ion-icon
                  name="heart-outline"
                  style={{ cursor: "pointer" }}
                  onClick={() => setLike(true)}
                />
              ) : (
                <ion-icon
                  name="heart"
                  style={{ cursor: "pointer" }}
                  onClick={() => setLike(false)}
                />
              )}
              <span className="ml-1">Likes ({like ? 21 : 20})</span>
              {/* <strong>201</strong> */}
            </Row>
          </div>
          <div type="primary" className="post-comment post-after mr-2">
            <Row align="middle">
              <ion-icon
                name="chatbox-ellipses-outline"
                style={{ cursor: "pointer" }}
              />
              <span className="ml-1">Comments ({comments.length})</span>
            </Row>
          </div>
          <div type="primary" className="post-share mr-2">
            <Row align="middle">
              <FacebookShareButton
                url={"http://taikhoan.techres.vn/"}
                quote={"Techres is awesome, join us now!"}
                className="cursor-pointer"
              >
                <ion-icon
                  name="share-social-outline"
                  style={{ cursor: "pointer" }}
                />
              </FacebookShareButton>
              {/* <TwitterIcon size={32} round={true} /> */}

              <span className="ml-1">Shares (07)</span>
            </Row>
          </div>
        </div>
      </div>
      <Space />
      {comments.map((comment) => (
        <DetailItem comment={comment} />
      ))}
    </Card>
  );
}

CommentItem.propTypes = {};

export default CommentItem;
