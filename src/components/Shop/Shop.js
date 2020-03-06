import React, { Component } from 'react'
import axios from 'axios'
import "./Shop.css"
// import {Link, Route} from 'react-router-dom'
 
class Shop extends Component {
  constructor(props) {
    super(props)

    this.state = {
      products: [],
    }
  }

  componentDidMount() {
      this.getProducts()
  }

  getProducts = () => {
    axios.get('/api/products').then(res => {
      this.setState({
        products: res.data
      })
    }).catch(err => {
      console.log(err)
    }) 
  }

  // viewProduct = () => {
  //   reroute to product page
  // }

  // addToCart = async () => {
  //   await axios
  //   move back to shop
  // }

  render () {
    let productCards = this.state.products.map((e, i) => {
      return (
        <div
          key={i}
          className='product-card'
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
      )
    })

    return (
      <div className="shop">
        {productCards}
      </div>
    )
  }
}

export default Shop

