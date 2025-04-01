
import Axios from "axios";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { Dimmer, Loader } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { use } from 'react';

import Board from "../../../component/Board.js";


export default function BoardDetail({ board, name }) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div style={{ padding: "100px 0" }}>
        <Loader active inline="centered">
          Loading
        </Loader>
      </div>
    );
  }

  return (
    <>
      {board && (
        <>
          <Head>
            <title>{board.boardTitle}</title>
            <meta name="description" content={board.boardContents}></meta>
          </Head>
          {name} 환경 입니다.
          <Board board={board} />
        </>
      )}
    </>
  );
};

export async function getStaticPaths() {
  const apiUrl =  `http://localhost:8090/api/v1/board/pagingList`;
  const res = await Axios.get(apiUrl);
  const data = res.data;
  return {
    paths: data.content.slice(0, 100).map((item) => ({
      params: {
        id: item.id.toString(),
      },
    })),
    fallback: true,
  };
/*   return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking' //indicates the type of fallback
} */
}

export async function getStaticProps(context) {
  
  console.log("call getStaticProps");
  const id = context.params.id;
  const apiUrl = `http://localhost:8090/api/v1/board/${id}`;
  const res = await Axios.get(apiUrl);
  const data = res.data;

  return {
    props: {
      board: data,
      name: process.env.name,
    },
  };
}
