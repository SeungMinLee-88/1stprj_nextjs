import Axios from "axios";
import { useRouter } from "next/router";
import { Header } from "semantic-ui-react";
import { Button, Form } from "semantic-ui-react";
import Gnb from "./Gnb";

export default function Top({setLoginUserId}) {
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
        window.sessionStorage.removeItem("username");
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
      <Form onSubmit={async evt=>{
          evt.preventDefault();
          const username = evt.target.username.value;
          const password = evt.target.password.value;
          //Axios.defaults.withCredentials = true;
          await Axios.post(`http://localhost:8090/login`, 
            /* {
              headers :{
                'Access-Control-Allow-Headers':'x-requested-with, Request-Header, Response-Header',
                'Access-Control-Allow-Methods':'POST, GET, OPTIONS, DELETE',
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Expose-Headers':'Response-Header'
              }
              ,
              data: {
              username: username,
              password: password
            }
          } */
          {
            username: username,
            password: password
          },
          {withCredentials: true}
          )
          .then(function (response) {
            console.log("response : " + JSON.stringify(response));
            console.log("response username : " + JSON.stringify(response.config.data[0]));
            console.log("response.data : " + JSON.stringify(response.headers.access));
            console.log("set-cookie : " + response.headers['set-cookie']);
            if (response.headers.access) {
              localStorage.setItem("access", response.headers.access);
            }
            setLoginUserId(username);
           
            localStorage.setItem("username", username); 
            //window.sessionStorage.setItem("username", username); 
          /* const board = await resp.json(); */
          //router.push(`/`);
          //router.refresh();
          })
          .catch(function (error) {
            console.log(error);
          });
          }}>
        <Form.Field inline>
          <input name="username" placeholder="ID" />
        </Form.Field>
        <Form.Field inline>
          <input name="password" type="password" placeholder="Password" />
        </Form.Field>
        <button className="ui primary button" color="blue">
          Login
        </button>
      </Form>
        
        <button className="ui primary button" color="blue" onClick={() => logout()}>
          LogOut
        </button>
      </div>
      <Gnb />
    </div>
  );
}