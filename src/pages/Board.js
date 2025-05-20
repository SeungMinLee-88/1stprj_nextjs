import Axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Divider, Header } from "semantic-ui-react";
import BoardList from "../component/BoardList";
import Error403 from "./403";
import { useContext } from 'react';
import { UserIdContext } from './UserContext.js';

export default function Board() {
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
  const [startPage, setStartPage] = useState("/");
  const [endPage, setEndPage] = useState("/");
  
  
  const userId = useContext(UserIdContext);
  console.log("Board userId : " + userId);
    
  function getData() {
    Axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/board/boardList`, {
      headers: {
        "Content-Type": "application/json"
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
      
      setStartPage((((Number)(Math.ceil(Number(currentPage) / response.data.totalPages))) - 1) * response.data.pageable.pageSize + 1);


      setEndPage(((startPage + response.data.pageable.pageSize - 1) < response.data.totalPages) ? startPage + response.data.pageable.pageSize - 1 : response.data.totalPages);
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
    //setUserName(window.sessionStorage.getItem("loginId"))
  }, [currentPage,searchKey, searchValue]);
  
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
/*  if(goUrl === "BoardWrite")
 {
  return (
    <div>
      <BoardWrite changeGoUrl={setGoUrl}/>
      
    </div>
  ) 
}
  */
  return (
    <div>
      <Head>
        <title>Board</title>
      </Head>
      <Header as="h3" style={{ paddingTop: 40 }}>
      Board
      </Header>
      <Divider />
     <BoardList boardList={boardList} currentPage={currentPage} setCurrentPage = {setCurrentPage} TotalPage={totalPage} changePage={changePage} changeSearchKey={setSearchKey} changeSearchValue={setSearchValue} searchKey={searchKey} 
     startPage={startPage} endPage={endPage} />      

      {userId !== null ? <button className="ui button" onClick={() => router.push("/BoardWrite")}>Write</button> : ""}
    </div>
  );
}