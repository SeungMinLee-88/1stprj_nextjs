
import Axios from "axios";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { Dimmer, Loader } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { FileService } from '../../FileService';
import { use } from 'react';

import Board from "../../../component/Board.js";
import CommentList from "../../CommentList.js";


export default function BoardDetail({ board, name }) {
  const router = useRouter();
  const [fileList, setFileList] = useState([]);
  if (router.isFallback) {
    return (
      <div style={{ padding: "100px 0" }}>
        <Loader active inline="centered">
          Loading
        </Loader>
      </div>
    );
  }

  //console.log("BoardDetail fileAttached : " + board['fileAttached']);
  console.log("BoardDetail response.data : " + JSON.stringify(board));
  console.log("BoardDetail board : " + board);
  

  useEffect(() => {
    console.log("BoardDetail fileAttached : " + board['fileAttached']);
    if(board["fileAttached"] === 1){
      console.log("BoardDetail boardFileDTO : " + JSON.stringify(board["boardFileDTO"]));
      setFileList(board["boardFileDTO"]);
      console.log("useEffect fileList : " + JSON.stringify(fileList));
      }
  }, []);
  return (
    <>
    {board['fileAttached'] === 1 &&(
      <div>
        <div role="list" className="ui bulleted horizontal link list">
      {fileList.map((files) => (
        
          <a role="listitem" className="item"  href={"http://localhost:8090/api/v1/board/download/"+files.storedFileName} target="_blank">{files.originalFileName}</a>
        
        ))}
        </div>
      </div>
    )}
      {board && (
        <>
          <Head>
            <title>{board.boardTitle}</title>
            <meta name="description" content={board.boardContents}></meta>
          </Head>
          {name} 환경 입니다.
          <Board board={board} />
          {/* <CommentList /> */}
        </>
      )}
    </>
  );
};
/*   async function getData() {
    await Axios.get(`http://localhost:8090/api/v1/board/31`, {
        headers: {
          "Content-Type": "application/json", 
          access: localStorage.getItem("access") 
        },
        params: {
        },
      }
    ).then((response, error) => {
      console.log("BoardDetail response.data : " + JSON.stringify(response.data));
      console.log("BoardDetail board : " + response.data);
      console.log("BoardDetail fileAttached : " + response.data['fileAttached']);
    }).catch(function (error) {
    });
}
      useEffect(() => {
        getData();
      }, []); */
export async function getStaticPaths() {
  const apiUrl =  `http://localhost:8090/api/v1/board/list`;
  const res = await Axios.get(apiUrl);
  const data = res.data;
  return {
    paths: data.slice(0, 100).map((item) => ({
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
