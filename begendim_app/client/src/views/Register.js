import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    gender: "",
    resPassword: "",
    image: "",
  });

  let navigate = useNavigate();

  const createUser = async (e) => {
    e.preventDefault();

    if (!(data.password === data.resPassword)) {
      const message = document.querySelector("#formValidMessage");
      message.style.display = "block";
      message.innerHTML = "şifreler Uyuşmuyor";
      setTimeout(() => (message.style.display = "none"), 5000);
    } else {
      await axios
        .post("http://localhost:3001/users/register", data)
        .then((e) => {
          navigate("/login", { replace: true });
          console.log(e);
        })
        .catch((err) => {
          const message = document.querySelector("#formValidMessage");
          message.style.display = "block";
          message.innerHTML = err.response.data.message;
          setTimeout(() => (message.style.display = "none"), 5000);
        });
    }
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
    };
  };

  //--------------------------------------

  return (
    <div>

      <div className="row">
        <div className="col-2"></div>
        <div className="col-10"  >
          <div className="w-50 mt-5 ms-5 ">
          <form onSubmit={createUser}   className="  w-100  ms-5 " >
            <div class="mb-2 ">
              <input
                type="text"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                class="form-control"
                placeholder="Ad Soyad"
              />
            </div>

            <select
              class="form-select mb-2"
              aria-label="Default select example"
              value={data.gender}
              onChange={(e) => setData({ ...data, gender: e.target.value })}
            >
              <option selected>Cinsiyet</option>
              <option value="man">Erkek</option>
              <option value="woman">Kadın</option>
            </select>
            <div class="mb-2">
              <input
                type="text"
                value={data.username}
                onChange={(e) => setData({ ...data, username: e.target.value })}
                class="form-control"
                placeholder="Kullanıcı Adı"
              />
            </div>
            <div class="mb-2">
              <input
                type="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                class="form-control"
                placeholder="E-posta Adresi"
              />
            </div>

            <div class="mb-2">
              <input
                type="password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                class="form-control"
                placeholder="Parola"
              />
            </div>

            <div class="mb-2">
              <input
                type="password"
                value={data.resPassword}
                onChange={(e) =>
                  setData({ ...data, resPassword: e.target.value })
                }
                class="form-control"
                placeholder="Parola (tekrar)"
              />
            </div>
            <div class="mb-2">
              <input
                type="file"
                name="image"
                class="form-control-file"
                onChange={(e) => handleImage(e)}
              />
            </div>
            <div
              class="alert alert-danger"
              style={{ display: "none" }}
              id="formValidMessage"
              role="alert"
            ></div>
            <button type="submit" class="btn btn-primary w-100">
              Kayıt Ol
            </button>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
