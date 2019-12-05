import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

// I can destructure adminRoute and user like Component.
const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={(props) => {
      if(rest.adminRoute && rest.user.role_id !== 1){
        props.history.goBack()
        return;
      }

      if (rest.user.user_id) {
        return (
          <Component {...props} />
        )
      } else {
        return (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    }} />
  )
};

const mapStateToProps = reduxState => {
  const { user } = reduxState.userReducer;

  return {
    user
  }
}

export default connect(mapStateToProps, null)(ProtectedRoute);


// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={(props) => (
//     fakeAuth.isAuthenticated === true
//       ? <Component {...props} />
//       : <Redirect to='/login' />
//   )} />
// )