import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { withRouter, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import './Cart.css'

class Cart extends Component {
  constructor (props) {
    super(props)

    this.state = {
      cart: [],
      total: null,
    }
  }

  componentDidMount () {
    this.getCart()
  }

  getCart = async () => {
    await axios
      .get(`/api/cart/${this.props.cus_id}`)
      .then(res => {
        this.setState({
          cart: res.data
        })
      })
      .catch(err => {
        console.log(err)
      })

    let total = 0
    await this.state.cart.filter(e => {
      return total += e.price
    })
    this.setState({
      total
    })
  }

  // placeOrder = () => {
  //   axios
  // }

  removeItem = (id) => {
    axios
      .delete(`/api/cart/item/${id}`)
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          toast.success('Item removed from cart.', {
            position: toast.POSITION.BOTTOM_RIGHT
          })
          this.getCart()
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  // clearCart = () => {
  //   axios
  // }

  render() {
    let cartItems = this.state.cart.map((e, i) => {
      return (
        <div
          className='cart-item-card'
          key={i}
          {...e}
        >
          <Link 
            to={`/product/${e.prod_id}`} 
          >
            <img 
              alt='product'
              className='item-img'
              src={e.img}
            />
          </Link>
          <div
            className='item-info'
          >
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
            <p>
              QUANTITY:
              {/* {quantity} */}
            </p>
            <button
              className='remove-item'
              onClick={() => this.removeItem(e.cart_id)}
            >
              REMOVE ITEM
            </button>
          </div>
        </div>
      )
    })
    // console.log(this.state.cart)
    return (
      <div className='cart-page'>
        <div
          className='cart-items'
        >
          {cartItems}
        </div>
        <div
          className='order-card'
        >
          <p
            className='total'
          >
            TOTAL: {this.state.total}
          </p>
          <button
            className='order-button'
          >
            PLACE ORDER
          </button>
        </div>
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