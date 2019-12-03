import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Container from '@material-ui/core/Container';
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Typography from '@material-ui/core/Typography';

import MenuIcon from '@material-ui/icons/Menu';

import { getUser, logout, getUserInfo, getUserSubscriptions } from "../../redux/reducers/userReducer";
import theme from "../../theme/theme";

function TemporaryDrawer(props) {
  const classes = useStyles();
  const [showMenu, setShowMenu] = useState(false);
  //?to make useEffect not re-render try setting loggedIn to true and on the logout set to false

  let prevScrollpos = window.pageYOffset;
  window.onscroll = function () {
    if (window.screen.availWidth > 1280) {
      let currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar").style.top = "0";
      } else {
        document.getElementById("navbar").style.top = "-10vh";
      }
      prevScrollpos = currentScrollPos;
    } else {
      let currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar").style.top = "0";
      } else {
        document.getElementById("navbar").style.top = "-8vh";
      }
      prevScrollpos = currentScrollPos;
    }
  }

  useEffect(() => {
    props.getUser();
    return () => {
      props.logout();
    };
  }, []);

  useEffect(() => {
    if (props.userReducer.user.user_id) {
      props.getUserInfo(props.userReducer.user.user_id);
      props.getUserSubscriptions(props.userReducer.user.user_id);
    }
  }, [props.userReducer.user.user_id])

  const logout = () => {
    window.location.href = "http://localhost:3030/api/logout";
  };

  //controls the out and in movement of the navBar using the state hook
  const toggleDrawer = event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setShowMenu(prevState => !prevState);
  };

  console.log(props.userReducer.user.role_id);
  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <List>
        <Container className={classes.userInfo} >
          <Avatar className={classes.avatar} src={props.userReducer.userInfo.profile_img} />
          <Typography variant='h6'>{props.userReducer.userInfo.first_name} {props.userReducer.userInfo.last_name}</Typography>
        </Container>
        {[['Posts', '/posts', 2], ['Employees', '/employees', 2], ['Messages', '/messages', 2], ['Create Poll', '/createPoll', 1], ['Team', '/team', 2]].map((text, index) => (props.userReducer.user.role_id !== 1 && text[2] === 1) ?
          (
            null
          )
          :
          (
            <Link to={text[1]} key={text[0]} className={classes.link}>
              <ListItem button key={text[0]}>
                <ListItemText primary={text[0]} />
              </ListItem>
            </Link>
          )
        )}
      </List>
      <Divider />
      <List>
        {[['Profile', `/profile/${props.userReducer.user.user_id}`]].map((text, index) => (
          <Link to={text[1]} key={text[0]} className={classes.link}>
            <ListItem button key={text[0]}>
              <ListItemText primary={text[0]} />
            </ListItem>
          </Link>
        ))}
        <ListItem button onClick={logout} >
          <ListItemText primary='Logout' />
        </ListItem>
      </List>
    </div>
  );

  return (
    <Container
      component='nav'
      id='navbar'
      className={classes.mainContainer}
      maxWidth={false} >
      <Typography variant='h4'>CompanyXcellent</Typography>

      {/* Mobile Nav */}

      <MenuIcon className={classes.menuIcon} onClick={() => toggleDrawer()} />
      <SwipeableDrawer
        open={showMenu}
        onClose={toggleDrawer}
        onOpen={toggleDrawer}
      >
        {sideList('left')}
      </SwipeableDrawer>

      {/* Desktop Nav */}

      <List className={classes.desktopNavContainer}>
        {/* <List> */}

        {[['Posts', '/posts', 2], ['Messages', '/messages', 2], ['Team', '/team', 2], ['Employees', '/employees', 2], ['Create Poll', '/createPoll', 1]].map((text, index) => (props.userReducer.user.role_id !== 1 && text[2] === 1) ?
          (
            null
          )
          :
          (
            <Link to={text[1]} key={text[0]} className={classes.link}>
              <ListItem button key={text[0]}>
                <ListItemText primary={text[0]} />
              </ListItem>
            </Link>
          )
        )}

        {/* <Divider orientation='vertical' fullWidth /> */}

        {[['Profile', `/profile/${props.userReducer.user.user_id}`]].map((text, index) => (
          <Link to={text[1]} key={text[0]} className={classes.link}>
            <ListItem button key={text[0]}>
              <ListItemText primary={text[0]} />
            </ListItem>
          </Link>
        ))}
        <ListItem
          className={classes.logoutButton}
          button
          variant='contained'
          onClick={logout} >
          <ListItemText primary='Logout' />
        </ListItem>
        {/* </List> */}
      </List>
    </Container>
  );
}

const mapStateToProps = rootReducer => {
  return {
    userReducer: rootReducer.userReducer
  };
};

const mapDispatchToProps = {
  getUser,
  getUserInfo,
  getUserSubscriptions,
  logout
}

export default connect(mapStateToProps, mapDispatchToProps)(TemporaryDrawer);

const useStyles = makeStyles({
  mainContainer: {
    backgroundColor: theme.palette.secondary.main,
    width: '100%',
    height: '8vh',

    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    position: 'sticky',
    top: 0,
    transition: 'top 0.3s',
    zIndex: 3,

    [theme.breakpoints.up('lg')]: {

    }
  },
  menuIcon: {
    [theme.breakpoints.up('lg')]: {
      display: 'none'
    }
  },
  desktopNavContainer: {
    display: 'none',

    [theme.breakpoints.up('lg')]: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center'
    }
  },
  logoutButton: {
    width: 100,

    textAlign: 'center'
  },
  userInfo: {
    width: '100%',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    width: 100,
    height: 100
  },
  list: {
    width: 250
  },
  link: {
    color: 'black'
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