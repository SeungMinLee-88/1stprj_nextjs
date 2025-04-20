import React, { Component } from 'react';
import axios from "axios"
import { useEffect, useState } from "react";
import { Navigate } from 'react-router-dom';
import FileService from './FileService';

const BASE_URL = "http://localhost:9090/board"
export default function UploadImageComponent() {
        const state = {
            files: null,
            fileUploaded: null,
            uploaderName: ''}
            
    const [files, setfiles] = useState([]);
    const [fileUploaded, setfileUploaded] = useState();
    const [uploaderName, setuploaderName] = useState("");
    
    const getAllImages = () => {
        return axios.get(BASE_URL);
    }
    const uploadImage = (fileFormData) => { 
        console.log("fileFormData : " + JSON.stringify(fileFormData))
        return axios.post(BASE_URL+'/upload', fileFormData);
    }

    const onFileChange = (event) => {
        console.log("onFileChange : " + event.target.value)
        setfiles(event.target.files[0]);
    }
    const onUploaderNameChange = (event) =>{
        setuploaderName(event.target.value);
    }
    const onUpload = (event) => {
        event.preventDefault();
        const formData = new FormData();
        for (const key of Object.keys(files)) {
            console.log("files[key] : " + JSON.stringify(files[key]))
            //formData.append('files', "123123");
        }
        formData.append('files', files);
        formData.append('name', "124124214");
        
        console.log("formData : " + JSON.stringify(formData))
        uploadImage(formData).then((response) => {
            console.log(response.data);
            setfileUploaded({ fileUploaded: true });
        }).catch(error => {
            console.log(error);
        });
    }
        if(state.fileUploaded){
            return  <Navigate to="/my-images" replace={true} />;
        }
        return (
            <div className='row'>
                <div className='card col-md-6 offset-md-3 mt-5'>
                    <h3 className='text-center'>Upload Image</h3>
                    <div className='card-body'>
                        <form onSubmit={onUpload}>
                            <div>
                                <label>Select a file:</label>
                                <input className='mx-2' type='file' name='files' onChange={onFileChange} multiple></input>
                            </div>
                            <div className="mt-3">
                                <label>Uploader Name:</label>
                                <input className='mx-2' type='text' name='uploaderName' value={"uploaderName"} onChange={onUploaderNameChange}></input>
                            </div>
                            <button className='btn btn-success btn-sm mt-3' type='submit' /* disabled={!files || !uploaderName} */>Upload</button>
                        </form>
                    </div>
                </div>
            </div>
        );
}
