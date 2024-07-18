import React, { useEffect, useState } from "react";
import "./App.css";
import { getUsers } from "./API/main";
import { UI } from "./components/UI/main";
import FindUserForm from "./components/FindUserForm";
import UserList from "./components/UserList";
import { UserI } from "./types";

function App() {
  const [userList, setUserList] = useState<UserI[]>([]);

  useEffect(() => {
    getUsers().then((users) => setUserList(users));
  }, []);

  return (
    <div className="App">
      <FindUserForm setUserList={setUserList} />
      <hr style={{ padding: "0 0px", margin: "10px 0" }} />
      <UserList users={userList} />
    </div>
  );
}

export default App;
