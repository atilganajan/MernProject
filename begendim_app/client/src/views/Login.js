import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [data, setData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  
  const loginUser = async (e) => {
    e.preventDefault();


      await axios.post("http://localhost:3001/users/login", data).then((e)=>{
        console.log(e.data)

        if(e.data){
          console.log("Login succesful") 
          localStorage.setItem("jwt_token",e.data.token)
          navigate("/", { replace: true });
          window.location.reload();
        }else{
          console.log("please check your username and password")
        }
     
      }).catch((err)=>{

        const message = document.querySelector("#formValidMessage");
        message.style.display = "block";
        message.innerHTML = err.response.data.message;
        setTimeout(() => (message.style.display = "none"), 5000);
      });

    
  };

  return (
    <div>

      <div className="row">
        <div className="col-2"></div>
        <div className="col-10">
          <form onSubmit={loginUser} style={{width:"500px"}}>
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
                type="password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                class="form-control"
                placeholder="Parola"
              />
            </div>
            <div
              class="alert alert-danger"
              style={{ display: "none" }}
              id="formValidMessage"
              role="alert"
            ></div>
            <button type="submit" class="btn btn-primary" >giriş yap</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
