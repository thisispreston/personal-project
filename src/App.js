import React from 'react';
import Header from './components/Header/Header'
import routes from './routes'
import {connect} from 'react-redux'
import {checkCus} from './redux/cusReducer'
import {Redirect} from 'react-router-dom'
import './App.css';

class App extends React.Component {

  componentDidMount() {
    this.props.checkCus()
  }

  render() {
    if(this.props.cusReducer.customer.email) return <Redirect to="/shop" />
    let loading = this.props.cusReducer.loading ? "busy-cursor" : null;
    return (
      <div className={`App ${loading}`}>
        <Header />
        {routes}
      </div>
    )
  }
}

const mapStateToProps = reduxState => {
  return {
    cusReducer: reduxState.cusReducer
  }
}

export default connect(mapStateToProps, {checkCus})(App);
