import React, {useState, useEffect} from "react"
import { connect } from "react-redux"
import { withRouter, Link } from 'react-router-dom'
import axios from "axios"
import { toast } from 'react-toastify'
import './Product.css'

function Product (props) {
  const [img, setImg] = useState("")
  const [price, setPrice] = useState(null)
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [artistName, setArtistName] = useState("")

  const prod_id = +props.match.params.id

  // const { prod_id, img, price, name, category, addToCart } = props
  useEffect(() => {
    axios
      .get(`/api/product/${prod_id}`)
      .then(res => {
      const { img, price, name, category, artist_name } = res.data[0]
      setImg(img)
      setPrice(price)
      setName(name)
      setCategory(category)
      setArtistName(artist_name)
      })
      .catch(err => {
        console.log(err)
      }) 
  },[prod_id])
  // Fill the array with variables to watch; the empty array means it will fire once

  let addToCart = async () => {
    await axios
      .post(`/api/cart/${props.cus_id}`, {prod_id})
      .then(res => {
        toast.info('Item added to cart.', {
          position: toast.POSITION.BOTTOM_RIGHT
        })
        props.history.push(`/shop`)
      })
      .catch(err => {
        toast.error(`Unable to add to cart. Please try again.`, {
          position: toast.POSITION.BOTTOM_RIGHT
        })
      }) 
  }

  return (
    //onClick= addToCart(cus_id)
    <div className="product">
      <img 
        className='product-image'
        alt='product'
        src={img}
      />
      <div className='info-card'>
        <h1
          className='product-name'
        >
          {name}
        </h1>
        <Link to={`/category/${category}`} >
          {category}
        </Link>
        <h3
          className='product-artist'
        >
          {artistName}
        </h3>
        <p
          className='product-price'
        >
          ${price}
        </p>
        <button
          onClick={() => addToCart()}
        >
          ADD TO CART
        </button>
      </div>
      {/* <div className='reviews'></div> */}
    </div>
  );
}

// MAY OR MAY NOT NEED CUSReducer KEEP AN EYE ON THIS
const mapStateToProps = reduxState => {
  return {
    cus_id: reduxState.customer.cus_id
  }
}

export default connect(mapStateToProps)(withRouter(Product));