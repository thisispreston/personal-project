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
        <p>
          ARTSY FARTSY: We love to get artists' work sold to those looking for simple pdf files.
        </p>
      </div>
      {registered ? (
        <div className='login-card'>
          <form
            onSubmit={e => {
              e.preventDefault()
              login()
            }}
          >
            <input 
              type="text"
              value={username}
              placeholder="enter a username"
              onChange={e => setUsername(e.target.value)}
            ></input>
            <input 
              type="password"
              value={password}
              placeholder="enter your password"
              onChange={e => setPassword(e.target.value)}
            ></input>
            <button>
              LOGIN
            </button>
            <p>
              Don't have an account?
              <span 
                style={{color: "blue"}}
                onClick={e => setRegistered(false)}
              >
                Click here to register.
              </span>
            </p>
          </form>
        </div>
      ) : (
        <div
          className='register-card'
        >
          <form
            onSubmit={e => {
              e.preventDefault()
              props.register(username, email, password)
            }}
          >
            <input 
              type="text"
              value={username}
              placeholder="enter a username"
              onChange={e => setUsername(e.target.value)}
            ></input>
            <input 
              type="email" 
              value={email} 
              placeholder="enter your email" 
              onChange={e => setEmail(e.target.value)}
            ></input>
            <input 
              type="password" 
              value={password} 
              placeholder="enter your password" 
              onChange={e => setPassword(e.target.value)}
            ></input>
            <button>
              REGISTER
            </button>
            <p>
              Already have an account? 
              <span 
                style={{color: "blue"}} 
                onClick={e => setRegistered(true)}
              >
                Click here to sign in.
              </span>
            </p>
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