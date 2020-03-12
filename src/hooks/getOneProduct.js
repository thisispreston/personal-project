import React, {useEffect} from "react"
import axios from "axios"

export default function getOneProduct (id) {
  let product = axios
    .get(`/api/product/${id}`)
    .then(res => {
      const { img, price, name, category, artist_name } = res.data[0]
      let product = {
        img,
        price,
        name,
        category,
        artistName: artist_name,
      }
      return product
    })
    .catch(err => {
      console.log(err)
    })
  return product
}
