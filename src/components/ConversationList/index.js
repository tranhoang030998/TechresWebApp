import {
  FacebookOutlined,
  InboxOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { Tabs } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { setCurrentTab } from "../../redux/actions/profiles";
import "./ConversationList.css";
import "./ConversationList.scss";
import TabMessageContent from "./TabMessageContent";
import TabPostContent from "./TabPostContent";

import { Button } from "antd";
import { PoweroffOutlined } from "@ant-design/icons";
import { logout } from "../../redux/actions/auth";
import TabAllContent from "./TabAllContent";
const { TabPane } = Tabs;

export default function ConversationList(props) {
  const dispatch = useDispatch();

  const onTabsChange = (value) => {
    console.log("ontabchangd", value);
    dispatch(setCurrentTab(value));
  };
  return (
    <>
      <div className="conversation-list">
        <Tabs
          defaultActiveKey="2"
          className="Toolbar-tab"
          onChange={(value) => onTabsChange(value)}
        >
          <TabPane
            tab={
              <span>
                <InboxOutlined />
                Tất cả
              </span>
            }
            key="1"
          >
            <TabAllContent />
          </TabPane>
          <TabPane
            tab={
              <span>
                <MessageOutlined />
                Tin nhắn
              </span>
            }
            key="2"
          >
            <TabMessageContent />
          </TabPane>
          <TabPane
            tab={
              <span>
                <FacebookOutlined />
                Bài viết
              </span>
            }
            key="3"
          >
            <TabPostContent />
          </TabPane>
        </Tabs>
        {/* <Toolbar
          title="Messenger"
          leftItems={[
            <ToolbarButton key="cog" icon="ion-ios-cog" />
          ]}
          rightItems={[
            <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />
          ]}
        /> */}
      </div>

      <Button
        type="primary"
        icon={<PoweroffOutlined />}
        style={{ position: "absolute", bottom: "0px", width: "100%" }}
        onClick={() => dispatch(logout())}
      >
        Log Out
      </Button>
    </>
  );
}
