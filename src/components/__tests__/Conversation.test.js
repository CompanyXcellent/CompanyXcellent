import React from 'react'
import messages from '../Messages/Conversation'
import message from '../Messages/Conversation'
import { getConversations } from '../../../server/controllers/socketCtrl'



//! ryan's test

it('gets all the messages', () => {
    return getConversations().then(data => {
        expressJwtSecret(data).toHaveReturned([])
    })

})
// it('creates a post', () => {
//     const post = str => { expect(str).to }
// })
