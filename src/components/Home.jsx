import React, { useState } from "react";
import UserList from "./users/UserList";
import Profile from "./Profile";
import Feed from "./Feed";

export default function Home() {
  const [followToggle, setFollowToggle] = useState(false);
  return (
    <div className="container pt-3">
      <div className="row">
        <div className="col-lg-3  col-md-6">
          <Profile
            followToggle={followToggle}
            setFollowToggle={setFollowToggle}
          ></Profile>
        </div>
        <div className="col-lg-6  px-0 col-md-6 ">
          <Feed />
        </div>
        <div className="col-lg-3 col-md-6">
          <UserList setFollowToggle={setFollowToggle}></UserList>
        </div>
      </div>
    </div>
  );
}
