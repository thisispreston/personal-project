import React, { Component } from 'react'
import axios from 'axios'
// import {Link, Route} from 'react-router-dom'
 
class Shop extends Component {
  constructor(props) {
    super(props)

    this.state = {}
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
    //map over products and render elements for each

    return (
      <div className="shop">
        Shop
      </div>
    )
  }
}

export default Shop

