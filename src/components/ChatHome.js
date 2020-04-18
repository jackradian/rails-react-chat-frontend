import React, { useState, useEffect, useMemo, useContext } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import blueGrey from "@material-ui/core/colors/blueGrey";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import actionCable from "actioncable";
import { authContext } from "../contexts/AuthContext";
import { logout } from "../api/authApi";
import { WEBSOCKET_URL } from "../utils/Constants";
import UsersList from "./UsersList";
import MessageWindow from "./MessageWindow";
import MessageInput from "./MessageInput";
import { myDirectRooms } from "../api/userApi";
import useRoomsHandler from "../utils/custom-hooks/RoomsHandler";
import AddUser from "./AddUser";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexGrow: 1,
    height: "100%",
    background: blueGrey["50"]
  },
  grow: {
    flexGrow: 1
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
    overflow: "hidden",
    flexDirection: "column",
    flexGrow: 1,
    padding: theme.spacing(1)
  }
}));

const Cable = actionCable.createConsumer(WEBSOCKET_URL);

function ChatHome() {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const auth = useContext(authContext);
  const { rooms, addRoom, setActiveRoom } = useRoomsHandler([]);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleLogoutClick = () => {
    logout();
    auth.setUnauthStatus();
  };

  useEffect(() => {
    myDirectRooms().then(data => {
      if (data) {
        if (data.err === 0) {
          data.rooms.forEach(room => {
            addRoom(room, Cable);
          });
        } else if (data.err === 1 && data.msg === "Unauthorized") {
          auth.setUnauthStatus();
        }
      }
    });
  }, []);

  const currentRoom = useMemo(() => {
    const currentRoom = rooms.find(room => room.is_current === true);
    if (currentRoom) {
      return currentRoom;
    } else {
      return {};
    }
  }, [rooms]);

  function handleRoomClick(room) {
    setActiveRoom(room.id);
    room.subscription.perform("set_active_room");
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: drawerOpen
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx({
              [classes.hide]: drawerOpen
            })}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="close drawer"
            onClick={handleDrawerClose}
            edge="start"
            className={clsx({ [classes.hide]: !drawerOpen })}
          >
            <ChevronLeftIcon />
          </IconButton>
          <div className={classes.grow} />
          <Typography variant="h6" noWrap>
            Chat
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: drawerOpen,
          [classes.drawerClose]: !drawerOpen
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: drawerOpen,
            [classes.drawerClose]: !drawerOpen
          })
        }}
      >
        <div className={classes.toolbar}>
          <AddUser addRoom={addRoom} cable={Cable} />
          <IconButton color="inherit" onClick={handleLogoutClick}>
            <ExitToAppRoundedIcon />
          </IconButton>
        </div>
        <Divider />
        <UsersList rooms={rooms} handleRoomClick={handleRoomClick} />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <MessageWindow messages={currentRoom.messages} />
        <MessageInput
          isEnabled={currentRoom.is_current}
          subscription={currentRoom.subscription}
        />
      </main>
    </div>
  );
}

export default ChatHome;
