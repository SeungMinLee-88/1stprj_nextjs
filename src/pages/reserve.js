import React from "react";
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Axios from "axios";
import ReserveCalendar from "./reserveCalendar";
import ReserveForm from "./reserveForm";

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
      start: "2025-04-01T10:00:00",
      end: "2025-04-01T11:00:00",
      allDay: false,
      HostName: "William"
    },
    {
      id: 3,
      title: "event 3",
      start: "2025-04-01T13:00:00",
      end: "2025-04-01T15:00:00",
      allDay: false
    },
    {
      id: 4,
      title: "event 4",
      start: "2025-04-01T16:00:00",
      end: "2025-04-01T17:00:00",
      allDay: false
    }
  ]}
;
const times = [];
const reserveList = [];
const reserveTotalList = [];
export default function Reserve() {
    const [reserveData, setreserveData] = useState([]);
    const [reserveDataList, setreserveDataList] = useState("");
    var moment = require('moment');

    async function getData() {
      await Axios.get(`http://localhost:8090/reserve/reservelist`, {
          headers: {
            "Content-Type": "application/json", 
            access: localStorage.getItem("access") 
          },
          params: {
            reserveDate: 202504
          },
        }
      ).then((response, error) => {
         /*  console.log("response.data[0] : " + JSON.stringify(response.data[0]));
          console.log("response.data[0] : " + response.data[0]);
          console.log("=====================================================");
          console.log("response.data : " + JSON.stringify(response.data[0]["id"]));
          
          console.log("response reserveDate : " + moment(response.data[0]["reserveDate"]).format("YYYY-MM-DD"));
          console.log("=====================================================");
          
          //start: moment(response.data[0]["reserveDate"]).format("YYYY-MM-DD")+"T"+response.data[0]["reserveTime"][0]["time"]["time"]+":00:00",
          console.log("response.data length : " + response.data.length) */
          
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
          
          console.log("moment : " + moment(response.data[0]["reserveDate"]).format("YYYY-MM-DD")+"T"+response.data[0]["reserveTime"][0]["time"]["time"]+":00:00");
          
          for (var responseKey in response.data) {
            //console.log("responseKey[responseKey] :" + JSON.stringify(response.data[responseKey]["reserveTime"]));
            for (var timeKey in response.data[responseKey]["reserveTime"]) {
              reserveTotalList.push(
                {
                    id: response.data[responseKey]["id"],
                    title: response.data[responseKey]["reserveReason"],
                    start: moment(response.data[responseKey]["reserveDate"]).format("YYYY-MM-DD")+"T"+response.data[responseKey]["reserveTime"][0]["time"]["time"]+":00:00",
                    end: moment(response.data[responseKey]["reserveDate"]).format("YYYY-MM-DD")+"T"+response.data[responseKey]["reserveTime"][0]["time"]["time"]+":00:00",
                    time: response.data[responseKey]["reserveTime"][timeKey]["time"]["time"],
                    allDay: false
                  }
                );
            }
          }

          for (var timeKey in response.data[0]["reserveTime"]) {
            //console.log("timeKey[timeKey] :" + response.data[0]["reserveTime"][timeKey]["time"]["time"]);
          }
          
          for (var timeKey in response.data[0]["reserveTime"]) {
            //console.log("timeKey loop");
            reserveList.push(
              {
                  id: response.data[0]["id"],
                  title: response.data[0]["reserveReason"],
                  start: moment(response.data[0]["reserveDate"]).format("YYYY-MM-DD")+"T"+response.data[0]["reserveTime"][0]["time"]["time"]+":00:00",
                  end: moment(response.data[0]["reserveDate"]).format("YYYY-MM-DD")+"T"+response.data[0]["reserveTime"][0]["time"]["time"]+":00:00",
                  time: response.data[0]["reserveTime"][timeKey]["time"]["time"],
                  allDay: false
                }
              );
            for (var key in response.data[0]) {

              //console.log("response.data loop");
              //console.log("for : " + JSON.stringify(reserveData));
              /* setreserveData(
                ...reserveData,
                [{
                  id: response.data[0]["id"],
                  title: response.data[0]["reserveReason"],
                  start: moment(response.data[0]["reserveDate"]).format("YYYY-MM-DD")+"T"+response.data[0]["reserveTime"][0]["time"]["time"]+":00:00",
                  end: moment(response.data[0]["reserveDate"]).format("YYYY-MM-DD")+"T"+response.data[0]["reserveTime"][0]["time"]["time"]+":00:00",
                  time: response.data[0]["reserveTime"][timeKey]["time"]["time"],
                  allDay: false
                }]
              ); */
              
              if (!response.data[0].hasOwnProperty(key)) continue;
              //console.log("response for key : " + key);
              //console.log("response for key : " + key + " || response.data[0][key] :" + response.data[0][key]);
              
  /*             if(key === "reserveTime"){
                for (var timeKey in response.data[0][key]) {
                  console.log("timeKey : " + timeKey + " || response.data[0][timeKey] :" + response.data[0][key][timeKey]["time"]);
                  for (var timeKeytimes in response.data[0][key][timeKey]["time"]) {
                    if(timeKeytimes === "time"){
                      console.log("timeKeytimes : " + timeKeytimes + " || response.data[0][timeKeytimes] :" + response.data[0][key][timeKey][timeKeytimes]["time"]);
                      times.push(response.data[0][key][timeKey][timeKeytimes]["time"]);
                    }
                  }
                }
              } */
          }
        }
        //console.log("reserveList : " + JSON.stringify(reserveList));
        //console.log("reserveTotalList : " + JSON.stringify(reserveTotalList));
        //console.log("reserveTotalList length : " + reserveTotalList.length);

        setreserveData(reserveTotalList);
          
        }).catch(function (error) {

        });
    }
    
    //console.log("reserveData : " + JSON.stringify(reserveData));
   // console.log("reserveData[0].events : " + JSON.stringify(reserveData.events));
   const [selectDate, setSelectDate] = useState("");
    useEffect(() => {
        getData();
        console.log("times 222 : " + JSON.stringify(times));
      }, [selectDate]);
      
      
      const [isVisible, setisVisible] = useState(true);
      const handleSelectedDates = info => {
        console.log("info : " + JSON.stringify(info));
        console.log("moment start : " + moment(info.start).format('YYYY-MM-DD'));
  
        var  startDate = moment(info.start);
        console.log("startDate : " + startDate);
        var endDate = moment(info.end);
        const date = startDate.clone();
        var isWeekend = false;
        
        while (date.isBefore(endDate)) {
          if (date.isoWeekday() == 6 || date.isoWeekday() == 7) {
            isWeekend = true;
          }
          date.add(1, 'day');
        }
        if (isWeekend) {
        alert('can\'t add event - weekend');
        return false;
        }
        setSelectDate(startDate.format('YYYYMMDD'));
        console.log("SelectDate : " + selectDate);
        setisVisible(true);
      }
      //console.log("Reserve reserveData except func : " + JSON.stringify(reserveData));
        return(
        <div>
{/*       <label>
        City:
        <input
          value={reserveData.events[0].time}
          onChange={handleTime}
        />
      </label> */}
        {/* <ReserveCalendar reserveData={reserveData} /> */}
        {isVisible && (
      <ReserveForm visible={isVisible} selectDate={selectDate} />
    )}
      
      <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      }}
      initialView='dayGridMonth'
      select={handleSelectedDates}
      editable={true}
      selectable={true}
      selectMirror={true}
      dayMaxEvents={true}
      weekends={true}
      events={{events: reserveData}}
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