import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { flushSync } from 'react-dom';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import { INITIAL_EVENTS, createEventId } from './event-utils'


export default function ReserveCalendar({initialData, reserveData}) {
  var moment = require('moment');
  console.log("ReserveCalendar reserveData : " + JSON.stringify(reserveData));
  //const [reserveDataList, setReserveDataList] = useState("aaa");
  
  const [reserveDataList, setReserveDataList] = useState(reserveData);
  const [testdata, settestdata] = useState(initialData);
  const reseveArray = reserveData;
  const [weekendsVisible, setWeekendsVisible] = useState(true)
  const [currentEvents, setCurrentEvents] = useState([]);

  //const  [testEvent, setTestState] = useState({events: [reserveData.reserveData]});
  const  [testEvent, setTestState] = useState({
    events: [
      [reserveData.reserveData]
  ]
});
console.log("ReserveCalendar testEvent : " + JSON.stringify(testEvent));
/* 
  reserveData.map((reserve) => (
    console.log("reserve :" + reserve)
  )); */
  console.log("reserveDataList 1111 : " + JSON.stringify(reserveDataList));
  console.log("testdata 1111 : " + JSON.stringify(testdata));
  
  function setData(){
      setReserveDataList("bbb");
  }
  useEffect(() => {
    console.log("ReserveCalendar reserveData 22222: : " + JSON.stringify(reserveData.reserveData));
    setReserveDataList(reserveData);
    }, []);
  
    console.log("reserveDataList excp : " + JSON.stringify(reserveDataList));
    
    function handleWeekendsToggle() {
      setWeekendsVisible(!weekendsVisible)
    }

    function handleDateSelect(selectInfo) {
      let title = prompt('Please enter a new title for your event')
      let calendarApi = selectInfo.view.calendar
  
      calendarApi.unselect() // clear date selection
  
      if (title) {
        calendarApi.addEvent({
          id: createEventId(),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay
        })
      }
    }
  
    function handleEventClick(clickInfo) {
      if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
        clickInfo.event.remove()
      }
    }
    function handleEvents(events) {
      setCurrentEvents(events)
    }

    console.log("todayStr : " +  new Date().toISOString().replace(/T.*$/, '') + 'T13:00:00');
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
		startDate= startDate.format("YYYY-MM-DD");
		endDate= endDate.format("YYYY-MM-DD");   

      };
      
      function renderEventContent(eventInfo) {
        return (
          <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
          </>
        )
      }
      
      const eventTimeFormat = [{
        year: '0-digit',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }]

    
    
    return(
        <div>
          {console.log("reserveData inreturn : " + JSON.stringify({events: [reserveData.reserveData]}))}
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
          /* initialEvents={INITIAL_EVENTS} */
          initialEvents={{"events":[{"id":37,"title":"11","start":"2025-04-01T10:00:00","allDay":false}]}}
        
        /* events={{
          events: [
    { id: 1, title: "event 1", date: "2025-04-01" },
    {
      title: "event 2",
      start: "2025-04-01",
      end: "2025-04-05",
      allDay: true,
      HostName: "William"
    }]
      }} */
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          eventsSet={handleEvents} // called after events are initialized/added/changed/removed
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
        <div className="ui checkbox">
          <input type="checkbox" className="hidden" readOnly="" tabIndex="0"/><label>09:00 ~ 10:00</label>
          <input type="checkbox" className="hidden" readOnly="" tabIndex="0"/><label>09:00 ~ 10:00</label>
          <input type="checkbox" className="hidden" readOnly="" tabIndex="0"/><label>09:00 ~ 10:00</label>
          <input type="checkbox" className="hidden" readOnly="" tabIndex="0"/><label>09:00 ~ 10:00</label>
        </div>
        

        </div>
    )
}