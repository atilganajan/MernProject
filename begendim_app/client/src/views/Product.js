import axios from "axios";
import { useEffect, useState } from "react";
import Comment from "../components/Comment";
import LeftNav from "../components/LeftNav";

function Product(data) {
  const [product, setProduct] = useState();


  useEffect(() => {
    getProducts();

    
  }, []);

  const getProducts = async () => {
    const result = await axios.get(window.location.href)
    setProduct(result.data.product)
  }

// const productId= product&&product._id

  return (

    <div>
      <div className="row w-100">
        <div className="col-2">
          <LeftNav />
        </div>
        <div className=" col-5">
          <div className="card " style={{ width: "34rem" }}>
            <img
              className="card-img-top"
              src={product && product.image}
              alt="Card image cap"
            />
            <div className="card-body justify-content-center ">
              <h3 className="card-title text-center">

                {product && product.companyName}
              </h3>
              <h5 className="card-title  text-center">
                {product && product.name}
              </h5>
              <p className="card-text ms-4">

                {product && product.description}
              </p>
            </div>
          </div>
        </div>
 
  {<Comment data={data} />} 

      </div>
    </div>
  );
}

export default Product;
