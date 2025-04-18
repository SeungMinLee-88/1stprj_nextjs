import React from "react";
import Axios from "axios";
import { useRouter } from "next/navigation";
import { FormGroup, FormField, Form } from 'semantic-ui-react'
import { useEffect, useState } from "react";
const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
]

export default function BoardWrite({ changeGoUrl }) {
  const router = useRouter();
  // Export Schedules Tab 2
  const fileExport = file => {
    // handle save for export button function
  };

  const fileId = [];
  
  const onFormSubmit = async evt => {
    evt.preventDefault(); 

    console.log("prevent test");

      const boardWriter = evt.target.boardWriter.value;
      const boardPass = evt.target.boardPass.value;
      const boardTitle = evt.target.boardTitle.value;
      const boardContents = evt.target.boardContents.value;
      const resp = await Axios.put(`${process.env.NEXT_PUBLIC_API_URL}/save`, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        body : {boardWriter: boardWriter,
        boardPass: boardPass,
        boardTitle: boardTitle,
        boardContents: boardContents,
        fileList: { fileList: fileList}
        }
      })
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
  const [fileList, setFileList] = useState([]);
  const fileChange = e => {
    console.log(" e.target.value : " +  e.target.value)
    console.log(" e.target.files[0] : " +  JSON.stringify(e.target.files))
/*State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().     
setFileList({
      ...fileList,
      fileList : Array.from(e.target.files)
    }, () => { console.log("callback fileList : " + JSON.stringify(fileList)) }) */
    setFileList([
      ...fileList, e.target.files[0]
    ])
/*     fileList.map((file) => {
      console.log(" file : " +  JSON.stringify(file))
    }); */
  };
      useEffect(() => {
        console.log("fileList : " + JSON.stringify(fileList));
      }, [fileList]);

  
  const fileInputRef1 = React.createRef();
  const fileInputRef2 = React.createRef();
    return (
      <div>
        {/* <Form onSubmit={async evt=>{
          evt.preventDefault();}}> */}
        <Form onSubmit={onFormSubmit}>
              <Form.Field>
               
                <input
                  ref={fileInputRef1}
                  name = "fileInput1"
                  type="file"
                  mulitple
                  onChange={fileChange}
                />
                 <button
                  name = "fileBtn"
                  className="ui icon left labeled button"
                  labelposition="left"
                  icon="file"
                  onClick={() => fileInputRef1.current.click()}
                ><i aria-hidden="true" className="file icon"></i>Choose File</button>
                
                <input
                  ref={fileInputRef2}
                  name = "fileInput2"
                  type="file"
                  onChange={fileChange}
                />
                 <button
                  name = "fileBtn"
                  className="ui icon left labeled button"
                  labelposition="left"
                  icon="file"
                  onClick={() => fileInputRef2.current.click()}
                ><i aria-hidden="true" className="file icon"></i>Choose File</button>
              </Form.Field>
              <button type="submit">Upload</button>

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
