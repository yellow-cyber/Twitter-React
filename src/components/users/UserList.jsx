import React, { useState, useEffect } from "react";
import User from "./User";
import { api } from "../../utils/api";
function UserList({ setProfileUpdate }) {
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    const res = await api.get("/who-to-follow", {
      params: {
        limit: 5,
      },
      headers: { token: localStorage.token },
    });
    setUsers(res.data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const refresh = async (e) => {
    e.preventDefault();
    getUsers();
  };

  return (
    <div className="py-2 px-3 border-0 shadow-sm card">
      <div className="h6 text-secondary mt-1 mb-2 ">
        Who to follow{" "}
        <span>
          <small>
            <a
              href="/"
              className="pointer hover-link"
              onClick={(e) => refresh(e)}
            >
              Refresh{" "}
            </a>{" "}
          </small>
        </span>
        <span>
          <small>
            <a href="/" className="pointer hover-link">
              View All
            </a>
          </small>
        </span>
      </div>

      {users.map((user) => {
        return (
          <User
            key={user.id}
            user={user}
            setProfileUpdate={setProfileUpdate}
          ></User>
        );
      })}
    </div>
  );
}

export default UserList;
