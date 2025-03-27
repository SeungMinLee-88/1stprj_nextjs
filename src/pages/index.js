import Axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Divider, Header } from "semantic-ui-react";
import BoardList from "../component/BoardList";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [boardList, setboardList] = useState([]);

  const API_URL =
    "http://localhost:8090/restboard/";

  function getData() {
    Axios.get(API_URL).then((res) => {
      console.log(res.data);
      setboardList(res.data);
      console.log("res.data : " + res.data.length)
    });
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
      <BoardList list={boardList.slice(0, 9)} />
      {/* <ItemList list={list.slice(9)} /> */}
    </div>
  );
}

// axios