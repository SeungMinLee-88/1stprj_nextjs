import React, { findDOMNode, Component, PropTypes } from 'react';
import Axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";
import {
  ModalContent,
  ModalActions,
  Button,
  Header,
  Icon,
  Modal,
  Form
} from 'semantic-ui-react'
import { UserContext } from './UserContext.js';


export default function Login({setLoginUserId}) {
  /* const [loginUserId, setLoginUserId] = useState(""); */

  const router = useRouter();
/*   console.log("Login loginUserId : " + loginUserId); */
  function login() {
    console.log("call login");

  }
  const [open, setOpen] = useState(true)
  return (
    <div style={{ padding: "100px 0", textAlign: "center" }}>
      <Form onSubmit={async evt=>{
          evt.preventDefault();
          const loginId = evt.target.loginId.value;
          const userPassword = evt.target.userPassword.value;
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
            loginId: loginId,
            userPassword: userPassword
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
            setLoginUserId(loginId);
           
            //localStorage.setItem("username", username); 
            window.sessionStorage.setItem("loginId", loginId); 
          /* const board = await resp.json(); */
          //router.push(`/`);
          //router.refresh();
          })
          .catch(function (error) {
            console.log(error);
          });
          }}>
        <Form.Field inline>
          <input name="loginId" placeholder="ID" />
        </Form.Field>
        <Form.Field inline>
          <input name="userPassword" type="password" placeholder="Password" />
        </Form.Field>
        <button className="ui primary button" color="blue" onClick={() => login}>
          Login
        </button>
      </Form>

    <button class="ui button" onClick={() => setOpen(!open)}>Show Modal</button>


    </div>
  );
}