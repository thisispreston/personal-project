import React, { Component } from 'react'
import axios from 'axios'
import "./Shop.css"
import { withRouter } from 'react-router-dom'
import ProductCard from '../ProductCard/ProductCard'

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
    axios
      .get('/api/products')
      .then(res => {
        this.setState({
          products: res.data
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render () {
    let productCards = this.state.products.map((e, i) => {
      return (
        <ProductCard
          {...e}
          key={i}
        />
      )
    })

    return (
      <div className="shop">
        {productCards}
      </div>
    )
  }
}

export default withRouter(Shop)

