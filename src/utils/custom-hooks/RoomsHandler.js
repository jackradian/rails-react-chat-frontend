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
      console.log(rooms);
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

  return { rooms, addRoom };
}

export default useRoomsHandler;
