import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import PersonAddRoundedIcon from "@material-ui/icons/PersonAddRounded";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import SendRoundedIcon from "@material-ui/icons/SendRounded";

import { addFriend } from "../api/userApi";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2),
    "&:focus": {
      outline: "none"
    }
  }
}));

export default function AddUser({ addRoom, cable }) {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [onError, setOnError] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState(null);
  const [keyword, setKeyword] = React.useState(null);

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    addFriend(keyword).then(data => {
      if (data) {
        console.log(data);
        if (data.err === 0) {
          setOnError(false);
          setErrMsg(null);
          if (data.room) {
            addRoom(data.room, cable);
          }
          setModalOpen(false);
        } else if (data.err === 1) {
          setOnError(true);
          setErrMsg(data.msg);
        }
      }
    });
  };

  const body = (
    <div className={classes.paper}>
      <form onSubmit={handleSubmit} autoComplete="off">
        <FormControl fullWidth error={onError ? true : false}>
          <InputLabel htmlFor="friend-request">Friend Request</InputLabel>
          <Input
            id="friend-request"
            fullWidth
            type="text"
            placeholder="Input Email or Nickname"
            onChange={e => setKeyword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  type="submit"
                  color="primary"
                  edge="end"
                  aria-label="send request"
                >
                  <SendRoundedIcon />
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText>{errMsg}</FormHelperText>
        </FormControl>
      </form>
    </div>
  );

  return (
    <div>
      <IconButton onClick={handleOpen} color="inherit" aria-label="add user">
        <PersonAddRoundedIcon />
      </IconButton>
      <Modal
        open={modalOpen}
        onClose={handleClose}
        className={classes.modal}
        aria-labelledby="add-user-modal"
        aria-describedby="add-user-to-chat-list"
      >
        {body}
      </Modal>
    </div>
  );
}
