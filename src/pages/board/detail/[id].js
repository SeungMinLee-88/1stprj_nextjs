
import Axios from "axios";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { Loader, Container, Header, Divider,
  ListItem, List
 } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { FileService } from '../../FileService';
import { use } from 'react';
import { useContext } from 'react';
import { UserIdContext } from '../../UserContext.js';
import { UserNameContext } from '../../UserContext.js';


import Board from "../../../component/Board.js";
import CommentList from "../../CommentList.js";


export default function BoardDetail({ board, name, id }) {
  const router = useRouter();
  const [fileList, setFileList] = useState([]);
  const [imageFileList, setImageFileList] = useState([]);
  const [goUrl, setGoUrl] = useState("");
  const userId = useContext(UserIdContext);
  console.log("detail userId : " + userId);
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
      setImageFileList(fileList.filter(a => a.mimeType === "image"));
      console.log("useEffect fileList : " + JSON.stringify(fileList));
      }
  }, [fileList]);

console.log("fileList  : " + JSON.stringify(fileList));
  console.log("fileList filter : " + JSON.stringify(fileList.filter(a => a.mimeType === "image")));
  console.log("imageFileList : " + JSON.stringify(imageFileList));
  console.log(`http://localhost:8090/board/update/${id}`)
  
  
  const boardDelete = async () => {
    if(!confirm("delelte?")){
      return false;
    }
    await Axios.delete(`http://localhost:8090/api/v1/board/delete/${id}`, {
      headers: {
        "Content-Type": "application/json", 
        access: localStorage.getItem("access") 
      },
      params: {
      },
    }
  ).then((response, error) => {
    alert("Delete Success");
    router.push("/Board");
  
  }).catch(function (error) {
    console.log("error cause : " + JSON.stringify(error));
  });
  };
  
  return (
    <>

      {board && (
        <>
            <div>
            <Container textAlign='left' style={{"font-size": "50px", "padding-top":"20px", "display" : "block"}}>{board.boardTitle}</Container>
            <Container textAlign='right'>Writer : {board.boardWriter}</Container>
            <Container textAlign='justified'>
            <Divider />
              <p>
              {board.boardContents}
              </p>
              {imageFileList.map((imageFiles) => (
                    <div>
                     <img src={"http://localhost:8090/api/v1/board/download/"+imageFiles.storedFileName} class="ui medium bordered image"/>                     
                     </div>
                   
                   ))}
            </Container>
            </div>
            <div>
            <Divider />
            {/* <div role="list" className="ui bulleted horizontal link list"></div> */}
            {board['fileAttached'] === 1 &&(

                  
                  
                  <List bulleted horizontal link>
                    <ListItem active>Attached | </ListItem>
                {fileList.map((files) => (
                   
                    <a role="listitem" id={files.id} className="item"  href={"http://localhost:8090/api/v1/board/download/"+files.storedFileName} target="_blank">{files.originalFileName}{files.type}</a>                   
                  
                  ))}
                  </List>
              )}
            </div>
            <Divider />
            {userId === board.boardWriter && 
            <div>
            <button className="ui button"  onClick={() => router.push(`http://localhost:3000/board/update/${id}`)}>Edit</button>
            
            <button className="ui button"  onClick={boardDelete}>Delete</button>
            </div>
            }
          <CommentList boardId={id} userId={userId}/>
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
      id: id
    },
  };
}
