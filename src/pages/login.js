import React, { findDOMNode, Component, PropTypes } from 'react';
import Axios from "axios";
import { useRouter } from "next/router";
import { Button, Form } from "semantic-ui-react";


export default function Login() {
  const router = useRouter();
  function login() {
    console.log("call login");

  }
    
  return (
    <div style={{ padding: "100px 0", textAlign: "center" }}>
      <Form onSubmit={async evt=>{
          evt.preventDefault();
          const username = evt.target.username.value;
          const password = evt.target.password.value;
          await Axios.post(`http://localhost:8090/login`, {
            username: username,
            password: password
          })
          .then(function (response) {
            console.log("response.data : " + JSON.stringify(response.headers.access));
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
        <button class="ui primary button" color="blue" onClick={() => login}>
          Login
        </button>
      </Form>
    </div>
  );
}