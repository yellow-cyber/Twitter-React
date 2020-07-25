import React, { useState } from "react";
import Tweet from "./Tweet";
import TweetsList from "./TweetsList";

export default function Feed() {
  const [fetching, setFetching] = useState(false);

  return (
    <div className="py-2 px-3 border-0">
      <div className="row">
        <div className="col-12 card border-0 ">
          <div className="h6 border-bottom py-3">Home</div>
        </div>
        <div className="col-12 border-bottom  card border-0">
          <Tweet setFetching={setFetching}></Tweet>
        </div>
        <div className="col-12 px-0 py-2">
          <TweetsList
            fetching={fetching}
            setFetching={setFetching}
          ></TweetsList>
        </div>
      </div>
    </div>
  );
}
