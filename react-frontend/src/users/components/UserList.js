import React, { useState } from "react";

import UserItem from "./UserItem";
import Card from "../../shared/components/UIElements/Card";
import "./UserList.css";

const UserList = (props) => {
  const [searchItem, setSearchItem] = useState("");
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No users found!</h2>
        </Card>
      </div>
    );
  }

  const usersPlaces = props.items.filter((user) => {
    return user.places.length !== 0;
  });

  let output = usersPlaces.filter(
    (user) =>
      user.places[0].title
        .toLowerCase()
        .replace(/\s/g, "")
        .indexOf(searchItem.toLowerCase().replace(/\s/g, "")) !== -1
  );

  const searchChangeHandler = (event) => {
    setSearchItem(event.target.value);
  };

  return (
    <React.Fragment>
      <div className="center">
        <input
          className="search"
          type="text"
          placeholder="What place is on your mind?"
          value={searchItem}
          onChange={searchChangeHandler}
        />
      </div>
      <ul className="users-list">
        {output.map((user) => {
          return (
            <UserItem
              key={user.id}
              id={user.id}
              name={user.name}
              image={user.image}
              placeCount={user.places.length}
            />
          );
        })}
      </ul>
    </React.Fragment>
  );
};

export default UserList;
