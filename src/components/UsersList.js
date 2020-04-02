import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

function UsersList({ rooms, handleRoomClick }) {
  const showList =
    rooms &&
    rooms.length > 0 &&
    rooms.map(room => (
      <ListItem button key={room.id} onClick={() => handleRoomClick(room.id)}>
        <ListItemAvatar>
          <Avatar>
            <AccountCircleIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={room.user_nickname} />
      </ListItem>
    ));

  return <List>{showList}</List>;
}

export default UsersList;
