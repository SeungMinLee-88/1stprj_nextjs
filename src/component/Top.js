import Axios from "axios";
import { Header } from "semantic-ui-react";
import Gnb from "./Gnb";

export default function Top() {
  
  async function logout(){
    console.log("call logout");
    await Axios.post(`http://localhost:8090/logout` , {
      body: {
        username: "aaa",
        password: "aaa"
      }
    }
    )
    .then(function (response) {
      console.log("response.data : " + JSON.stringify(response.data));

    router.push(`/`);
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
        <button class="ui primary button" color="blue" onClick={() => logout()}>
          LogOut
        </button>
      </div>
      <Gnb />
    </div>
  );
}