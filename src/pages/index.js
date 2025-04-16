import Axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Divider, Header, Button } from "semantic-ui-react";
import BoardList from "../component/BoardList";
import BoardWrite from "../component/BoardWrite";
import styles from "../styles/Home.module.css";
import Reacttest from "./Reacttest";
import Error403 from "./403";
import { useContext } from 'react';
import { UserContext } from './UserContext.js';



/* console.log("response.data.pageable.pageNumber : " + response.data.pageable.pageNumber);
console.log("response.data.totalPages : " + response.data.totalPages);
console.log("response.data.pageable.pageSize : " + response.data.pageable.pageSize);
console.log("va11 : " + (Math.ceil(Number(currentPage) / response.data.totalPages)));
console.log("va 22: " + (Math.ceil(Number(response.data.pageable.pageNumber) / response.data.pageable.pageSize)));
console.log("response.data.pageable.pageSize + 1 : " + Number(response.data.pageable.pageSize) + 1);
console.log("type response.data.pageable.pageSize : " + typeof response.data.pageable.pageSize);
console.log("startPage : " + startPage);
console.log("response.data.pageable.totalPages : " + response.data.totalPages);
 */

export default function Home() {
  const [boardList, setboardList] = useState([]);
  /* const [currentPage, setCurrentPage] = useState({
    currentPage: 1,
    TotalPage: 1,
  }); */
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [searchKey, setSearchKey] = useState("boardTitle");
  const [searchValue, setSearchValue] = useState("");
  const [goUrl, setGoUrl] = useState("/");
  const username = useContext(UserContext);
  console.log("Home username : " + username);


  const API_URL =
    `${process.env.NEXT_PUBLIC_API_URL}/pagingList`;
    var startPage = "";
    var endPage = "";
    
  async function refreshToken()
  {
    const refreshToken = "";
    await Axios.post(`http://localhost:8090/reissue` ,
      {},
      {withCredentials: true}
      )
      .then(function (response) {
        console.log("response.data : " + JSON.stringify(response));
        if(response.status === 200){
          console.log("response.status200");
          localStorage.removeItem("access");
          localStorage.setItem("access", response.headers.access);
        }
      //router.push(`/`);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
    
  function getData() {
    Axios.get(API_URL, {
      headers: {
        "Content-Type": "application/json", 
        access: localStorage.getItem("access") 
      },
      params: {
        page: currentPage,
        size: "3",
        sort: "createdTime,desc",
        searchKey: searchKey,
        searchValue: searchValue
      },
    }
  ).then((response, error) => {
      console.log("response.data : " + JSON.stringify(response.data));
      
      /* setCurrentPage({
        ...currentPage,
        TotalPage: response.data.totalPages
      }); */
      setTotalPage(response.data.totalPages);
      
      startPage = (((Number)(Math.ceil(Number(currentPage) / response.data.totalPages))) - 1) * response.data.pageable.pageSize + 1;


      endPage = ((startPage + response.data.pageable.pageSize - 1) < response.data.totalPages) ? startPage + response.data.pageable.pageSize - 1 : response.data.totalPages;
      console.log("endPage : " + endPage);
      
      console.log("response.data.content : " + JSON.stringify(response.data.content));
      setboardList(response.data.content);
      console.log("boardList : " + JSON.stringify(boardList));
    }).catch(function (error) {
      if (error.response) {
        // 요청이 전송되었고, 서버는 2xx 외의 상태 코드로 응답했습니다.
        console.log("error.response.data : " + error.response.data);
        console.log("error.response.status : " + error.response.status);
        console.log("error.response.headers : " + JSON.stringify(error.response.headers));

          if(error.response.status === 401 && error.response.data === "expired")
          {
            console.log("error.response.status 401 ");
            refreshToken();
          }
          else if(error.response.status === 403)
          {
            console.log("error.response.status 403 ");
            return (
              <div>
                <Error403 />
              </div>
            )
          }
      } else if (error.request) {
        // 요청이 전송되었지만, 응답이 수신되지 않았습니다. 
        // 'error.request'는 브라우저에서 XMLHtpRequest 인스턴스이고,
        // node.js에서는 http.ClientRequest 인스턴스입니다.
        console.log("error.request : " + error.request);
      } else {
        // 오류가 발생한 요청을 설정하는 동안 문제가 발생했습니다.
        console.log("error.message : " + error.message);
      }
      console.log("error.config : " + error.config);
      console.log(error.config);
    });
    
    boardList.map((board) => (
      console.log("board.boardTitle : " + board.boardTitle)
    ));
  }
  function changePage(page) {
    console.log("call changePage");
/*     setCurrentPage({
      ...currentPage,
      currentPage: page
    }); */
    setCurrentPage(page);
  }

  useEffect(() => {
    getData();
  }, []);
  
/*   useEffect(() => {
    setCurrentPage(1);
    getData();
  }, [searchKey, searchValue]);
 */
    
  const router = useRouter();
  
/*   function goLink(url) {
    console.log("call goLink");
    setGoUrl(url);
  } */
 console.log("goUrl : " + goUrl);
 console.log("boardList except : " + JSON.stringify(boardList));
 if(goUrl === "BoardWrite")
 {
  return (
    <div>
      <BoardWrite changeGoUrl={setGoUrl}/>
      
    </div>
  )
}
  return (
    <div>
      <Head>
        <title>Board</title>
      </Head>
      <Header as="h3" style={{ paddingTop: 40 }}>
      Board
      </Header>
      <Divider />
     {/*  <BoardList boardList={boardList.slice(0, 2)} /> */}
     <BoardList boardList={boardList} currentPage={currentPage} TotalPage={totalPage} changePage={changePage} changeSearchKey={setSearchKey} changeSearchValue={setSearchValue} searchKey={searchKey} 
     startPage={startPage} endPage={endPage} />
           
      {/* <ItemList list={list.slice(9)} /> */}
      <Reacttest />
      {/* <Button>Click Here</Button> */}
      
      <button className="ui button" onClick={() => setGoUrl("BoardWrite")}>Write</button>

    </div>
  );
}

// axios