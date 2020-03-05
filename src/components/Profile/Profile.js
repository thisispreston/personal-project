import React, {useState} from "react";
import { connect } from "react-redux";
import { login, deleteAccount, editAccount } from "../../redux/cusReducer";

function Profile (props) {
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [username, setUsername] = useState(props.customer.username);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(props.customer.email);

  const { cus_id } = props.customer
  return (
    <div className="profile">
      <div classname='profile-card'>
        <h1 className='profile-info'>
          Username: {username}
          Email: {email}
        </h1>
        <div className="editingCard">
          {
            (editing === false) ? (
              <div>
                <button
                  onClick={() => setEditing(true)}
                >
                  EDIT ACCOUNT
                </button>
              </div>
            ):(
              <form
                onSubmit={ async (e) => {
                  e.preventDefault()
                  await props.editAccount(cus_id, username, email)
                  setEditing(false)
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
                <button
                  type="submit"
                >
                  SAVE CHANGES
                </button>
                <button
                  onClick={() => setEditing(false)}
                >
                  CANCEL
                </button>
              </form>
            )
          }
        </div>
        <div className="deletingCard">
          {
            (deleting === false) ? (
              <div>
                <button
                  onClick={() => setDeleting(true)}
                >
                  DELETE ACCOUNT
                </button>
              </div>
            ):(
              <form
                onSubmit={ async (e) => {
                  e.preventDefault()
                  await props.deleteAccount(cus_id, username, password)
                }}
              >
                <input 
                  type="text"
                  value={username}
                  placeholder="enter your username"
                  onChange={e => setUsername(e.target.value)}
                ></input>
                <input 
                  type="password" 
                  value={password} 
                  placeholder="enter your password" 
                  onChange={e => setPassword(e.target.value)}
                ></input>
                <button
                  type="submit"
                >
                  DELETE ACCOUNT
                </button>
                <button
                  onClick={() => setDeleting(false)}
                >
                  CANCEL
                </button>
              </form>
            )
          }
        </div>
      </div>
      <div className="orders"></div>
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
  editAccount,
  deleteAccount,
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);