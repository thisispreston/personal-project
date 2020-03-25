import React, {useState} from "react"
import { connect } from "react-redux"
import { withRouter, Redirect } from 'react-router-dom'
import { login, register } from "../../redux/cusReducer"
import './Landing.css'

function Landing (props) {
  const [registered, setRegistered] = useState(true)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  const login = async () => {
    await props.login(username, password)
    if (props.customer) {
      props.history.push(`/shop`)
    }
  }
  
  if (props.customer.username && props.location.pathname === "/") {
    return <Redirect to="/shop" />
  }

  return (
    <div className="landing">
      <div
        className="company-info"
      >
        <p
          className='greeting'
        >
          ARTSY FARTSY welcomes you! We love to get artists' work sold to those looking to support the arts. We appreciate your interest and hope you enjoy your experience shopping at Artsy Fartsy.
        </p>
      </div>
      {registered ? (
        <div className='login-card'>
          <form
            className='landing-form'
            onSubmit={e => {
              e.preventDefault()
              login()
            }}
          >
            <input 
              className='landing-input'
              type="text"
              value={username}
              placeholder="enter your username"
              onChange={e => setUsername(e.target.value)}
            ></input>
            <input 
              className='landing-input'
              type="password"
              value={password}
              placeholder="enter your password"
              onChange={e => setPassword(e.target.value)}
            ></input>
            <button
              className='landing-button'
            >
              LOGIN
            </button>
            <p>
              Don't have an account?
            </p>
            <span 
              className='toggler'
              style={{color: "rgba(58,87,124,1)"}}
              onClick={e => setRegistered(false)}
            >
              Click here to register.
            </span>
          </form>
        </div>
      ) : (
        <div
          className='register-card'
        >
          <form
            className='landing-form'
            onSubmit={e => {
              e.preventDefault()
              props.register(username, email, password)
            }}
          >
            <input 
              className='landing-input'
              type="text"
              value={username}
              placeholder="enter a username"
              onChange={e => setUsername(e.target.value)}
            ></input>
            <input 
              className='landing-input'
              type="email" 
              value={email} 
              placeholder="enter an email" 
              onChange={e => setEmail(e.target.value)}
            ></input>
            <input 
              className='landing-input'
              type="password" 
              value={password} 
              placeholder="enter a password" 
              onChange={e => setPassword(e.target.value)}
            ></input>
            <button
              className='landing-button'
            >
              REGISTER
            </button>
            <p>
              Already have an account? 
            </p>
            <span 
              className='toggler'
              style={{color: "rgba(58,87,124,1)"}} 
              onClick={e => setRegistered(true)}
            >
              Click here to sign in.
            </span>
          </form>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = reduxState => {
  return {
    customer: reduxState.customer
  };
};

const mapDispatchToProps = {
  login,
  register
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Landing))