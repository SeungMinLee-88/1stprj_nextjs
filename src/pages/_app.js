import "../app/globals.css";
import '../../node_modules/semantic-ui-css/semantic.min.css';
import Footer from "../component/Footer";
import Top from "../component/Top";
import { useEffect, useState, useMemo } from "react";
import { useContext } from 'react';
import { UserContext } from './UserContext.js';


export default function MyApp({ Component, pageProps }) {
  const [loginUserId, setLoginUserId] = useState();
  const [localusername, setlocalusername] = useState("");
  console.log("loginUserId : " + loginUserId);
  
  //console.log("localStorage username : " + localStorage.getItem("username"));
  //localStorage.setItem("username", loginUserId);
  //window.sessionStorage.setItem("username",loginUserId);
  /* console.log("localStorage username : " + localStorage.getItem("username")); */
  //console.log("sessionStorage username : " + window.sessionStorage.getItem("username"));
  
  useEffect(() => {
    //localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todoList));
    //localStorage.setItem("username", loginUserId); 
    setLoginUserId(localStorage.getItem("username"));
    //setLoginUserId(window.sessionStorage.getItem("username"));
  }, [loginUserId]);
  
  
  const username = useContext(UserContext);
  console.log("MyApp loginUserId : " + loginUserId);
  return (
    <div style={{ width: 1000, margin: "0 auto" }}>
      <UserContext value={loginUserId}>
      <Top setLoginUserId={setLoginUserId} />
      <Component {...pageProps} setLoginUserId={setLoginUserId} />
      <Footer />
      </UserContext>
    </div>
  );
}

/**
 * 페이지 전환시 레이아웃을 유지할 수 있습니다.
페이지 전환시 상태값을 유지할 수 있습니다.
componentDidCatch를 이용해서 커스텀 에러 핸들링을 할 수 있습니다.
추가적인 데이터를 페이지로 주입시켜주는게 가능합니다.
글로벌 CSS 를 이곳에 선언합니다.
 * 
 */