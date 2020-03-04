import React from "react";
import { connect } from "react-redux";

function Product (props) {
  // const { prod_id, img, price, name, description, addToCart } = props

  return (
    //onClick= addToCart(cus_id)
    <div className="product">
      Product
    </div>
  );
}

// MAY OR MAY NOT NEED CUSReducer KEP AN EYE ON THIS
const mapStateToProps = reduxState => {
  return {
    cus_id: reduxState.cusReducer.customer.cus_id
  };
};

export default connect(mapStateToProps)(Product);