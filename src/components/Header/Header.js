import React from "react";
import { withRouter, Link } from 'react-router-dom'
import { connect } from "react-redux";
import { logout } from "../../redux/cusReducer";
import './Header.css'

function Header (props) {

  return (
    <div className="header">
      <div className='header-buttons'>
        <div
          className='nav-buttons'
        >
          <Link 
            to='/'
            className='nav-button'
          >
            HOME
          </Link>
          <Link 
            to='/shop'
            className='nav-button'
          >
            SHOP
          </Link>
          <Link 
            to='/cart'
            className='nav-button'
          >
            CART
          </Link>
          <Link 
            to='/profile'
            className='nav-button'
          >
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