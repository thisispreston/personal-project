import React, { Component } from 'react'
import { connect } from 'react-redux'
import {ToastContainer, toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

export class Errors extends Component {
  render() {
    console.log(this.props.error, this.props.errorMessage)
    if (this.props.error) {
      toast.error(
        `${this.props.errorMessage}`,
        {position: toast.POSITION.BOTTOM_RIGHT}
      )
    }
    return (
      <div>
        <ToastContainer autoClose={4000} />
      </div>
    )
  }
}

const mapStateToProps = (reduxState) => {
  return {
    error: reduxState.error,
    errorMessage: reduxState.errorMessage
  }
}

export default connect(mapStateToProps)(Errors)
