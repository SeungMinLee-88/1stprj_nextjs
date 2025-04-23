import React, { Component } from 'react';
import axios from "axios"
import { useEffect, useState } from "react";
import FileService from './FileService';
const BASE_URL = "http://localhost:9090/upload/1745197916007_111.png"
export default function MyImagesComponent(){
    /* constructor(props) {
        super(props);
        this.state = {
            fileList: []
        }
    } */
   const [fileList, setFileList] = useState([]);
   
   async function getAllImages(){
    await axios.get("http://localhost:8090/api/v1/board/fileList/31", {
        params:{
            boardId: 31
        }
    }
    ).then((response) => {
        console.log("response : " + JSON.stringify(response));
        setFileList(response.data);
    });
}
const uploadImage = (fileFormData) => { 
    return axios.post(BASE_URL, fileFormData);
}
   
   useEffect(() => {
    getAllImages();

    
  }, []);
  console.log("useEffect fileList : " + JSON.stringify(fileList));

  fileList.map((file) => (
    console.log("file.id : " + file.id)
  ));
  
/*     componentDidMount() {
        FileService.getAllImages().then((response) => {
            this.setState({ fileList: response.data });
        });
    } */

        return (
            <div>
                <h2 className='mt-3 text-center mb-5'>My Images</h2>
                <div className='row justify-content-center'>
                    {fileList.map((file) => <div key={file.id} className='px-0 m-2 border bg-light col-3'>
                                <div className='hovereffect'>
                                    <img src={"http://localhost:8090/upload/"+file.storedFileName} width="330" height="300" alt="no"></img>
                                    <div className='overlay'>
                                        <a className='info text-primary bg-light border border-dark' href={"http://localhost:8090/api/v1/board/download/"+file.storedFileName} target="_blank" rel='noopener noreferrer'>Dowload</a>
                                        <br />
                                        <a className='info text-primary bg-light border border-dark' href={"http://localhost:8090/api/v1/board/download/"+file.storedFileName}target="_blank" rel='noopener noreferrer'>View</a>
                                        <br />
                                        <a className='info text-danger bg-light border border-dark' href='/'>Uploader: test</a>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        );
}