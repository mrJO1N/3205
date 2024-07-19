import React from "react";
import { UserI } from "../types";

function UserList({ users }: UserListProps) {
  return (
    <div className="UserList">
      {users &&
        users?.map((user, index) => {
          return (
            <div key={index}>
              {user.email} - {user.num}
              <br />
            </div>
          );
        })}
      {!users && <div>No users found</div>}
    </div>
  );
}

interface UserListProps {
  users: Array<UserI>;
}

export default UserList;
