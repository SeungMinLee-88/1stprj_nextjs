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


export default function Login({setAccessToken, setLoginUserId, setLoginUserName}) {
  /* const [loginUserId, setLoginUserId] = useState(""); */

  const router = useRouter();
/*   console.log("Login loginUserId : " + loginUserId); */
  function login() {
    console.log("call login");
  }
  console.log("${process.env.NEXT_PUBLIC_API_URL} : " + process.env.NEXT_PUBLIC_API_URL)
  const [open, setOpen] = useState(true)
  //console.log("access : " + localStorage.getItem("access"))
  return (
    <div style={{ padding: "100px 0", textAlign: "center" }}>
      <Form onSubmit={async evt=>{
          evt.preventDefault();
          const loginId = evt.target.loginId.value;
          const userPassword = evt.target.userPassword.value;
          //Axios.defaults.withCredentials = true;
          await Axios.post(`${process.env.API_URL}/api/v1/user/login`, 
            {
              loginId: loginId,
              userPassword: userPassword
            },
            {
              withCredentials: true
            },
          )
          .then(function (response) {
            console.log("response : " + JSON.stringify(response));
            console.log("response.headers.access : " + JSON.stringify(response.headers.access));
            console.log("response.data userName : " + JSON.stringify(response.headers["username"]));
            console.log("set-cookie : " + response.headers['set-cookie']);
            if (response.headers.access) {
              localStorage.setItem("access", response.headers.access);
            }
            setAccessToken(localStorage.getItem("access"));
            setLoginUserId(loginId);
            setLoginUserName(response.headers["username"]);
           
            //localStorage.setItem("username", username); 
            window.sessionStorage.setItem("loginId", loginId);
            window.sessionStorage.setItem("userName", response.headers["username"]); 
          /* const board = await resp.json(); */
          //router.push(`/`);
          //router.refresh();
          alert("Login Success");
          router.push(`/`);
          })
          .catch(function (error) {
            console.log("error : " + error);
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


    </div>
  );
}