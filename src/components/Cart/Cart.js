import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { withRouter, Link } from 'react-router-dom'
import './Cart.css'

class Cart extends Component {
  constructor (props) {
    super(props)

    this.state = {
      cart: [],
    }
  }

  componentDidMount () {
    this.getCart()
  }

  getCart = () => {
    axios
      .get(`/api/cart/${this.props.cus_id}`)
      .then(res => {
        this.setState({
          cart: res.data
        })
      })
      .catch(err => {
        console.log(err)
      }) 
  }

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
    let cartItems = this.state.cart.map((e, i) => {
      return (
        <Link 
          to={`/product/${e.prod_id}`} 
          key={i}
        >
          <div
            className='cart-item-card'
            {...e}
          >
            <img 
              alt='product'
              className='product-img'
              src={e.img}
            />
            <p
              className='price'
            >
              ${e.price}
            </p>
            <p
              className='product-name'
            >
              {e.name}
            </p>
          </div>
        </Link>
      )
    })
    // console.log(this.state.cart)
    return (
      <div className='cart'>
        {cartItems}
      </div>
    )
  }
}

const mapStateToProps = reduxState => {
  return {
    cus_id: reduxState.customer.cus_id
  }
}


export default connect(mapStateToProps)(withRouter(Cart))