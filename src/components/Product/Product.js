import React from "react";
import { connect } from "react-redux";

function Product (props) {
  const { prod_id, img, price, name, description, addToCart } = props

  return (
    <div>
      Product
    </div>
  );
}

// MAY OR MAY NOT NEED cUSReducer KEP AN EYE ON THIS
const mapStateToProps = reduxState => {
  return {
    cus_id: reduxState.cusReducer.customer.cus_id
  };
};

export default connect(mapStateToProps)(Product);