import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Landing from '../components/Landing/Landing';
import Conversation from '../components/Messages/Conversation'
import Messages from '../components/Messages/Messages'

export default (
  <Switch>
    <Route exact path='/' component={Landing} />
    <Route path='/messages' component={Messages} />
    <Route path='/convo' component={Conversation} />
  </Switch>
)