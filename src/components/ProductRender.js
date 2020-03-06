import React from 'react'
import product01 from '../productImages/product-animals-01.jpg'
import product02 from '../productImages/product-animals-02.jpg'
import product03 from '../productImages/product-animals-03.jpg'
import product04 from '../productImages/product-animals-04.jpg'
import product05 from '../productImages/product-animals-05.jpg'
import product06 from '../productImages/product-animals-06.jpg'

export default function () {
  let products = new Array(6).fill(undefined).map((e, i) => {
    let product = `product0${i+1}`
    return (
      <div 
        className='product' 
        key={i}
      >
        <img src='/assets/' />
        {product}
      </div>
    )
  })
  return (
      <div className='products'>
        {products}
      </div>
  )
}