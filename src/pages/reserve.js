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
            reserveDate: 20250401
          },
        }
      ).then((response, error) => {
        console.log("response.data[0] : " + JSON.stringify(response.data[0]));
         /*  console.log("response.data[0] : " + JSON.stringify(response.data[0]));
          console.log("response.data[0] : " + response.data[0]);
          console.log("=====================================================");
          console.log("response.data : " + JSON.stringify(response.data[0]["id"]));
          
          console.log("response reserveDate : " + moment(response.data[0]["reserveDate"]).format("YYYY-MM-DD"));
          console.log("=====================================================");
          
          //start: moment(response.data[0]["reserveDate"]).format("YYYY-MM-DD")+"T"+response.data[0]["reserveTime"][0]["time"]["time"]+":00:00",
          console.log("response.data length : " + response.data.length) */
          console.log("moment : " + moment(response.data[0]["reserveDate"]).format("YYYY-MM-DD")+"T"+response.data[0]["reserveTime"][0]["time"]["time"]+":00:00");
          for (var responseKey in response.data) {
            //console.log("responseKey[responseKey] :" + JSON.stringify(response.data[responseKey]["reserveTime"]));
            for (var timeKey in response.data[responseKey]["reserveTime"]) {
              reserveTotalList.push(
                {
                    id: response.data[responseKey]["id"],
                    title: response.data[responseKey]["reserveReason"],
                    reserveReason: response.data[responseKey]["reserveReason"],
                    reserveDate: response.data[responseKey]["reserveDate"],
                    hallId: response.data[responseKey]["hallId"],
                    reservePeriod: response.data[responseKey]["reservePeriod"],
                    start: moment(response.data[responseKey]["reserveDate"]).format("YYYY-MM-DD")+"T"+response.data[responseKey]["reserveTime"][timeKey]["time"]["time"]+":00:00",
                    end: moment(response.data[responseKey]["reserveDate"]).format("YYYY-MM-DD")+"T"+response.data[responseKey]["reserveTime"][timeKey]["time"]["time"]+":00:00",
                    time: response.data[responseKey]["reserveTime"][timeKey]["time"]["time"],
                    userId: response.data[responseKey]["userId"],
                    allDay: false
                  }
                );
            }
          }
          for (var timeKey in response.data[0]["reserveTime"]) {
            //console.log("timeKey loop");
            reserveList.push(
              {
                  id: response.data[0]["id"],
                  reserveReason: response.data[0]["id"],
                  title: response.data[0]["reserveReason"],
                  start: moment(response.data[0]["reserveDate"]).format("YYYY-MM-DD")+"T"+response.data[0]["reserveTime"][0]["time"]["time"]+":00:00",
                  end: moment(response.data[0]["reserveDate"]).format("YYYY-MM-DD")+"T"+response.data[0]["reserveTime"][0]["time"]["time"]+":00:00",
                  time: response.data[0]["reserveTime"][timeKey]["time"]["time"],
                  allDay: false
                }
              );
            for (var key in response.data[0]) {
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
        setreserveData(reserveTotalList);
        }).catch(function (error) {
        });
    }
    console.log("reserveData : " + JSON.stringify(reserveTotalList));
   // console.log("reserveData[0].events : " + JSON.stringify(reserveData.events));
   const [selectDate, setSelectDate] = useState("");
   const [formMode, setFormMode] = useState("");
    useEffect(() => {
        getData();
        console.log("times 222 : " + JSON.stringify(times));
      }, []);
      
      
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
        setFormMode("reserve");
        console.log("SelectDate : " + selectDate);
        setisVisible(true);
      }
      const handleEventClick  = (arg) => {
        //return alert(arg.dateStr);
        console.log("arg id : " + JSON.stringify(arg.event.id));
        console.log("arg title : " + JSON.stringify(arg.event.title));
        console.log("arg reserveReason : " + JSON.stringify(arg.event.extendedProps.reserveReason));
        console.log("arg reserveDate : " + JSON.stringify(arg.event.extendedProps.reserveDate));
        console.log("arg userId : " + JSON.stringify(arg.event.extendedProps.userId));
        console.log("arg hallId : " + JSON.stringify(arg.event.extendedProps.hallId));
        console.log("arg reservePeriod : " + JSON.stringify(arg.event.extendedProps.reservePeriod));
        
      };
        return(
        <div>
        {isVisible && (
      <ReserveForm visible={isVisible} selectDate={selectDate} formMode={formMode} />
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
      eventClick={handleEventClick}
      editable={false}
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