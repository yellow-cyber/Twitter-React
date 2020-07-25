import React, { useState } from "react";
import { api } from "../utils/api";

export default function Tweet({ setFetching }) {
  const [message, setMessage] = useState("");
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      await api.post(
        "/posts",
        {
          message,
        },
        {
          headers: { token: localStorage.token },
        }
      );
      setMessage("");
      setFetching(true);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className="form-group">
      <form onSubmit={(e) => onSubmitForm(e)}>
        <div className="row">
          <div className="col-12 mb-3">
            {" "}
            <textarea
              className="form-control border-0 no-box-shadow"
              id="tweetForm"
              rows="1"
              placeholder="What's happening?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <div className="col-12 text-right">
            <button
              type="submit"
              className="btn align-self-end btn-violet rounded-pill"
            >
              Tweet
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
