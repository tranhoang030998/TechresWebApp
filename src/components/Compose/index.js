import React, { useState } from "react";
import "./Compose.css";
import { Input } from "antd";
import Axios from "axios";
import com from "../../utils";
import { useSelector } from "react-redux";

export default function Compose(props) {
  const [input, setInput] = useState("");
  const currentConversation = useSelector(
    (state) => state.profile.currentConversation
  );
  const currentStatus = useSelector((state) => state.profile.currentStatus);

  const handlePressEnter = async () => {
    if (currentStatus) {
      console.log("call api send msg", input);
      await Axios.post(`${com.root}/api/v1/chat:sendMessageToFacebook`, {
        staffId: localStorage.currentStaffId,
        conversationId: currentConversation,
        content: input,
      });
      setInput("");
    } else {
      window.alert("Please join the channel to send message!");
    }
  };
  return (
    <div className="compose">
      <Input
        type="text"
        className="compose-input"
        placeholder="Type a message, @name"
        onChange={(e) => setInput(e.target.value)}
        value={input}
        onPressEnter={handlePressEnter}
      />

      {props.rightItems}
    </div>
  );
}
