import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import LeftNav from "./components/LeftNav";
import PageRouter from "./components/PageRouter";
import Home from "./views/Home";

function App() {
  const [user, setUser] = useState();

  const token = localStorage.getItem("jwt_token");

  useEffect(() => {
    axios
      .get("http://localhost:3001/users/me", {
        headers: {
          auth: token,
        },
      })
      .then((res) => {
        setUser(res.data);
        localStorage.setItem("userName",(res.data.username))
       
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);
   
  return (
    
   <div> 
 
    <Header  user={user} />
    
      <PageRouter user={user} />
    </div>
  );
}

export default App;
