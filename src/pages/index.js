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



export default function Home() {

  
  return (
    <div>
      <Head>
        <title>Board</title>
      </Head>
      <Header as="h3" style={{ paddingTop: 40 }}>
      Index Page
      </Header>
      <Divider />

    </div>
  );
}

// axios