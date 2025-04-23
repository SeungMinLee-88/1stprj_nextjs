import axios from "axios"
import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
const BASE_URL = "http://localhost:9090/upload/1745197916007_111.png"

import HeaderComponent from './HeaderComponent';
import MyImagesComponent from './MyImagesComponent';
import UploadImageComponent from './UploadImageComponent';
export default function FileService() {
    
    const getAllImages = () => {
        return axios.get(BASE_URL);
    }
    const uploadImage = (fileFormData) => { 
        return axios.post(BASE_URL+'/upload', fileFormData);
    }
    return (
/*         <Router>
      <HeaderComponent />
      <div className='container'>
        <Routes>
          <Route path='/' element={<Navigate to='/my-images' />}></Route>
          <Route path='/my-images' element={<MyImagesComponent />}></Route>
          <Route path='/upload' element={<UploadImageComponent />}></Route>
        </Routes>
      </div>
    </Router> */
    <></>
      );
    }