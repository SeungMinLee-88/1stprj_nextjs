import Axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Divider, Header } from "semantic-ui-react";
import BoardList from "../component/BoardList";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [boardList, setboardList] = useState([]);

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL;

  function getData() {
    Axios({
      method: 'GET',
      url: API_URL,
      params: {
        page: "1",
        size: "10",
        sort: "createdTime,desc",
        searchKey: "boardTitle",
        searchValue: ""
      }
    }).then((response) => {
      console.log("response.data : " + JSON.stringify(response.data));
      
      var startPage = ((int)(Math.ceil((double)response.data.pageNumber / response.data.pageable.size)) - 1 * response.data.size + 1;

      /* var startPage = (((int)(Math.ceil((double)response.data.pageable.pageNumber / blockLimit))) - 1) * response.data.pageable.size + 1;
      int endPage = ((startPage + response.data.pageable.size - 1) < response.data.pageable.totalPages) ? startPage + response.data.pageable.size - 1 : boardList.getTotalPages(); */
      
      console.log("response.data.content : " + JSON.stringify(response.data.content));
      setboardList(response.data.content);
      //console.log("response.data.content : " + JSON.stringify(response.data.content.boardTitle));
    });
    
    boardList.map((board) => (
      console.log("board.boardTitle : " + board.boardTitle)
    ));
  }
 

  useEffect(() => {
    getData();
  }, []);

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
     <BoardList boardList={boardList} />
      {/* <ItemList list={list.slice(9)} /> */}
    </div>
  );
}

// axios