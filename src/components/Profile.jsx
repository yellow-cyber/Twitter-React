import React, { useState, useEffect } from "react";
import { api } from "../utils/api";

export default function Profile({ profileUpdate, setProfileUpdate }) {
  const [user, setUser] = useState({});

  const getUser = async () => {
    try {
      const res = await api.get("/profile", {
        headers: { token: localStorage.token },
      });
      setUser(res.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const {
    displayName,
    username,
    followersCount,
    followingCount,
    postsCount,
  } = user;
  useEffect(() => {
    getUser();
    setProfileUpdate(false);
  }, [profileUpdate, setProfileUpdate]);

  return (
    <div className="py-2 px-3 border-0 shadow-sm card">
      <div className="h6 mt-1 mb-2 ">
        {displayName} <small className="text-muted">@{username}</small>
      </div>
      <div className="row text-center  px-2">
        <div className="col-4 px-0  ">
          <div className="text-muted  small">Tweets</div>
          <div className=" p font-weight-bold ">{postsCount}</div>
        </div>
        <div className="col-4 px-0 ">
          <div className="text-muted  small">Following</div>
          <div className="p font-weight-bold ">{followingCount}</div>
        </div>
        <div className="col-4 px-0 ">
          <div className="text-muted  small">Followers</div>
          <div className="font-weight-bold  p">{followersCount}</div>
        </div>
      </div>
    </div>
  );
}
