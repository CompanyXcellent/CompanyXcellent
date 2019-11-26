import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import "./navBar.css";
import { Link } from "react-router-dom";
// import { connect } from 'http2';
import { getUser, logout } from "../../redux/reducers/userReducer";
import { connect } from "react-redux";

//controls the styling of material ui components... its an alternative to using the css
const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60
  },
  smallAvatar: {
    margin: 10,
    height: 40,
    width: 40
  }
});

function TemporaryDrawer(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false
  });
  //?to make useEffect not re-render try setting loggedIn to true and on the logout set to false

  useEffect(() => {
    console.log("hit navBar");
    props.getUser();

    return () => {
      props.logout();
    };
  }, []);

  const checkOut = () => {
    window.location.href = "http://localhost:3030/api/logout";
    console.log("hit logout");
  };

  //controls the out and in movement of the navBar using the state hook
  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [side]: open });
  };

  //code for the slideout navBar, that when it is toggeled to be "open" is displayed
  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <Link to="/posts">
          <ListItem button>
            <ListItemText primary="Posts" />
          </ListItem>
        </Link>
        <Link to="/employees">
          <ListItem button>
            <ListItemText primary="Employees" />
          </ListItem>
        </Link>
        <Link to="/messages">
          <ListItem button>
            <ListItemText primary="Messages" />
          </ListItem>
        </Link>
        <Link to="/createPoll">
          <ListItem button>
            <ListItemText primary="Create Poll" />
          </ListItem>
        </Link>
        <Link to="/profile">
          <ListItem button>
            <ListItemText primary="Profile" />
          </ListItem>
        </Link>
        <Link to="/team">
          <ListItem button>
            <ListItemText primary="Team" />
          </ListItem>
        </Link>
        <Link to="/">
          <ListItem button>
            <ListItemText onClick={checkOut} primary="Logout" />
          </ListItem>
        </Link>
      </List>
      <Divider />
    </div>
  );

  return (
    <div id="nav-bar-header">
      <Avatar alt="Remy Sharp" src="" className={classes.smallAvatar} />
      <h3>Rate my Coworker</h3>
      <Button onClick={toggleDrawer("left", true)}>
        <i className="fas fa-bars fa-2x" id="hamburger-icon" />
      </Button>
      <Drawer open={state.left} onClose={toggleDrawer("left", false)}>
        <Grid container justify="center" alignItems="center">
          <Avatar alt="Remy Sharp" src="" className={classes.bigAvatar} />
        </Grid>
        {sideList("left")}
      </Drawer>
    </div>
  );
}

const mapStateToProps = rootReducer => {
  return {
    userReducer: rootReducer.userReducer
  };
};

export default connect(mapStateToProps, { getUser })(TemporaryDrawer);
