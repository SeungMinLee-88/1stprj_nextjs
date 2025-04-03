import Axios from "axios";
import { useRouter } from "next/router";
import { Header } from "semantic-ui-react";
import Gnb from "./Gnb";

export default function Top() {
  const router = useRouter();
  
  async function logout(){
    console.log("call logout");
    await Axios.post(`http://localhost:8090/logout` ,
    {},
    {withCredentials: true}
    )
    .then(function (response) {
      console.log("response.data : " + JSON.stringify(response.status));
      if(response.status === 200){
        console.log("response.status200");
        localStorage.removeItem("access");
      }
      
      

    //router.push(`/`);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  
  return (
    <div>
      <div style={{ display: "flex", paddingTop: 20 }}>
        <div style={{ flex: "100px 0 0" }}>
          <img
            src="/images/spring.png"
            alt="logo"
            style={{ display: "block", width: 80 }}
          />
        </div>
        <Header as="h1">Spring</Header>
      </div>
      <div style={{display: 'flex',  justifyContent:'right'}}>
        <button className="ui primary button" color="blue" onClick={() => logout()}>
          LogOut
        </button>
      </div>
      <Gnb />
    </div>
  );
}