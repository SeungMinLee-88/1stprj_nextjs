import "../app/globals.css";
import '../../node_modules/semantic-ui-css/semantic.min.css';
import Footer from "../component/Footer";
import Top from "../component/Top";
import { useEffect, useState, useMemo } from "react";
import { useContext } from 'react';
import { UserIdContext } from './UserContext.js';
import { UserNameContext } from './UserContext.js';



export default function MyApp({ Component, pageProps }) {
  const [accessToken, setAccessToken] = useState();
  const [loginUserId, setLoginUserId] = useState();
  const [loginUserName, setLoginUserName] = useState("");
  console.log("loginUserId : " + loginUserId);
  
  //console.log("localStorage username : " + localStorage.getItem("username"));
  //localStorage.setItem("username", loginUserId);
  //window.sessionStorage.setItem("username",loginUserId);
  /* console.log("localStorage username : " + localStorage.getItem("username")); */
  //console.log("sessionStorage username : " + window.sessionStorage.getItem("username"));
  
  useEffect(() => {
    //localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todoList));
    //localStorage.setItem("username", loginUserId); 
    /* setAccessToken(localStorage.getItem("access"));
    setLoginUserId(window.sessionStorage.getItem("userName"));
    setLoginUserName(window.sessionStorage.getItem("loginId")); */
  }, [accessToken, loginUserId, loginUserName]);
  

  const userId = useContext(UserIdContext);
  //console.log("MyApp userIdContext : " + userIdContext);
  console.log("MyApp sessusername : " + loginUserId);
  console.log("MyApp accessToken : " + accessToken);
  return (
    <div style={{ width: 800, margin: "0 auto" }}>
{/*       <AccessTokenContext value={accessToken}> */}
      <UserIdContext value={loginUserId}><UserNameContext value={loginUserName}>
      <Top setAccessToken={setAccessToken} setLoginUserId={setLoginUserId} setLoginUserName={setLoginUserName} accessToken={accessToken}/>
      <Component {...pageProps} setAccessToken={setAccessToken} setLoginUserId={setLoginUserId} setLoginUserName={setLoginUserName} />
      <Footer />
      </UserNameContext>
      </UserIdContext>
      {/* </AccessTokenContext> */}
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