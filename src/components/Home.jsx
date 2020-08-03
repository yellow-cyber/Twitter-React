import React, { useState } from "react";
import UserList from "./users/UserList";
import Profile from "./Profile";
import Feed from "./Feed";

export default function Home() {
  const [profileUpdate, setProfileUpdate] = useState(false);
  return (
    <div className="container-fluid pt-3">
      <div className="row">
        <div className="col-lg-3 mb-2  col-md-6">
          <Profile
            profileUpdate={profileUpdate}
            setProfileUpdate={setProfileUpdate}
          ></Profile>
        </div>
        <div className="col-lg-6  px-0 col-md-6  ">
          <Feed setProfileUpdate={setProfileUpdate} />
        </div>
        <div className="col-lg-3 col-md-6 ">
          <UserList setProfileUpdate={setProfileUpdate}></UserList>
        </div>
      </div>
    </div>
  );
}
