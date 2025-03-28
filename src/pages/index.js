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
      method: 'post',
      url: API_URL,
      data: {
        sortfield: "board_title",
        searchfield: "",
        searchtext: "11"
      }
    }).then((response) => {
      console.log(response.data);
      setboardList(response.data);
      console.log("response.data : " + response.data.length)
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