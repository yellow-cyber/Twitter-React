import React, { useState, useEffect } from "react";
import TweetCard from "./TweetCard";
import { api } from "../utils/api";

export default function TweetsList({
  fetching,
  setFetching,
  setProfileUpdate,
}) {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    async function getUsers() {
      const res = await api.get("/posts", {
        headers: { token: localStorage.token },
      });
      setTweets(res.data);
      setFetching(false);
      setProfileUpdate(true);
    }
    getUsers();
  }, [fetching, setFetching, setProfileUpdate]);
  return (
    <div>
      {tweets.map((tweet) => {
        return <TweetCard tweet={tweet} key={tweet.id}></TweetCard>;
      })}
    </div>
  );
}
