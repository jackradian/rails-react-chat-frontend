import React from "react";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";

function UsersList({ rooms, handleRoomClick }) {
  const showList =
    rooms.length > 0 &&
    rooms.map(room => (
      <ListItem
        button
        key={room.id}
        selected={room.is_current}
        onClick={() => handleRoomClick(room)}
      >
        <ListItemAvatar>
          <Avatar>{room.user_nickname.slice(0, 2)}</Avatar>
        </ListItemAvatar>
        <ListItemText primary={room.user_nickname} />
      </ListItem>
    ));

  return <List disablePadding>{showList}</List>;
}

UsersList.propTypes = {
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      is_current: PropTypes.bool,
      messages: PropTypes.array
    })
  ),
  handleRoomClick: PropTypes.func.isRequired
};

export default UsersList;
