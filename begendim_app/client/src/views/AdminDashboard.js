import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    image: "",
    description: "",
    companyName: "",
  });

  const [updateData, setUpdateData] = useState({
    id: 0,
    name: "",
    image: "",
    description: "",
    companyName: "",
  })

  const [products, setProducts] = useState();

  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    const userName = localStorage.getItem("userName")
    console.log(userName)

    !(userName == "admin") && navigate("/", { replace: true });
    
    if (!token) {
      return navigate("/", { replace: true });
    }
    getProducts()
  }, []);

  const getProducts = () => {
    axios
      .get("http://localhost:3001/products")
      .then((res) => setProducts(res.data.products));
  }

  const productPost = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:3001/products", data)
      .then(() => window.location.reload())
      .catch((err) => console.log(err));

    setData({ image: "", name: "", description: "", companyName: "" });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
    console.log(file);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    console.log(reader);
    reader.onloadend = () => {
      setData({ ...data, image: reader.result });
      setUpdateData({ ...updateData, image: reader.result });

    };
  };

  const add3Dots = (string, limit) => {
    let dots = "...";
    if (string.length > limit) {
      string = string.substring(0, limit) + dots;
    }

    return string;
  }

  // Update Functions
  const toggleUpdateModal = (id) => {
    const product = products.find(product => product._id === id)

    setUpdateData({
      id: product._id,
      name: product.name,
      companyName: product.companyName,
      description: product.description
    })
    console.log(product)
  }

  const updateProduct = async (e) => {
    await axios.put(`http://localhost:3001/products/${updateData.id}`, updateData)
      .then(res => {
        console.log(res)
      }).catch(err => {
        console.error(err)
      })
    getProducts()
  }

  return (
    <div>
      <div>
        {/* modal Button */}
        <div className=" d-flex justify-content-center mt-5 ">
          <button
            type="button"
            className="btn btn-primary w-75"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Yeni Ürün Ekle
          </button>
        </div>
        {/* modal Button  end*/}

        {/* create Modal Form */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Yeni Ürün Ekle
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={productPost} className="w-100">
                  <div className="mb-2">
                    <input
                      type="text"
                      value={data.companyName}
                      onChange={(e) =>
                        setData({ ...data, companyName: e.target.value })
                      }
                      className="form-control"
                      placeholder="Şirket İsmi"
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      value={data.name}
                      onChange={(e) =>
                        setData({ ...data, name: e.target.value })
                      }
                      className="form-control"
                      placeholder="Ürün İsmi"
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      value={data.description}
                      onChange={(e) =>
                        setData({ ...data, description: e.target.value })
                      }
                      className="form-control"
                      placeholder="Ürün Açıklaması"
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="file"
                      name="image"
                      className="form-control-file"
                      onChange={(e) => handleImage(e)}
                    />
                  </div>
                  <div
                    className="alert alert-danger"
                    style={{ display: "none" }}
                    id="formValidMessage"
                    role="alert"
                  ></div>
                  <button type="submit" className="btn btn-primary w-100">
                    Ürün Yükle
                  </button>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary w-100"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* create Modal Form end */}

        <div className="ms-5 mt-5">
          {products &&
            products.map((product) => {

              return (
                <div key={product._id} className=" d-inline-flex">
                  <div className="card mx-2 my-2" style={{ width: "18rem" }}>
                    <a href={"/products/" + product._id}>
                      <img src={product.image} className="card-img-top" />
                    </a>
                    <div className="card-body">
                      <h4 className="card-title text-center">
                        {product.companyName}
                      </h4>
                      <h5 className="card-title text-center">{product.name}</h5>
                      <p className="card-text ">
                        {add3Dots(product.description, 95)}
                      </p>
                    </div>
                    <div className="d-flex justify-content-around mb-3">
                      {/* <button type="button" className="btn btn-warning " data-bs-toggle="modal" data-bs-target="#exampleModal2">
                        Değişiklik yap
                      </button> */}
                      <button onClick={(id) => toggleUpdateModal(product._id)} data-bs-toggle="modal" data-bs-target="#updateModal" type="button" className="btn btn-warning">
                        Değişiklik Yap
                      </button>

                      <button className="btn btn-danger" onClick={async () => {
                        axios.delete(`http://localhost:3000/products/${product._id}`)
                          .then((res) =>
                            getProducts()
                          );
                      }}> Ürünü Sil
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
        </div>
      </div>






      {/* Update Modal */}
      <div
        className="modal fade"
        id="updateModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel1">
                Değişiklik Yap
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form id="update-form" className="w-100">
                <input type="hidden" value={updateData.id} />
                <div className="mb-2">
                  <input
                    type="text"
                    onChange={(e) => setUpdateData({ ...updateData, companyName: e.target.value })} value={updateData.companyName}
                    className="form-control"
                    placeholder="Şirket İsmi"
                  />
                </div>
                <div className="mb-2">
                  <input
                    type="text"

                    onChange={(e) => setUpdateData({ ...updateData, name: e.target.value })} value={updateData.name}

                    className="form-control"
                    placeholder="Ürün İsmi"
                  />
                </div>

                <div className="mb-2">
                  <input
                    type="text"

                    onChange={(e) => setUpdateData({ ...updateData, description: e.target.value })} value={updateData.description}

                    className="form-control"
                    placeholder="Ürün Açıklaması"
                  />
                </div>
                <div className="mb-2">
                  <input
                    type="file"
                    name="image"
                    className="form-control-file"
                    onChange={(e) => handleImage(e)}
                  />
                </div>
                <div
                  className="alert alert-danger"
                  style={{ display: "none" }}
                  id="formValidMessage"
                  role="alert"
                ></div>

              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary w-100"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" onClick={updateProduct} className="btn btn-primary">Değişiklik Yap</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;
