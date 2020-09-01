import { message, Typography } from "antd";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useSelector } from "react-redux";
import reqwest from "reqwest";
import com from "../../utils";
import Toolbar from "../Toolbar";
import CommentItem from "./CommentItem";
import "./commentList.scss";
const { Text } = Typography;
const fakeDataUrl =
  "https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo";

export default function CommentList(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const currentPost = useSelector((state) => state.profile.currentPost);

  useEffect(
    () => {
      if (currentPost) {
        console.log(currentPost);
        Axios.get(
          `${com.root}/api/v1/fetchAllCommentByPost/${currentPost.id}`
        ).then((res) => {
          console.log(res.data.data.comment.data);
          setData(res.data.data.comment.data);
        });
      }
    },
    [currentPost]
  );
  const fetchData = (callback) => {
    reqwest({
      url: fakeDataUrl,
      type: "json",
      method: "get",
      contentType: "application/json",
      success: (res) => {
        callback(res);
      },
    });
  };

  const handleInfiniteOnLoad = () => {
    setLoading(true);
    if (data.length > 14) {
      message.warning("Infinite List loaded all");
      setHasMore(false);
      setLoading(false);
      return;
    }
    fetchData((res) => {
      data = data.concat(res.results);
      setData(data);
      setLoading(false);
    });
  };

  return (
    <div className="message-list">
      <Toolbar
        title="Comments"
        leftItems={
          [
            // ,
            // <ToolbarButton
            //   key="info"
            //   icon="ion-ios-information-circle-outline"
            // />,
            // <ToolbarButton key="video" icon="ion-ios-videocam" />,
            // <ToolbarButton key="phone" icon="ion-ios-call" />
            // <MessageOutlined className="cursor-pointer" />,
            // <UserAddOutlined className="cursor-pointer" />,
          ]
        }
      />

      <div className="demo-infinite-container">
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={handleInfiniteOnLoad}
          hasMore={!loading && hasMore}
          useWindow={false}
        >
          {currentPost && <CommentItem comments={data} />}

          {/* <List
            dataSource={data}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <List.Item.Meta
                  avatar={<Avatar src="logo_user.jpg" />}
                  title={<a href="https://ant.design">Test User</a>}
                  description={moment(item.created_time).format(
                    "DD-MM-YY, HH:mm"
                  )}
                />
                <div>{item.message}</div>
              </List.Item>
            )}
          >
            {loading && hasMore && (
              <div className="demo-loading-container">
                <Spin />
              </div>
            )}
          </List> */}
        </InfiniteScroll>
      </div>
    </div>
  );
}
