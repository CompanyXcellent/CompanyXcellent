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

export default (
    <Switch>
        <Route exact path='/' component={Landing}/>
        <Route path='/team' component={Team}/>
        <Route path='/profile' component={Profile}/>
        <Route path='/messages' component={Messages}/>
        <Route path='/conversation' component={Conversation}/>
        <Route path='/employees' component={Employees}/>
        <Route path='/createPoll' component={CreatePoll}/>
        <Route path='/posts' component={Posts}/>
    </Switch>
)