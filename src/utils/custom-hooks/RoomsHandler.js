import React from "react";

function useRoomsHandler(initialState) {
  const [rooms, setRooms] = React.useState(initialState);

  const addRoom = (room, actionCable) => {
    if (room && room.id && actionCable) {
      room.subscription = actionCable.subscriptions.create(
        {
          channel: "RoomChannel",
          room_id: room.id
        },
        {
          received: msg => {
            console.log(msg);
            addMessageToRoom(msg, room.id);
          }
        }
      );
      setRooms(rooms => [...rooms, room]);
    }
  };

  const addMessageToRoom = (msg, roomId) => {
    setRooms(rooms => {
      const newRooms = rooms.map(r => {
        if (r.id === roomId) {
          return { ...r, messages: [...r.messages, msg] };
        } else {
          return r;
        }
      });
      return newRooms;
    });
  };

  const setActiveRoom = roomId => {
    setRooms(rooms => {
      return rooms.map(r => {
        if (r.id === roomId) {
          return { ...r, is_active: true };
        } else {
          return { ...r, is_active: false };
        }
      });
    });
  };

  return { rooms, addRoom, setActiveRoom };
}

export default useRoomsHandler;
