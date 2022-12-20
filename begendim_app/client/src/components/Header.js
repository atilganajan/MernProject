import { Link } from "react-router-dom";
import { Image, InputGroup } from "react-bootstrap";
import { List, Search } from "react-bootstrap-icons";

import logo from "./images/logo.png";



function Header({ user }) {
const userName = localStorage.getItem("userName")

 
  return (
    <div>
      <div className="row flex-wrap-reverse w-100">
        <div className="col-lg-2 mt-1">
          <a href="/">
            <Image className="red img-fluid" src={logo}></Image>
          </a>
        </div>

        <div className=" col-lg-6  mt-2 ">
          <InputGroup>
            <input
              type="text"
              className="form-control "
              placeholder="Arama: Ürünler, Markalar, Üyeler"
              aria-label="btn-addon"
              aria-describedby="btn-addon"
            />

            <button className=" btn " id="btn-addon">
              {/* react icon */}
              <Search />
            </button>
          </InputGroup>
        </div>

        <div className=" col-lg-4  mt-2">
          <div className="   d-flex justify-content-end justify-content-lg-center">
            <div className="  me-5  ">
              <div className="dropdown">
                <button
                  className="btn  "
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {/* react icon */}
                  <List />
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item " href="#">
                      Markalar
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item " href="#">
                      Üyeler
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="  mx-2 ">
              {user ? (
                <Link className=" btn btn-success" to="/">
                  Ana Sayfa
                </Link>
              ) : (
                <Link className="btn btn-outline-info" to="/login">
                  Giriş Yap
                </Link>
              )}
            </div>
            <div className="  mx-2 ">
              {user ? (
             (userName=="admin")? <Link className=" btn btn-success" to="/adminDashboard">
                  Admin Panel
                </Link>: <Link className=" btn btn-success" to="/dashboard">
                 Profilim
                </Link>
              ) : (
                <Link className="btn btn-outline-info" to="/register">
                  Kayıt Ol
                </Link>
              )}
            </div>
            {user && (
              <div className="  mx-2 ">
                <div className="dropdown">
                  <button
                    className="btn  "
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src={user.image}
                      className="rounded-circle"
                      style={{ width: "30px" }}
                      alt="Profile"
                    />
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item " href="#">
                        Ayarlar
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item "
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          localStorage.removeItem("jwt_token");
                          window.location.reload();

                        }}
                      >
                        Çıkış Yap
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
