import React, {useState} from "react";
import { connect } from "react-redux";
import { logout, login, register } from "../redux/userReducer";

function Landing (props) {
  const [registered, setRegistered] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="header">
      <h1>Super Original E-Commerce Site</h1>
      {!props.cusReducer.user.user_email ? (
        registered ? (
          <div>
            <form
              onSubmit={e => {
                e.preventDefault()
                props.login(email, password)
              }}
            >
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
                Login
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
          <div>
            <form
              onSubmit={e => {
                e.preventDefault()
                props.register(email, password)
              }}
            >
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
                Register
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
        )
      ) : (
        <div>
          <h3>
            Logged in as: {props.userReducer.user.user_email}
          </h3>
        </div>
      )}
      <Errors />
    </div>
  );
}

const mapStateToProps = reduxState => {
  return {
    cusReducer: reduxState.cusReducer
  };
};

const mapDispatchToProps = {
  login,
  logout,
  register
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);