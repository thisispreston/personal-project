import React from "react"
import { withRouter, Link } from 'react-router-dom'

function ProductCard (props) {
  
  return (
    <div>
      <Link 
        to={`/product/${props.prod_id}`}
        className='product-card'
      >
        <img 
          alt='product'
          className='product-img'
          src={props.img}
        />
        <p
          className='product-name'
        >
          {props.name}
        </p>
        <p
          className='price'
        >
          ${props.price}
        </p>
      </Link>
    </div>
  )
}

export default withRouter(ProductCard)