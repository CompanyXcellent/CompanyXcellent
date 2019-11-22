import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'react-redux';
import store from './redux/store';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme/theme';
import routes from './routes'
import NavBar from './components/Nav/NavBar'
import {withRouter} from 'react-router'


function App(props) {

  //this function makes it so that the navBar is not availible until the user is logged in
  const navBarDisplay = () => {
    if(props.location.pathname !== '/'){
      return(
        <NavBar/>
      )
    }
  }


  return (
    <Provider store={store} >
      <ThemeProvider theme={theme} >
        <div className="App">
          {navBarDisplay()}
          <CssBaseline />
          {routes}
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default withRouter(App);