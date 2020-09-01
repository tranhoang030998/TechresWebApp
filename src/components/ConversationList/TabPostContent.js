import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPostFanpage,
  setCurrentPost,
  setCurrentConversation,
  setCurrentType,
} from "../../redux/actions/profiles";
import ConversationListItem from "../ConversationListItem";
import {
  GET_TWILIO_CHANNEL,
  FETCH_TWILIO_MESSAGES_SUCCESS,
} from "../../redux/actions/types";
import LoadingSpinner from "../App/LoadingSpinner";

export default function TabPostContent(props) {
  //   const conversations = useSelector((state) => state.conversations);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.profile.posts);
  const currentTab = useSelector((state) => state.profile.currentTab);
  const loadingPost = useSelector((state) => state.profile.loadingPost);
  //   const conversations = [{ name: "text" }];

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
      dispatch({
        type: FETCH_TWILIO_MESSAGES_SUCCESS,
        payload: [],
      });
      dispatch({
        type: GET_TWILIO_CHANNEL,
        payload: null,
      });
      getPostFanpage();
    },
    [currentTab]
  );

  const getPostFanpage = () => {
    console.log("in function getPostFanpage");
    dispatch(fetchPostFanpage());
    // setConversations([...conversations, ...newConversations]);
  };

  const handleClickListItem = (post) => {
    console.log(post);
    dispatch(setCurrentPost(post));
  };
  return (
    <Fragment>
      {/* <ConversationSearch /> */}
      {!loadingPost ? (
        posts &&
        posts.map((post) => (
          <ConversationListItem
            handleClickListItem={() => handleClickListItem(post)}
            {...post}
            photo={`logo_user.jpg`}
          />
        ))
      ) : (
        <LoadingSpinner />
      )}
    </Fragment>
  );
}
