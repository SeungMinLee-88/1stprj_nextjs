import Axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Divider, Header, Button } from "semantic-ui-react";
import BoardList from "../component/BoardList";
import BoardWrite from "../component/BoardWrite";
import styles from "../styles/Home.module.css";
import Reacttest from "./Reacttest";

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

  const API_URL =
    `${process.env.NEXT_PUBLIC_API_URL}/pagingList`;
    var startPage = "";
    var endPage = "";
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
      }
    }).then((response) => {
      console.log("response.data : " + JSON.stringify(response.data));
      
      /* setCurrentPage({
        ...currentPage,
        TotalPage: response.data.totalPages
      }); */
      setTotalPage(response.data.totalPages);
      
      startPage = (((Number)(Math.ceil(Number(currentPage) / response.data.totalPages))) - 1) * response.data.pageable.pageSize + 1;

      console.log("response.data.pageable.pageNumber : " + response.data.pageable.pageNumber);
      console.log("response.data.totalPages : " + response.data.totalPages);
      console.log("response.data.pageable.pageSize : " + response.data.pageable.pageSize);
      console.log("va11 : " + (Math.ceil(Number(currentPage) / response.data.totalPages)));
      console.log("va 22: " + (Math.ceil(Number(response.data.pageable.pageNumber) / response.data.pageable.pageSize)));
      console.log("response.data.pageable.pageSize + 1 : " + Number(response.data.pageable.pageSize) + 1);
      console.log("type response.data.pageable.pageSize : " + typeof response.data.pageable.pageSize);
      console.log("startPage : " + startPage);
      console.log("response.data.pageable.totalPages : " + response.data.totalPages);
      
      endPage = ((startPage + response.data.pageable.pageSize - 1) < response.data.totalPages) ? startPage + response.data.pageable.pageSize - 1 : response.data.totalPages;
      console.log("endPage : " + endPage);
      
      console.log("response.data.content : " + JSON.stringify(response.data.content));
      setboardList(response.data.content);
      //console.log("response.data.content : " + JSON.stringify(response.data.content.boardTitle));
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
  }, [currentPage]);
  
  useEffect(() => {
    setCurrentPage(1);
    getData();
  }, [searchKey, searchValue]);

    
  const router = useRouter();
  
/*   function goLink(url) {
    console.log("call goLink");
    setGoUrl(url);
  } */
 console.log("goUrl : " + goUrl);
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
      
      <button class="ui button" onClick={() => setGoUrl("BoardWrite")}>Write</button>

    </div>
  );
}

// axios