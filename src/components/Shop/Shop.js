import React, { Component } from 'react'
import axios from 'axios'
import "./Shop.css"
import { withRouter, Link } from 'react-router-dom'
 
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
      .get('/api/products').then(res => {
        this.setState({
          products: res.data
        })
      })
      .catch(err => {
      console.log(err)
      }) 
  }

  addToCart = async (id) => {
    await axios
      .post(`/api/cart/${id}`)
      .then(res => {
      console.log(res)
      })
      .catch(err => {
      console.log(err)
      }) 
  }

  render () {
    let productCards = this.state.products.map((e, i) => {
      return (
        <Link 
          to={`/product/${e.prod_id}`} 
          key={i}
        >
          <div
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
        </Link>
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

