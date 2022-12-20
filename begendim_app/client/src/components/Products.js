import { useState, useEffect } from "react";
import axios from "axios";
import LeftNav from "./LeftNav";

function Products() {
  const [products, setProducts] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:3001/products")
      .then((res) => setProducts(res.data.products));
  }, []);

  const add3Dots=(string, limit)=> {
    let dots = "...";
    if (string.length > limit) {
      string = string.substring(0, limit) + dots;
    }

    return string;
  }

  return (
    <div>
      <div className="row">
        <div className="col-2 ">
          <LeftNav />
        </div>

        <div className="col-10">
          {products &&
            products.map((product) => {

              return (
                <div className=" d-inline-flex">
                  <div className="card mx-2 my-2" style={{ width: "18rem" }}>
                    <a href={"/products/" + product._id} > <img src={product.image} className="card-img-top" /></a>
                    <div className="card-body">
                      <h3 className="card-title text-center">{product.companyName}</h3>
                      <h5 className="card-title text-center ">{product.name}</h5>
                      <p className="card-text">{add3Dots(product.description, 95)}</p>
                    </div>
                  </div>
                </div>
              );

            })}
        </div>
      </div>
    </div>
  );
}

export default Products;
