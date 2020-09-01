import React from "react";
import ConversationList from "../ConversationList";
import MessageList from "../MessageList";
import CommentList from "../CommentList";
import "./Messenger.css";
import { useSelector } from "react-redux";
export default function Messenger(props) {
  const currentTab = useSelector((state) => state.profile.currentTab);
  const currentType = useSelector((state) => state.profile.currentType);
  return (
    <>
      <div className="messenger">
        <div className="scrollable sidebar">
          <ConversationList />
        </div>

        <div className="scrollable content">
          {currentTab == 2 ? (
            <MessageList />
          ) : currentTab == 3 ? (
            <CommentList />
          ) : currentType == "conversation" ? (
            <MessageList />
          ) : currentType == "post" ? (
            <CommentList />
          ) : null}
        </div>
      </div>
    </>
  );
}
