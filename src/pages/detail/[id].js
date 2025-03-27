
import Axios from "axios";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { Dimmer, Loader } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { use } from 'react';
import ReactDOM from "react-dom";

import Item from "../../component/Item";


export default function Post({ item, name }) {
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
      {item && (
        <>
          <Head>
            <title>{item.name}</title>
            <meta name="description" content={item.description}></meta>
          </Head>
          {name} 환경 입니다.
          <Item item={item} />
        </>
      )}
    </>
  );
};

export async function getStaticPaths() {
  console.log("NEXT_PUBLIC_API_URL : " + process.env.NEXT_PUBLIC_API_URL);
  const apiUrl =  `${process.env.NEXT_PUBLIC_API_URL}`;
  const res = await Axios.get(apiUrl);
  const data = res.data;
  console.log("res : " + res);
  return {
    paths: data.slice(0, 9).map((item) => ({
      params: {
        id: item.id.toString(),
      },
    })),
    fallback: true,
  };
}

export async function getStaticProps(context) {
  
  const id = context.params.id;
  const apiUrl = `http://makeup-api.herokuapp.com/api/v1/products/${id}.json`;
  const res = await Axios.get(apiUrl);
  const data = res.data;

  return {
    props: {
      item: data,
      name: process.env.name,
    },
  };
}
