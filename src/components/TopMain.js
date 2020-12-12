import React from 'react'
import Form from './Form.js'

function TopMain(props) {
    return (
      <div>
        <h1>Submit a New Post</h1>
        <Form handleSubmit={props.handleSubmit}/>
      </div>
    )
}

export default TopMain
