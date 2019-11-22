import React from "react";


class Landing extends React.Component{
  
  
  componentDidMount(){
    
  }

  userLogin = () => {
    window.location.href = "http://localhost:3030/api/auth"

  }

  render(){
    console.log('hit')

    return(
      <div>
        <div>
          <button onClick={this.userLogin}>Login</button>
        </div>
      </div>
    )
  }
}
export default Landing;