import React, { findDOMNode, Component, PropTypes } from 'react';
import Axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";
import { Button, Form } from "semantic-ui-react";
import { UserContext } from './UserContext.js';


export default function Login({loginUserId, setLoginUserId}) {
  /* const [loginUserId, setLoginUserId] = useState(""); */
  const router = useRouter();
  console.log("Login loginUserId : " + loginUserId);
  function login() {
    console.log("call login");

  }
    
  return (
    <div style={{ padding: "100px 0", textAlign: "center" }}>
      <Form onSubmit={async evt=>{
          evt.preventDefault();
          const username = evt.target.username.value;
          const password = evt.target.password.value;
          //Axios.defaults.withCredentials = true;
          await Axios.post(`http://localhost:8090/login`, 
          {
            username: username,
            password: password
          },
          {withCredentials: true}
          )
          .then(function (response) {
            console.log("response : " + JSON.stringify(response));
            console.log("response.data : " + JSON.stringify(response.headers.access));
            console.log("set-cookie : " + response.headers['set-cookie']);
            if (response.headers.access) {
              localStorage.setItem("access", response.headers.access);
            }
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
        <button className="ui primary button" color="blue" onClick={() => login}>
          Login
        </button>
      </Form>
    </div>
  );
}