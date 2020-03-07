import React from "react";
import { withRouter, Link } from 'react-router-dom'
import { connect } from "react-redux";
import { logout } from "../../redux/cusReducer";
import './Header.css'

function Header (props) {

  return (
    <div className="header">
      <div className='header-buttons'>
        <div className='nav-buttons'>
          <Link to='/'>
            HOME
          </Link>
          <Link to='/shop'>
            SHOP
          </Link>
          <Link to='/cart'>
            CART
          </Link>
          <Link to='/profile'>
            PROFILE
          </Link>
        </div>
        <h1 className='website-name'>
          ARTSY FARTSY
        </h1>
        <h2
          className='logout'
          onClick={() => {
            props.logout()
            props.history.push(`/`)
          }}
        >
          LOGOUT
        </h2>
      </div>
    </div>
  )
}

export default connect(null, {logout})(withRouter(Header));