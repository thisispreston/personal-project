import React, { Component } from 'react'
import axios from 'axios'
import './Shop.css'
// import {Link, Route} from 'react-router-dom'
// import product01 from '../../productImages/product-animals-01.jpg'
import ProductRender from '../ProductRender'
 
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
    // let products = this.state.products.map()

    return (
      <div className="shop">
        {/* <div className='product product-01'>
          <img src={product01} />
          Product 1
        </div> */}
        <ProductRender />
      </div>
    )
  }
}

export default Shop

