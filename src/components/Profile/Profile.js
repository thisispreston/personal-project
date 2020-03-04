import React, {useState} from "react";
import { connect } from "react-redux";
import { login, deleteAccount, editAccount } from "../../redux/cusReducer";

function Profile (props) {
  const [username, setUsername] = useState(props.customer.username);
  const [email, setEmail] = useState(props.customer.email);

  return (
    <div className="profile">
      Profile
    </div>
  );
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);