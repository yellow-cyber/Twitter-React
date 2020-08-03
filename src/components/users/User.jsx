import React, { useState } from "react";
import { api } from "../../utils/api";

function User({ user, setProfileUpdate }) {
  const { displayName, username, id } = user;
  const [followed, setFollowed] = useState(false);

  const follow = async (e) => {
    e.preventDefault();
    try {
      await api.post(`users/${id}/follow`, null, {
        headers: { token: localStorage.token },
      });
      setFollowed(!followed);
      setProfileUpdate(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="card mb-1 shadow-sm  card-max-width-540">
      <div className="row no-gutters">
        <div className="col-md-12">
          <div className="card-body py-2 px-3">
            <div className="card-title h6">
              {displayName} <small className="text-muted">@{username}</small>{" "}
            </div>
            <button
              onClick={(e) => follow(e)}
              className={`btn btn-sm rounded-pill ${
                !followed ? "btn-outline-violet" : "btn-violet"
              }`}
            >
              {!followed ? "Follow" : "Following"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
