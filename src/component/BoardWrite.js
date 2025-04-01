import React from "react";
import Axios from "axios";
import { useRouter } from "next/navigation";
import { FormGroup, FormField, Form } from 'semantic-ui-react'

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
]

export default function BoardWrite({ changeGoUrl }) {
  const router = useRouter();

    return (
      <div>
        <Form onSubmit={async evt=>{
          evt.preventDefault();
          const boardWriter = evt.target.boardWriter.value;
          const boardPass = evt.target.boardPass.value;
          const boardTitle = evt.target.boardTitle.value;
          const boardContents = evt.target.boardContents.value;
          const resp = await Axios.put(`${process.env.NEXT_PUBLIC_API_URL}/save`, {
            boardWriter: boardWriter,
            boardPass: boardPass,
            boardTitle: boardTitle,
            boardContents: boardContents
          })
          .then(function (response) {
            console.log("response.data : " + JSON.stringify(response.data));
          /* const board = await resp.json(); */
          router.push(`/board/detail/${response.data.id}`);
          //router.refresh();
          })
          .catch(function (error) {
            console.log(error);
          });

        }}>
          <FormGroup widths='equal'>
          <FormField>
          <label>First Name</label>
          <input name='boardWriter' />
          </FormField>
          <FormField>
          <label>First Name</label>
          <input name='boardPass' />
          </FormField>
          <FormField>
          <label>First Name</label>
          <input name='boardTitle' />
          </FormField>
          <FormField>
          <label>First Name</label>
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
          <button type="submit" class="ui button">Write</button>
        </Form>
      <button class="ui button" onClick={() => changeGoUrl("/")}>List</button>
      </div>
    );
}
