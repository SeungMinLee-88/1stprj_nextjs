import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";

export default function ReserveCalendar() {
    const today = new Date();
    const fullMonth = (today.getMonth() + 1).toString().padStart(2, '0');
    console.log('today.getMonth() : ' + today.getMonth());
    console.log('fullMonth : ' + fullMonth);
    /* fullMonth = fullMonth.length === 1 ? "0" : fullMonth; */
    const [reqYear, setReqYear] = useState("");
    const [reqMonth, setReqMonth] = useState("");
    const [year, setYear] = useState(reqYear ? reqYear : today.getFullYear());
    const [month, setMonth] = useState(reqMonth ? reqMonth : fullMonth);
    const [strYear, setStrYear] = useState(reqYear);
    const [strMonth, setstrMonth] = useState(reqMonth);
    const [date, setDate] = useState(today.toISOString().split('T')[0]);
    const [curMonth, setCurmonth] = useState(today.getMonth());
    const [dayWeek, setEayWeek] = useState(WeekOfDay(year, month));
    const [endDay, setEndDay] = useState(LastDayOfMonth(today.getFullYear(), today.getMonth()));
    const myDate = new Date();
    myDate.setFullYear(2025);
    myDate.setMonth(3);
    myDate.setDate(1);
    
        
    function WeekOfDay(Year, Month) {
        const weekOfDay = new Date();
        weekOfDay.setFullYear(Year);
        weekOfDay.setMonth(Month);
        weekOfDay.setDate(1);
        return weekOfDay.getDate();
    }
    
    function LastDayOfMonth(Year, Month) {
        return new Date((new Date(Year, Month, 1)) - 1).getDate();
    }
      
    
    const calendarComponentRef = React.createRef();
    const [state, setState] = useState({
    events: [
      { id: 1, title: "event 1", date: "2025-04-01" },
      {
        title: "event 2",
        start: "2025-04-01",
        end: "2025-04-05",
        allDay: true,
        HostName: "William"
      },
      {
        title: "event 3",
        start: "2025-04-05",
        end: "2025-04-07",
        allDay: true
      },
      {
        title: "event 4",
        start: "2025-04-05",
        end: "2025-04-07",
        allDay: true
      },
      {
        title: "event 5",
        start: "2025-04-05",
        end: "2025-04-07",
        allDay: true
      },
      {
        title: "event 6",
        start: "2025-04-05",
        end: "2025-04-07",
        allDay: true
      }
    ]
  });

      console.log("LastDayOfMonth : " + LastDayOfMonth(2025, 2))
    
    console.log('today.getDay() : ' + today.getDay());
    console.log("month : " + month);
    console.log("dayWeek : " + dayWeek);
    console.log("endDay : " + endDay);
    
    const handleDateClick = (arg) => {
        return alert(arg.dateStr);
      };
      
      const handleSelectedDates = info => {
        alert("selected " + info.startStr + " to " + info.endStr);
        const title = prompt("What's the name of the title");
        console.log(info);
        if (title != null) {
          const newEvent = {
            title,
            start: info.startStr,
            end: info.endStr
          };
          const data = [...state.events, newEvent];
          setState({ events: data });
          console.log("here", data);
        } else {
          console.log("nothing");
        }
      };
    
    return(
        <div>      
        <FullCalendar
          schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
          ref={calendarComponentRef}
          defaultView="dayGridMonth"
          dateClick={handleDateClick}
          displayEventTime={true}
          header={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
          }}
          selectable={true}
          plugins={[
            dayGridPlugin,
            interactionPlugin,
            timeGridPlugin,
            resourceTimeGridPlugin
          ]}
          eventClick={event => {
            console.log(event.event._def.publicId);
          }}
          events={state.events}
          select={handleSelectedDates}
          eventLimit={3}
        />
        </div>
    )
}