import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { withRouter, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import StripeCheckout from 'react-stripe-checkout'
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

// MANIPULATING CART ITEMS:
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

  removeItem = (id) => {
    axios
      .delete(`/api/cart/item/${id}`)
      .then(res => {
        if (res.status === 200) {
          toast.info('Item removed from cart.', {
            position: toast.POSITION.BOTTOM_RIGHT
          })
          this.getCart()
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  clearCart = (id) => {
    axios
      .delete(`/api/cart/${id}`)
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          toast.info('Your cart is cleared.', {
            position: toast.POSITION.BOTTOM_RIGHT
          })
          this.props.history.push(`/shop`)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  // PLACING AN ORDER:
  onOpened=()=>{
    console.log('this is opened')
  }

  onClosed=()=>{
    console.log('this is closed')
  }

  placeOrder = (token) => {
    let { total } = this.state
    total *= 100
    console.log(token, total)
    token.card = void 0
    axios
      .post('/api/payment', { token, total })
      .then(res => {
        console.log(res)
        toast.info(`You paid Artsy Fartsy ${total} for your art!`, {
          position: toast.POSITION.BOTTOM_RIGHT
        })
      })
      .catch(err => {
        console.log(err)
        toast.error(`Something went wrong with your order. Please try again.`, {
          position: toast.POSITION.BOTTOM_RIGHT
        })
      })
  }

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

    return (
      <div className='cart-page'>
        <button
          className='clear-cart'
          onClick={() => this.clearCart(this.props.cus_id)}
        >
          CLEAR CART
        </button>
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
            TOTAL: ${this.state.total}
          </p>
          <div 
            style={{display:'flex',flexDirection:'column', alignItems:'center', marginTop:'50px'}}
          >
            <StripeCheckout
              name='Place Order' //header
              image='/assets/LOGO.jpg'
              description='Enter your payment information here.' //subtitle - beneath header
              stripeKey={process.env.REACT_APP_STRIPE_KEY} //public key not secret key
              token={this.placeOrder} //fires the call back
              amount={this.state.total} //this will be in dollars
              currency="USD" 
              // image={imageUrl} // the pop-in header image (default none)
              // ComponentClass="div" //initial default button styling on block scope (defaults to span)
              panelLabel="Submit Payment" //text on the submit button
              locale="en" //locale or language (e.g. en=english, fr=french, zh=chinese)
              opened={this.onOpened} //fires cb when stripe is opened
              closed={this.onClosed} //fires cb when stripe is closed
              allowRememberMe // "Remember Me" option (default true)
              billingAddress={false}
              shippingAddress={true} //you can collect their address
              zipCode={false}
            >
              {/* <button>Checkout</button> */}
            </StripeCheckout>
          </div>
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