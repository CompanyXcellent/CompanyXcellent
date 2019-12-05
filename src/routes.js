import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Landing from './components/Landing/Landing'
import Team from './components/Team/Team'
import Profile from './components/Profile/Profile'
import Messages from './components/Messages/Messages'
import Conversation from './components/Messages/Conversation'
import Employees from './components/Employees/Employees'
import CreatePoll from './components/Poll/CreatePoll'
import Posts from './components/Posts/Posts'
import CreateEmployee from './components/Employees/CreateEmployee'
import AddConversation from './components/Messages/AddConversation'

import ProtectedRoute from './util/ProtectedRoute';

export default (
    <Switch>
        <Route exact path='/' component={Landing}/>
        <ProtectedRoute path='/team' component={Team} adminRoute={false}/>
        <ProtectedRoute path='/profile/:id' component={Profile} adminRoute={false}/>
        <ProtectedRoute exact path='/messages' component={Messages} adminRoute={false}/>
        <ProtectedRoute path='/messages/:id' component={Messages} adminRoute={false}/>
        {/* <ProtectedRoute path='/messages/:id' component={Conversation} adminRoute={false}/> */}
        <ProtectedRoute path='/add-conversation' component={AddConversation} adminRoute={false}/>
        <ProtectedRoute path='/employees' component={Employees} adminRoute={false}/>
        <ProtectedRoute path='/createPoll' component={CreatePoll} adminRoute={true}/>
        <ProtectedRoute path='/posts' component={Posts} adminRoute={false}/>
        <ProtectedRoute path='/create-employee' component={CreateEmployee} adminRoute={true}/>
    </Switch>
)