import React, { useState, useEffect, useMemo } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import blueGrey from "@material-ui/core/colors/blueGrey";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import PersonAddRoundedIcon from "@material-ui/icons/PersonAddRounded";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import actionCable from "actioncable";

import UsersList from "./UsersList";
import MessageWindow from "./MessageWindow";
import MessageInput from "./MessageInput";
import { myDirectRooms } from "../api/userApi";

const drawerWidth = 240;

const CableApp = {};
CableApp.cable = actionCable.createConsumer("ws://localhost:3000/cable");

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexGrow: 1,
    height: "100%",
    background: blueGrey["50"]
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(9) + 1
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
  },
  content: {
    display: "flex",
    height: "100vh",
    flexDirection: "column",
    flexGrow: 1,
    padding: theme.spacing(1)
  }
}));

function ChatHome() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [currentRoomId, setCurrentRoomId] = useState(0);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    myDirectRooms().then(data => {
      console.log(data);
      if (data && data.err === 0) {
        setRooms(data.rooms);
      }
    });
  }, []);

  const currentRoomMessages = useMemo(() => {
    const currentRoom = rooms.find(room => room.id === currentRoomId);
    if (currentRoom) {
      return currentRoom.messages;
    } else {
      return null;
    }
  }, [rooms, currentRoomId]);

  function handleRoomClick(room_id) {
    setCurrentRoomId(room_id);
    CableApp.room = CableApp.cable.subscriptions.create(
      {
        channel: "RoomChannel",
        room_id: room_id
      },
      {
        received: roomData => {
          console.log(roomData);
        }
      }
    );
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            App
          </Typography>
          <IconButton color="inherit" aria-label="">
            <PersonAddRoundedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <UsersList rooms={rooms} handleRoomClick={handleRoomClick} />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <MessageWindow messages={currentRoomMessages} />
        <MessageInput />
      </main>
    </div>
  );
}

export default ChatHome;
