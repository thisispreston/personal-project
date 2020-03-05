import React from "react";
import { withRouter } from 'react-router-dom'
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../redux/cusReducer";

function Header (props) {

  return (
    <div className="landing">
      <Link to='/shop'>
        SHOP
      </Link>
      <Link to='/cart'>
        CART
      </Link>
      <Link to='/profile'>
        PROFILE
      </Link>
      <Link to='/'>
        ARTSY FARTSY
      </Link>
      <h2
        onClick={() => {
          props.logout()
          props.history.push(`/`)
        }}
      >
        Logout
      </h2>
    </div>
  )
}

export default connect(null, {logout})(withRouter(Header));