import React from 'react';
import routes from './routes'
import { withRouter, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import {checkCus} from './redux/cusReducer'
import Header from './components/Header/Header'
import './App.css';
import Errors from "./components/Errors"

class App extends React.Component {

  componentDidMount() {
    this.props.checkCus()
  }

  render() {
    if (!this.props.customer.username && this.props.location.pathname !== "/") {
      return <Redirect to="/" />
    }

    return (
      <div className={`App`}>
        <Header />
        {routes}
        <Errors />
      </div>
    )
  }
}

const mapStateToProps = reduxState => {
  return {
    customer: reduxState.customer
  }
}

export default connect(mapStateToProps, {checkCus})(withRouter(App));
