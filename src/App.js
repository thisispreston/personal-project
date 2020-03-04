import React from 'react';
import routes from './routes'
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
    if (!this.props.customer.email) {
      return <Redirect to="/" />
    }
    if (this.props.customer.email) {
      return <Redirect to="/shop" />
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
    customer: reduxState.cusReducer.customer
  }
}

export default connect(mapStateToProps, {checkCus})(App);
