'use client'
import Axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { use } from 'react';
import ReactDOM from "react-dom";

import Item from "../../component/Item";


export default function Post(props){
  const router = useRouter();
  const propsid = use(props.params);
  console.log("propsid :" + propsid.id);
  //const { id } = router.query;  
  const id = propsid.id;

  const [item, setItem] = useState({});

  const API_URL = `http://makeup-api.herokuapp.com/api/v1/products/${id}.json`;

  console.log("API_URL :" + API_URL);
  function getData() {
    Axios.get(API_URL).then((res) => {
      setItem(res.data);
    });
  }

  useEffect(() => {
    if (id && id > 0) {
      getData();
    }
  }, [id]);

  return <Item item={item} />;
};
