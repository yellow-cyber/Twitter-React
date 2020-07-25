import React from "react";

export default function TweetCard({ tweet }) {
  const { message, user } = tweet;
  return (
    <div className="card mb-1 border-top-0 border-left-0 border-right-0 shadow-sm">
      <div className="row no-gutters">
        <div className="col-md-12">
          <div className="card-body py-3 px-3">
            <div className="card-title h6">
              {user.displayName}{" "}
              <small className="text-muted">@{user.username}</small>{" "}
            </div>
            <p className="card-text">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
