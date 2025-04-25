import Axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Container,
    ListItem,
    ListIcon,
    ListHeader,
    ListDescription,
    ListContent,
    List,
    Pagination,
    Search  } from "semantic-ui-react";

export default function CommentList() {
    
    function getData() {
        Axios.get(`http://localhost:8090/comment/commentTrees?page=1&size=10&boardId=31`, {
          headers: {
            "Content-Type": "application/json", 
            access: localStorage.getItem("access") 
          },
          params: {
            page: 1,
            size: 2
          },
        }
      ).then((response, error) => {
    }).catch(function (error) {
    });
    
    /* boardList.map((board) => (
      console.log("board.boardTitle : " + board.boardTitle)
    )); */
  }
    
    useEffect(() => {
        getData();
      }, []);
}