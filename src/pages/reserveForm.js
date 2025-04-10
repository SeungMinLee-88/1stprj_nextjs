import React from "react";
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Axios from "axios";
import pkg from 'semantic-ui-react/package.json'
import { Checkbox, Segment } from 'semantic-ui-react' 

export default function ReserveForm({ selectDate }) {
  console.log("ReserveForm selectDate : " + JSON.stringify(selectDate));
   const [getDate, setgetDate] = useState(selectDate);
   const [time, setTime] = useState([
  { id:'1', time:'9' },
  { id:'2', time:'10' },
  { id:'3', time:'11' },
  { id:'4', time:'13' },
  { id:'5', time:'14' },
  { id:'6', time:'15' },
  { id:'7', time:'16' },
  { id:'8', time:'17' },
]);

async function getData() {
  console.log("ReserveForm call getData");
  await Axios.get(`http://localhost:8090/reserve/reserveTimeList`, {
      headers: {
        "Content-Type": "application/json", 
        access: localStorage.getItem("access") 
      },
      params: {
        reserveDate: selectDate
      },
    }
  ).then((response, error) => {
    console.log("response.data : " + JSON.stringify(response));
  }).catch(function (error) {
    console.log("error : " + JSON.stringify(error));

  });
}
  
useEffect(() => {
    getData();
  }, );
   
       console.log("time : " + JSON.stringify(time));
   return(
<div>
  
<div className="ui compact segment">
  <div className="ui fitted checkbox">
    <input type="checkbox" className="" readOnly="" tabIndex="0"/>
    <label>
    </label>
  </div>
</div>
      
<div className="ui compact segment">
  <div className="ui fitted checkbox">
    <input type="checkbox" className="" readOnly="" tabIndex="0"/>
    <label>
    </label>
  </div>
</div>
<div style={{display: 'flex'}}>
{time.map((times) => (
/*   <div>
        <li key={times.id}>
          {times.id}
        </li>
        <li>
          {times.time}
        </li>
        </div> */
       
    <div key={times.id} className="ui compact segment">
        <div className="ui fitted checkbox">
          <input type="checkbox" className="" readOnly="" tabIndex={times.id}/>
          <label>
          </label>
          </div>
      </div>

      ))}
</div>

  </div>

)
  }