import React from "react";
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Axios from "axios";
import { Checkbox, Segment, FormGroup, FormField, Form  } from 'semantic-ui-react' 


export default function ReserveForm({ selectDate, reserveDetailId, formMode }) {
  console.log("call ReserveForm");
  console.log("ReserveForm selectDate : " + JSON.stringify(selectDate));
  console.log("ReserveForm reserveDetailId : " + JSON.stringify(reserveDetailId));
  console.log("ReserveForm formMode : " + JSON.stringify(formMode));
  const [getDate, setgetDate] = useState(selectDate);
  const [reserveTimes, setReserveTimes] = useState([]);
  const [reserveDetail, setReserveDetail] = useState([]);
  const [reserveDetailTimes, setReserveDetailTimes] = useState([]);

async function getData() {
  console.log("ReserveForm call getData");
  console.log("selectDate " + selectDate);
  const reserveTimeList = [];
  await Axios.get(`http://localhost:8090/reserve/timeList`, {
      headers: {
        "Content-Type": "application/json", 
        access: localStorage.getItem("access") 
      },
      params: {
        reserveDate: selectDate
      },
    }
  ).then((response, error) => {
    setgetDate(selectDate)
    console.log("response.data : " + JSON.stringify(response.data));
/*     for (var responseKey in response.data) {
      reserveTimeList.push(response.data[responseKey]["timeId"]);
    } */
    
    setReserveTimes(response.data);
  }).catch(function (error) {
    console.log("error : " + JSON.stringify(error));

  });
}
const reserveDetailList = [];
const reserveDetailTimeList = [];
const initialTasks = [];
async function getDetailData() {
  console.log("ReserveForm call getData");
  console.log("selectDate " + selectDate);
  const reserveTimeList = [];
  await Axios.get(`http://localhost:8090/reserve/reserveDetail/${reserveDetailId}`, {
      headers: {
        "Content-Type": "application/json", 
        access: localStorage.getItem("access") 
      },
      params: {
      },
    }
  ).then((response, error) => {
    //console.log("getDetailData : " + JSON.stringify(response.data));
    
    setReserveDetail(
      {
        id : response.data["id"],
        reserveReason : response.data["reserveReason"],
        reserveDate : response.data["reserveDate"],
        userId : response.data["userId"],
        hallId : response.data["hallId"],
        reservePeriod : response.data["reservePeriod"]
      }
    )

    
    for (var responseKey in response.data) {
      //console.log(responseKey + " : responseKey[responseKey] :" + JSON.stringify(response.data[responseKey]));
      //console.log("reserveTime :" + JSON.stringify(response.data["reserveTime"]));
      //console.log("responseKey[responseKey] :" + JSON.stringify(response.data[responseKey]["reserveTime"]));
      
      if(responseKey === "reserveTime"){
        for (var timeKey in response.data["reserveTime"]) {
          console.log("reserveTime timeKey time : " +  timeKey + " : " + JSON.stringify(response.data[responseKey][timeKey]["time"]));
          reserveDetailTimes.push(response.data[responseKey][timeKey]["time"]["id"]
          )   
        }
      }
    }

  }).catch(function (error) {
    console.log("error : " + JSON.stringify(error));
  });
}

console.log("reserveDetail : " + JSON.stringify(reserveDetail));
console.log("reserveDetailTimes : " + JSON.stringify(reserveDetailTimes));
useEffect(() => {
  getData();
  formMode === "update" ? getDetailData() : "";
}, [selectDate, reserveDetailId], formMode);

       console.log("reserveTimes : " + JSON.stringify(reserveTimes));
       reserveTimes.map((reserveTime) => (
        reserveTime.reserved == true ? console.log(true) : console.log(false)
      ));
    
    const [times, dispatch] = React.useReducer(reserveTimeReducer, reserveDetailTimes)
    const [saveTimes, setSaveTimes] = useState([]);
    function reserveTimeReducer(times, action) {
      console.log("action : " + JSON.stringify(action))
      
      switch (action.type) {
        case 'CHECK':
          console.log("times CHECK : " + JSON.stringify(times))
          return [...times, action.timeId];
        case 'UNCHECK':
          console.log("times UNCHECK : " + JSON.stringify(times))
          return times.filter(t => t !== action.timeId);
        default:
          throw new Error()
      }
    }
    const handleTimeChange = (e) => {
      console.log("checked : " + e.target.checked);
      console.log("tabIndex : " + e.target.tabIndex);
      var actionType = "";
      actionType="testset";
      e.target.checked ? actionType = "CHECK" : actionType = "UNCHECK";
      dispatch({ type: actionType, timeId: e.target.tabIndex})
    }
    console.log("times : " + JSON.stringify(times));
    const [saveReserve, setSaveReserve] = useState([
      { reserveReason: '', reserveDate: '' ,userId: '', hallId: '', time: [], reservePeriod: '' }
    ]);
    const router = useRouter();

    console.log("formMode : " + formMode);
  
   return(
<div>
<div style={{display: 'flex'}}>
{reserveTimes.map((reserveTime) => (
      <div key={reserveTime.id} className="ui compact segment" style={{margin: '0'}}>
          {!reserveTime.reserved ?
          <div className="ui fitted checkbox">
            <input type="checkbox" className="" readOnly="" tabIndex={reserveTime.id} onChange={handleTimeChange}/>
            <label>
            </label>
            </div>
            : reserveTime.userId === "1" && formMode === "update" ? <input type="checkbox" className="" defaultChecked readOnly="" tabIndex={reserveTime.id} onChange={handleTimeChange}/> : <input type="checkbox" className="" disabled  readOnly="" tabIndex={reserveTime.id}/>
          }
          {console.log("reserveTime.userId : " + reserveTime.userId)}
        </div>
    /* )) */

      ))}
      

</div>

          <Form onSubmit={async evt=>{
            console.log("call onSubmit");
          //if(formMode === "update") return;
          evt.preventDefault();
          const reserveId = evt.target.reserveId.value;
          const reserveReason = evt.target.reserveReason.value;
          const reserveDate = evt.target.reserveDate.value;
          const userId = evt.target.userId.value;
          const username = evt.target.username.value;
          const hallId = evt.target.hallId.value;
          const reserveTimeSave = times;
          const reservePeriod = times.length;
          console.log("reserveTimeSave : " + reserveTimeSave);
          //return;
          if(formMode === "reserve"){
            const resp = await Axios.put(`http://localhost:8090/reserve/save`, {
              reserveReason: reserveReason,
              reserveDate: reserveDate,
              userId: userId,
              username: username,
              hallId: hallId,
              reserveTimeSave: reserveTimeSave,
              reservePeriod: reservePeriod
            })
            .then(function (response) {
              console.log("response.data : " + JSON.stringify(response.data));
            /* const board = await resp.json(); */
            // router.push(`/reserve`);
            //router.refresh();
            })
            .catch(function (error) {
              console.log(error);
            });
        }else if(formMode === "update"){
          const resp = await Axios.post(`http://localhost:8090/reserve/update`, 
            {
              id: reserveId,
              reserveReason: reserveReason,
              reserveDate: reserveDate,
              userId: userId,
              hallId: hallId,
              reserveTimeSave: reserveTimeSave,
              reservePeriod: reservePeriod
            })
            .then(function (response) {
              console.log("response.data : " + JSON.stringify(response.data));
            })
            .catch(function (error) {
              console.log(error);
            });
          }

        }}>
          <FormGroup widths='equal'>
          <FormField>
          <label>reserveId</label>
          <input name='reserveId' value={reserveDetail.id} onChange={e => setReserveDetail(e.target.value)} />
          </FormField>
          <FormField>
          <label>reserveReason</label>
          <input name='reserveReason' value={reserveDetail.reserveReason} onChange={e => setReserveDetail(e.target.value)} />
          </FormField>
          <FormField>
          <label>reserveDate</label>
          <input name='reserveDate' value={reserveDetail.reserveDate} onChange={e => setReserveDetail(e.target.value)}  />
          </FormField>
          <FormField>
          <label>userId</label>
          <input name='userId' value={reserveDetail.userId}  onChange={e => setReserveDetail(e.target.value)}/>
          </FormField>
          <FormField>
          <label>username</label>
          <input name='username' value={reserveDetail.username}  onChange={e => setReserveDetail(e.target.value)}/>
          </FormField>
          <FormField>
          <label>hallId</label>
          <input name='hallId' value={reserveDetail.hallId} onChange={e => setReserveDetail(e.target.value)} />
          </FormField>
          <FormField>
          <label>reservePeriod</label>
          <input name='reservePeriod' value={times.length} />
          </FormField>
          </FormGroup>
          {formMode === "reserve" ? <button type="submit" className="ui button">reserve</button> 
          : <button type="submit" className="ui button">update</button>}
          
          </Form>
  </div>

)
  }
  
  /* timeItems = (
    <div>
    <div style={{display: 'flex'}}>
    {reserveTimes.map((reserveTime) => (
          <div key={reserveTime.id} className="ui compact segment" style={{margin: '0'}}>
              {reserveTime.reserved == true ?
              <div className="ui fitted checkbox">
                <input type="checkbox" className="" readOnly="" tabIndex={reserveTime.id} onChange={handleTimeChange}/>
                <label>
                </label>
                </div>
                : <input type="checkbox" className="" disabled  readOnly="" tabIndex={reserveTime.id}/>
              }
            </div>
          ))}
    </div>
      </div>
    ); */