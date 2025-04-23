import React from "react";
import Axios from "axios";
import { useRouter } from "next/navigation";
import { FormGroup, FormField, Form } from 'semantic-ui-react'
import { useEffect, useState, useRef } from "react";

export default function BoardWrite({ changeGoUrl }) {
  const router = useRouter();
  let fileFormData = new FormData();
  const [fileList, setFileList] = useState([]);
  const [fileNameList, setfileNameList] = useState("");
  const data = new FormData();
  const fileChange = e => {
    console.log("e.target.value : " +  e.target.value)
    console.log("e.target.name : " +  e.target.name)
    console.log("e.target.files : " +  JSON.stringify(e.target.files))
    console.log("e.target.files[0] : " +  JSON.stringify(e.target.files[0]))
/*State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().     
setFileList({...fileList,fileList : Array.from(e.target.files)}, () => { console.log("callback fileList : " + JSON.stringify(fileList)) }) */
    const newFiles = Array.from(e.target.files);
    setFileList(newFiles)
    console.log("fileList : " +  JSON.stringify(fileList))
  };
  const renderFileList = () => (
<div>
{console.log("fileList : " + fileList.length)}
    <li>
      Attached File : {fileList.length}
    </li>
  <ol>

    {[...fileList].map((f, i) => (
        <li key={i}>{f.name} - {f.type}</li>
    ))}
</ol>
</div>  )
useEffect(() => {
}, [fileList]);
      const onFormSubmit = async evt => {
        evt.preventDefault(); 
        console.log("prevent test");
          const boardWriter = evt.target.boardWriter.value;
          const boardPass = evt.target.boardPass.value;
          const boardTitle = evt.target.boardTitle.value;
          const boardContents = evt.target.boardContents.value;
          const formData = new FormData();
          /* formData.append("boardFile", fileList); */
          formData.append("boardTitle", boardTitle);
          formData.append("boardPass", "boardPass");
          formData.append("boardWriter", "boardWriter");
          formData.append("boardContents", "boardContents");
          console.log("fileList.len : " + fileList.length);
          if(fileList.length === 0) {
            console.log("fileList.length === 0");
            //formData.append('boardFile', "");
          }else{
            console.log("fileList.length !== 0");
          fileList.forEach((fileList) => {
            console.log("forEach : " + JSON.stringify(fileList))
            formData.append('boardFile', fileList);
           });
          }
          //formData.append("boardFile[]", fileList);
          
          console.log("formData : " + JSON.stringify(formData))
    
          const resp = await Axios.post("http://localhost:8090/api/v1/board/boardSave",
            formData,
            {headers: {'Content-Type': 'multipart/form-data' }}
/*             headers: {
              'Content-Type': 'multipart/form-data'
            }, */
          )
          .then(function (response) {
            console.log("response.data : " + JSON.stringify(response.data));
          /* const board = await resp.json(); */
          //router.push(`/board/detail/${response.data.id}`);
          //router.refresh();
          })
          .catch(function (error) {
            console.log(error);
          });
          //router.refresh();
    
      };

  const fileInputRef1 = useRef();
  const fileFormRef1 = React.createRef();
    return (
      <div>
        {/* <Form onSubmit={async evt=>{
          evt.preventDefault();}}> */}
        <Form onSubmit={onFormSubmit}>
              <Form.Field>
                <div ref={fileFormRef1}>
              <input type="file" name='files' multiple onChange={fileChange} ref={fileInputRef1} hidden/>
              {renderFileList()}
              <button type="button"
                  name = "fileBtn"
                  className="ui icon left labeled button"
                  labelposition="left"
                  icon="file"
                  onClick={() => fileInputRef1.current.click()}
                ><i aria-hidden="true" className="file icon"></i>Choose File</button>
                </div>
                
{/*                 <div class="ui icon buttons">
                <button className="ui button"
                  onClick={() => fileFormRef1.current.remove()}
                ><i aria-hidden="true" class="minus icon"></i></button>
                <button className="ui button"
                  onClick={() => fileFormRef1.current.remove()}
                ><i aria-hidden="true" class="plus icon"></i></button>
                </div> */}
            
              </Form.Field>
              <FormField>
          <label>boardFile</label>

          </FormField>

          <FormGroup widths='equal'>
          <FormField>
          <label>boardWriter</label>
          <input name='boardWriter' />
          </FormField>
          <FormField>
          <label>boardPass</label>
          <input name='boardPass' />
          </FormField>
          <FormField>
          <label>boardTitle</label>
          <input name='boardTitle' />
          </FormField>
          <FormField>
          <label>boardContents</label>
          <input name='boardContents' />
          </FormField>

            {/* <FormField label='An HTML <select>' control='select'>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
            </FormField> */}
          </FormGroup>
          <FormField label='boardContents' as="" control='textarea' rows='3' />

          {/* <FormField label='Write' control='button'>
            HTML Button
          </FormField> */}
          <button type="submit" className="ui button">Write</button>
        </Form>
      <button className="ui button" onClick={() => changeGoUrl("/")}>List</button>
      </div>
    );
}
