import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchConversations,
  fetchPostFanpage,
  setCurrentConversation,
  setCurrentPost,
  setCurrentType,
} from "../../redux/actions/profiles";
import { getTwilioChannel } from "../../redux/actions/twilio";
import LoadingSpinner from "../App/LoadingSpinner";
import ConversationListItem from "../ConversationListItem";
export default function TabAllContent(props) {
  //   const conversations = useSelector((state) => state.conversations);
  const dispatch = useDispatch();
  const conversations = useSelector((state) => state.profile.conversations);
  const posts = useSelector((state) => state.profile.posts);
  const currentTab = useSelector((state) => state.profile.currentTab);
  const twilioUser = useSelector((state) => state.twilio.twilioUser);
  const loadingPost = useSelector((state) => state.profile.loadingPost);
  //   const conversations = [{ name: "text" }];

  const getConversations = () => {
    // console.log("in function getconversations");
    dispatch(fetchConversations());
    // setConversations([...conversations, ...newConversations]);
  };
  const getPostFanpage = () => {
    console.log("in function getPostFanpage");
    dispatch(fetchPostFanpage());
    // setConversations([...conversations, ...newConversations]);
  };
  useEffect(() => {
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
    getPostFanpage();
  }, []);

  const handleClickListItem = (item) => {
    // console.log(channelName, id);
    const { id, displayName, haveResponsePerson, channelName } = { ...item };
    dispatch(setCurrentType(item.type));
    if (item.type === "conversation") {
      dispatch(setCurrentConversation({ id, displayName, haveResponsePerson }));
      dispatch(getTwilioChannel(twilioUser, channelName));
    } else {
      dispatch(setCurrentPost(item));
    }
  };

  const allContents = [
    ...(conversations &&
      conversations.map((item) => ({ type: "conversation", ...item }))),
    ...(posts && posts.map((item) => ({ type: "post", ...item }))),
  ];

  console.log(allContents);
  return (
    <Fragment>
      {/* <ConversationSearch /> */}
      {!loadingPost ? (
        allContents &&
        allContents.map((item) => (
          <ConversationListItem
            handleClickListItem={() => handleClickListItem(item)}
            {...item}
            photo={`logo_user.jpg`}
          />
        ))
      ) : (
        <LoadingSpinner />
      )}
    </Fragment>
  );
}
