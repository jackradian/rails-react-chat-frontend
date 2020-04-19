import React, { useState, useEffect, useMemo, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import blueGrey from "@material-ui/core/colors/blueGrey";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
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
  hide: {
    display: "none"
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    },
    whiteSpace: "nowrap"
  },
  drawerPaper: {
    width: drawerWidth
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
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

  const drawerInner = (
    <>
      <div className={classes.toolbar}>
        <AddUser addRoom={addRoom} cable={Cable} />
        <IconButton color="inherit" onClick={handleLogoutClick}>
          <ExitToAppRoundedIcon />
        </IconButton>
      </div>
      <Divider />
      <UsersList rooms={rooms} handleRoomClick={handleRoomClick} />
    </>
  );

  const drawer = (
    <nav className={classes.drawer}>
      <Hidden smUp implementation="css">
        <Drawer
          anchor="left"
          variant="temporary"
          open={drawerOpen}
          onClose={handleDrawerClose}
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {drawerInner}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper
          }}
          variant="permanent"
          open
        >
          {drawerInner}
        </Drawer>
      </Hidden>
    </nav>
  );

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.grow} />
          <Typography variant="h5" noWrap>
            Chat
          </Typography>
        </Toolbar>
      </AppBar>
      {drawer}
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
