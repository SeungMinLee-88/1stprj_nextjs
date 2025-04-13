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
    
    reserveDetailList.push(
      {
        id : response.data["id"],
        reserveReason : response.data["reserveReason"],
        reserveDate : response.data["reserveDate"],
        userId : response.data["userId"],
        hallId : response.data["hallId"],
        reservePeriod : response.data["reservePeriod"]
      }
    )
    setReserveDetail(reserveDetailList);

    
    for (var responseKey in response.data) {
      //console.log(responseKey + " : responseKey[responseKey] :" + JSON.stringify(response.data[responseKey]));
      //console.log("reserveTime :" + JSON.stringify(response.data["reserveTime"]));
      //console.log("responseKey[responseKey] :" + JSON.stringify(response.data[responseKey]["reserveTime"]));
      
      if(responseKey === "reserveTime"){
        for (var timeKey in response.data["reserveTime"]) {
          console.log("reserveTime timeKey " +  timeKey + " : " + JSON.stringify(response.data[responseKey][timeKey]));
          
          reserveDetailTimeList.push(
            response.data[responseKey][timeKey]["time"]
          )
              
  /*         console.log("reserveTime :" + JSON.stringify(response.data[responseKey][timeKey]));
          reserveDetailTimeList.push(
            {}
          ) */
        }
      }
    }
    
console.log("reserveDetailTimeList : " + JSON.stringify(reserveDetailTimeList));
   
  }).catch(function (error) {
    console.log("error : " + JSON.stringify(error));

  });
}

console.log("reserveDetail : " + JSON.stringify(reserveDetail));

useEffect(() => {
  getData();
  formMode === "update" ? getDetailData() : "";
}, [selectDate, reserveDetailId], formMode);
      /*  console.log("time : " + JSON.stringify(time));
       console.log("reserveTimes : " + JSON.stringify(reserveTimes)); */
       reserveTimes.map((reserveTime) => (
        reserveTime.reserved == true ? console.log(true) : console.log(false)
      ));
      const initialTasks = [];
    const [times, dispatch] = React.useReducer(reserveTimeReducer, initialTasks)
    const [saveTimes, setSaveTimes] = useState([]);
    function reserveTimeReducer(times, action) {
      console.log("action : " + JSON.stringify(action))
      switch (action.type) {
        case 'CHECK':
          return [...times, action.timeId];
        case 'UNCHECK':
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
            : <input type="checkbox" className="" disabled  readOnly="" tabIndex={reserveTime.id}/>
          }
          {console.log("call reserveTimes map")}
        </div>
    /* )) */

      ))}
</div>

          <Form onSubmit={async evt=>{
          evt.preventDefault();
          const reserveReason = evt.target.reserveReason.value;
          const reserveDate = evt.target.reserveDate.value;
          const userId = evt.target.userId.value;
          const hallId = evt.target.hallId.value;
          const reserveTimeSave = times;
          const reservePeriod = times.length;
          
          const resp = await Axios.put(`http://localhost:8090/reserve/save`, {
            reserveReason: reserveReason,
            reserveDate: reserveDate,
            userId: userId,
            hallId: hallId,
            reserveTimeSave: reserveTimeSave,
            reservePeriod: reservePeriod
          })
          .then(function (response) {
            console.log("response.data : " + JSON.stringify(response.data));
          /* const board = await resp.json(); */
          // router.push(`/reserve`);
          router.refresh();
          })
          .catch(function (error) {
            console.log(error);
          });

        }}>
          <FormGroup widths='equal'>
          <FormField>
          <label>reserveReason</label>
          <input name='reserveReason' value={reserveDetail.reserveReason} />
          </FormField>
          <FormField>
          <label>reserveDate</label>
          <input name='reserveDate' value={reserveDetail.reserveReason}  />
          </FormField>
          <FormField>
          <label>userId</label>
          <input name='userId' value={reserveDetail.userId}/>
          </FormField>
          <FormField>
          <label>hallId</label>
          <input name='hallId' value={reserveDetail.hallId} />
          </FormField>
          <FormField>
          <label>reservePeriod</label>
          <input name='reservePeriod' value={times.length} />
          </FormField>
          </FormGroup>
          <button type="submit" className="ui button">reserve</button>
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