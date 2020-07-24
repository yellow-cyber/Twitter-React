import React, { useState, useEffect } from "react";
import User from "./User";
import { api } from "../../utils/api";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    try {
      const usersApi = await api.get("/users");
      setUsers(usersApi.data);
      console.log(users);
    } catch (error) {
      console.error(error.message);
    }
  };

  return <div>hi</div>;
}
