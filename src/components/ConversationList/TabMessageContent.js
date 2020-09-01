import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchConversations,
  setCurrentConversation,
  setCurrentPost,
  setCurrentType,
} from "../../redux/actions/profiles";
import { getTwilioChannel } from "../../redux/actions/twilio";
import LoadingSpinner from "../App/LoadingSpinner";
import ConversationListItem from "../ConversationListItem";

export default function TabMessageContent(props) {
  //   const conversations = useSelector((state) => state.conversations);
  const dispatch = useDispatch();
  const conversations = useSelector((state) => state.profile.conversations);
  const currentTab = useSelector((state) => state.profile.currentTab);
  const twilioUser = useSelector((state) => state.twilio.twilioUser);
  const loadingUser = useSelector((state) => state.twilio.loadingUser);
  //   const conversations = [{ name: "text" }];

  const getConversations = () => {
    // console.log("in function getconversations");
    dispatch(fetchConversations());
    // setConversations([...conversations, ...newConversations]);
  };
  useEffect(
    () => {
      dispatch(
        setCurrentConversation({
          id: null,
          displayName: null,
          haveResponsePerson: false,
        })
      );
      dispatch(setCurrentPost(null));
      dispatch(setCurrentType(null));
      getConversations();
    },
    [currentTab]
  );

  const handleClickListItem = (
    channelName,
    id,
    displayName,
    haveResponsePerson
  ) => {
    // console.log(channelName, id);
    dispatch(setCurrentConversation({ id, displayName, haveResponsePerson }));
    dispatch(getTwilioChannel(twilioUser, channelName));
  };
  return (
    <Fragment>
      {/* <ConversationSearch /> */}
      {!loadingUser ? (
        conversations &&
        conversations.map((conversation) => (
          <ConversationListItem
            handleClickListItem={() =>
              handleClickListItem(
                conversation.channelName,
                conversation.id,
                conversation.displayName,
                conversation.haveResponsePerson
              )
            }
            {...conversation}
            photo={`logo_user.jpg`}
          />
        ))
      ) : (
        <LoadingSpinner />
      )}
    </Fragment>
  );
}
