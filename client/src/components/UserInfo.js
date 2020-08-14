import React from "react";
import Avatar from "react-avatar";
import moment from "moment";
import { Smartphone, Clock, User } from "react-feather";

import "./UserInfo.scss";
import Title from "./Title";

export default function UserInfo({ userInfo }) {
  const { firstName, lastName, phone, username, createdAt } = userInfo;
  return (
    <div>
      <Title title="UserInfo" />
      <div className="user-info">
        <Avatar name={username} size={100} round={true} textSizeRatio={1.5} />
        <div className="info">
          <h2>
            {firstName} {lastName}
          </h2>
          <div className="icon">
            <User />
            <p>{username}</p>
          </div>
          <div className="icon">
            <Smartphone />
            <p>{phone}</p>
          </div>
          <div className="icon">
            <Clock />
            <p>
              Registered <b> {moment(createdAt).fromNow()}</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
