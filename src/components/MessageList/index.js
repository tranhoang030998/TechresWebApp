import { MessageOutlined, UserAddOutlined } from "@ant-design/icons";
import { Typography, Button } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTwilioMessages,
  getTwilioChannel,
} from "../../redux/actions/twilio";
import Compose from "../Compose";
import Message from "../Message";
import Toolbar from "../Toolbar";
import ToolbarButton from "../ToolbarButton";
import "./MessageList.css";
import "./MessageList.scss";
import Axios from "axios";
import com from "../../utils";
import { SET_CURRENT_STATUS } from "../../redux/actions/types";
import LoadingSpinner from "../App/LoadingSpinner";

const { Text } = Typography;
export default function MessageList(props) {
  const [messages, setMessages] = useState([]);
  const currentChannel = useSelector((state) => state.twilio.currentChannel);
  const messagesTwilio = useSelector((state) => state.twilio.messages);
  const currentConversation = useSelector(
    (state) => state.profile.currentConversation
  );
  // const MY_USER_ID = "Hoàng Trần";
  const MY_USER_ID = useSelector((state) => state.profile.currentDisplayName);
  const currentStatus = useSelector((state) => state.profile.currentStatus);
  const messagesEnd = useRef(null);

  const twilioUser = useSelector((state) => state.twilio.twilioUser);
  const loadingMessages = useSelector((state) => state.twilio.loadingMessages);
  // const currentChannel = useSelector((state) => state.twilio.currentChannel);
  // const messages = useSelector((state) => state.twilio.messages);
  const dispatch = useDispatch();
  useEffect(
    () => {
      dispatch(fetchTwilioMessages(currentChannel));
      return () => {};
    },
    [twilioUser, currentChannel]
  );

  useEffect(
    () => {
      mapTwilioMessages();
      // scrollToBottom();
    },
    [messagesTwilio]
  );

  useEffect(
    () => {
      console.log(messages);
      scrollToBottom();
    },
    [messages.length]
  );
  useEffect(
    () => {
      console.log("use effect current channel on message added called");
      if (currentChannel) {
        currentChannel.on("messageAdded", function(message) {
          console.log(messages);
          const newMessages = [...messages];
          console.log("messaged added", message);
          setMessages(
            newMessages.concat({
              id: message.index,
              author: message.author,
              message: message.body,
              timestamp: message.timestamp,
            })
          );
          // scrollToBottom();
        });
      }

      return () => {
        console.log("clean up messaged added");
      };
    },
    [currentChannel, messages]
  );

  const scrollToBottom = () => {
    console.log("Scroll to Bottom");
    messagesEnd.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  const mapTwilioMessages = () => {
    if (messagesTwilio && messagesTwilio.items) {
      const mapedMessages = messagesTwilio.items.map((item) => ({
        id: item.index,
        author: item.author,
        message: item.body,
        timestamp: item.timestamp,
      }));
      setMessages(mapedMessages);
    }
  };

  const joinConversation = async () => {
    await Axios.post(`${com.root}/api/v1/staff:joinConversation`, {
      staffId: localStorage.currentStaffId,
      conversationId: currentConversation,
    });

    dispatch({
      type: SET_CURRENT_STATUS,
      payload: true,
    });

    // dispatch(getTwilioChannel(twilioUser, `CHATBOX_${currentConversation}`));
    // dispatch(fetchTwilioMessages(currentChannel));
  };

  const renderMessages = () => {
    let i = 0;
    let messageCount = messages.length;
    let tempMessages = [];

    while (i < messageCount) {
      let previous = messages[i - 1];
      let current = messages[i];
      let next = messages[i + 1];
      let isMine = current.author === localStorage.userName;
      let currentMoment = moment(current.timestamp);
      let prevBySameAuthor = false;
      let nextBySameAuthor = false;
      let startsSequence = true;
      let endsSequence = true;
      let showTimestamp = true;

      if (previous) {
        let previousMoment = moment(previous.timestamp);
        let previousDuration = moment.duration(
          currentMoment.diff(previousMoment)
        );
        prevBySameAuthor = previous.author === current.author;

        if (prevBySameAuthor && previousDuration.as("hours") < 1) {
          startsSequence = false;
        }

        if (previousDuration.as("hours") < 1) {
          showTimestamp = false;
        }
      }

      if (next) {
        let nextMoment = moment(next.timestamp);
        let nextDuration = moment.duration(nextMoment.diff(currentMoment));
        nextBySameAuthor = next.author === current.author;

        if (nextBySameAuthor && nextDuration.as("hours") < 1) {
          endsSequence = false;
        }
      }

      tempMessages.push(
        <Message
          key={i}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={showTimestamp}
          data={current}
        />
      );

      // Proceed to the next message.
      i += 1;
    }

    return tempMessages;
  };

  return (
    <div className="message-list">
      <Toolbar
        title={MY_USER_ID ? `Conversation of ${MY_USER_ID}` : "List Messages"}
        leftItems={
          MY_USER_ID
            ? [
                // <ToolbarButton
                //   key="info"
                //   icon="ion-ios-information-circle-outline"
                // />,
                // <ToolbarButton key="video" icon="ion-ios-videocam" />,
                // <ToolbarButton key="phone" icon="ion-ios-call" />
                <>
                  <Avatar
                    size={36}
                    src="logo_user.jpg"
                    className="cursor-pointer avatar-mr"
                  />
                  {MY_USER_ID && <Text>{MY_USER_ID}</Text>}
                </>,
                <MessageOutlined className="cursor-pointer" />,
                <UserAddOutlined className="cursor-pointer" />,
              ]
            : []
        }
      />

      {!loadingMessages ? (
        currentStatus && (
          <div className="message-list-container">{renderMessages()}</div>
        )
      ) : (
        <LoadingSpinner />
      )}
      {!currentStatus && (
        <div className="button-join-wrapper">
          <Typography>
            You are not in the conversation, please join to see messages and
            chat with other people
          </Typography>

          {MY_USER_ID && !currentStatus && (
            <Button type="primary" onClick={joinConversation}>
              Join the conversation
            </Button>
          )}
        </div>
      )}
      <Compose
        rightItems={[
          <ToolbarButton key="photo" icon="ion-ios-camera" />,
          <ToolbarButton key="image" icon="ion-ios-image" />,
          <ToolbarButton key="audio" icon="ion-ios-mic" />,
          <ToolbarButton key="money" icon="ion-ios-card" />,
          <ToolbarButton key="games" icon="ion-logo-game-controller-b" />,
          <ToolbarButton key="emoji" icon="ion-ios-happy" />,
        ]}
      />
      <div
        style={{
          float: "left",
          clear: "both",
          position: "relative",
          top: "5px",
          visibility: "hidden",
        }}
        // ref={(el) => {
        //   messagesEnd = el;
        // }}
        ref={messagesEnd}
      >
        ok
      </div>
    </div>
  );
}
