import React from "react";
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Axios from "axios";
import ReserveCalendar from "./reserveCalendar";

/* import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css"; */


const initialTasks = {
  events: [
    { id: 1, title: "event 1", date: "2025-04-03" },
    {
      id: 2,
      title: "event 2",
      start: "2025-04-05",
      end: "2025-04-05",
      allDay: true,
      HostName: "William"
    },
    {
      id: 3,
      title: "event 3",
      start: "2025-04-08",
      end: "2025-04-08",
      allDay: true
    },
    {
      id: 4,
      title: "event 4",
      start: "2025-04-11",
      end: "2025-04-11",
      allDay: true
    }
  ]}
;
export default function Reserve() {
    const [reserveData, setreserveData] = useState({
      events: [
        { id: 1, title: "event 1", date: "2025-04-03", time: "11111" }]
      });
    const [reserveDataList, setreserveDataList] = useState("");
    var moment = require('moment');
    
    async function getData() {
      await Axios.get(`http://localhost:8090/reserve/reservelist`, {
          headers: {
            "Content-Type": "application/json", 
            access: localStorage.getItem("access") 
          },
          params: {
            reserveDate: 20250401
          },
        }
      ).then((response, error) => {
          console.log("response.data[0] : " + JSON.stringify(response.data[0]));
          console.log("response.data[0] : " + response.data[0]);
          console.log("=====================================================");
          console.log("response.data : " + JSON.stringify(response.data[0]["id"]));
          
          console.log("response reserveDate : " + moment(response.data[0]["reserveDate"]).format("YYYY-MM-DD"));
          console.log("=====================================================");
          
          //start: moment(response.data[0]["reserveDate"]).format("YYYY-MM-DD")+"T"+response.data[0]["reserveTime"][0]["time"]["time"]+":00:00",
          console.log("response.data length : " + response.data.length)
          
          var validation_messages = {
            "key_1": {
                "your_name": "jimmy",
                "your_msg": "hello world"
            },
            "key_2": {
                "your_name": "billy",
                "your_msg": "foo equals bar"
            }
        }
          for (var key in validation_messages) {
            // skip loop if the property is from prototype
            if (!validation_messages.hasOwnProperty(key)) continue;
        
            var obj = validation_messages[key];
            for (var prop in obj) {
                // skip loop if the property is from prototype
                if (!obj.hasOwnProperty(prop)) continue;
        
                // your code
                console.log(prop + " = " + obj[prop]);
            }
        }
          
          /* for (var i in response.data[0]) {
            console.log("response.data[i] : " + response.data[0][i]);
              response.data[0][i].reserveTime.map((time) => (
              console.log("res.time : " + time.id)
            ));
          } */
          
          for (var key in response.data[0]) {
            setreserveData({
              events: [{
                id: response.data[0]["id"],
                title: response.data[0]["reserveReason"],
                start: moment(response.data[0]["reserveDate"]).format("YYYY-MM-DD")+"T"+response.data[0]["reserveTime"][0]["time"]["time"]+":00:00",
                end: moment(response.data[0]["reserveDate"]).format("YYYY-MM-DD")+"T"+response.data[0]["reserveTime"][0]["time"]["time"]+":00:00",
                time: '0',
                allDay: false
              }]}) 
            
            // skip loop if the property is from prototype
            if (!response.data[0].hasOwnProperty(key)) continue;
            //console.log("response for key : " + key);
            console.log("response for key : " + key + " || response.data[0][key] :" + response.data[0][key]);
            
            if(key === "reserveTime"){
              for (var timeKey in response.data[0][key]) {
                console.log("timeKey : " + timeKey + " || response.data[0][timeKey] :" + response.data[0][key][timeKey]["time"]);
                for (var timeKeytimes in response.data[0][key][timeKey]["time"]) {
                  if(timeKeytimes === "time"){
                    console.log("timeKeytimes : " + timeKeytimes + " || response.data[0][timeKeytimes] :" + response.data[0][key][timeKey][timeKeytimes]["time"]);
                    setreserveData({
                      ...reserveData,
                      events: [{
                        ...reserveData.events,
                        time: 2
                      }]
                    });
                  }
                }
                /* for (var timeKeyId in response.data[0][key][timeKey]) {
                  console.log("timeKeyId : " + timeKeyId + " || response.data[0][timeKeyId] :" + response.data[0][key][timeKey][timeKeyId]);
                  
                    if(timeKeyId === "time"){
                      //console.log("time :" + response.data[0][key][timeKey][timeKeyId]);
                      setreserveData({
                        ...reserveData,
                        events: {
                          ...reserveData.events,
                          time: 3
                        }
                      });
                    }
                } */
              }
            }
            
            /* var obj = response.data[0][key]; */
            /* for (var prop in obj) {
                // skip loop if the property is from prototype
                if (!obj.hasOwnProperty(prop)) continue;
        
                // your code
                //console.log("response for : " + prop + " = " + obj[prop]);
            } */
        }
          
          /* response.data.map((res) => (
            //console.log("res : " + res.id)
            res.reserveTime.map((time) => (
              console.log("res.time : " + time.id)
            ))
          )); */
          /* setreserveData({
            events: [{
              id: response.data[0]["id"],
              title: response.data[0]["reserveReason"],
              start: moment(response.data[0]["reserveDate"]).format("YYYY-MM-DD")+"T"+response.data[0]["reserveTime"][0]["time"]["time"]+":00:00",
              end: moment(response.data[0]["reserveDate"]).format("YYYY-MM-DD")+"T"+response.data[0]["reserveTime"][0]["time"]["time"]+":00:00",
              allDay: false
            },
            {
              id: "22",
              title: "222",
              start: moment(response.data[0]["reserveDate"]).format("YYYY-MM-DD")+"T"+response.data[0]["reserveTime"][0]["time"]["time"]+":00:00",
              end: moment(response.data[0]["reserveDate"]).format("YYYY-MM-DD")+"T"+response.data[0]["reserveTime"][0]["time"]["time"]+":00:00",
              allDay: false
            }]}
          ); */
          //console.log("response.data : " + JSON.stringify(response.data));
          
          //start: moment(response.data[0]["reserveDate"]).format("YYYY-MM-DD")+"T"+response.data[0]["reserveTime"][0]["time"]["time"]+":00:00",
          
/*           setreserveData("12312312"); */
          
          
        }).catch(function (error) {
/*         console.log("error.response.data : " + error.response.data);
        console.log("error.response.status : " + error.response.status);
        console.log("error.response.headers : " + JSON.stringify(error.response.headers)); */
        });
    }
    console.log("Reserve initialTasks : " + JSON.stringify(initialTasks));
    console.log("reserveData : " + JSON.stringify(reserveData));
    console.log("reserveData[0].events : " + JSON.stringify(reserveData.events));
    
    const  [testEvent, setTestState] = useState({
        events: [
          {"id":1,"title":"event 1","date":"2025-04-01"},{"id":2,"title":"event 2","start":"2025-04-01","end":"2025-04-05","allDay":true,"HostName":"William"},{"id":3,"title":"event 3","start":"2025-04-05","end":"2025-04-07","allDay":true},{"id":4,"title":"event 4","start":"2025-04-05","end":"2025-04-07","allDay":true}]
      
    });
    
    useEffect(() => {
        getData();
      }, []);
      
      function handleTime(e) {
        setreserveData({
          ...reserveData,
          events: [{
            ...reserveData.events,
            time: e.target.value
          }]
        });
      }
      
      console.log("Reserve reserveData except func : " + JSON.stringify(reserveData));
      console.log("Reserve reserveData except func : " + JSON.stringify(reserveData));
        return(
        <div>
          <label>
        City:
        <input
          value={reserveData.events[0].time}
          onChange={handleTime}
        />
      </label>
        {/* <ReserveCalendar initialData ={"aaa"} reserveData={reserveData}  key={"111"} /> */}
        {/* <Avatar reserveData={reserveData} setreserveData={setreserveData} /> */}

        <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      }}
      initialView='dayGridMonth'
      editable={true}
      selectable={true}
      selectMirror={true}
      dayMaxEvents={true}
      weekends={true}
      events={reserveData}
      eventTimeFormat={{
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }}
      displayEventEnd={true}
      /* you can update a remote database when these fire:
      eventAdd={function(){}}
      eventChange={function(){}}
      eventRemove={function(){}}
      */
    />
        
        </div>
    )
}
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
function Avatar({ reserveData }) {
  console.log("Avatar reserveData : " + JSON.stringify(reserveData[0].events));
   const [usertest, setusertest] = useState(reserveData[0].events);
   
       
   console.log("Avatar usertest : " + JSON.stringify(usertest));
   const reserveDataVal = {"events":[{"id":37,"title":"11","start":"2025-04-01T10:00:00","allDay":false}]};
   console.log("Avatar reserveDataVal : " + JSON.stringify(reserveData));
   return(
    <div>          
        {reserveData[0].events.map((reserve) => (
        <li key={reserve.id}>
          {reserve.id}
        </li>
      ))}
      {console.log("reserveDataList inreturn : " + JSON.stringify({events: [reserveData]}))}
         

    </div>
)
  }