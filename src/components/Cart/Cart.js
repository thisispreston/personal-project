import React, { Component } from 'react'
import { connect } from 'react-redux'
// import axios from 'axios'

class Cart extends Component {
  constructor (props) {
    super(props)

    this.state = {
      cart: [],
    }
  }

  // componentDidMount () {
  //   this.getCart()
  // }

  // getCart = (props.cusReducer.customer.cus_id) => {
  //   axios
  // }

  // placeOrder = () => {
  //   axios
  // }

  // deleteItem = () => {
  //   axios
  // }

  // clearCart = () => {
  //   axios
  // }

  render() {
    //map over cart and make a card for each product in cart
    return (
      <div>
        Cart
      </div>
    )
  }
}

const mapStateToProps = (reduxState) => ({
  cusReducer: reduxState.cusReducer
})


export default connect(mapStateToProps)(Cart)