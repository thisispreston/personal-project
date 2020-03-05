import React from 'react';
import routes from './routes'
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import {checkCus} from './redux/cusReducer'
import {Redirect} from 'react-router-dom'
import Header from './components/Header/Header'
import './App.css';

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
