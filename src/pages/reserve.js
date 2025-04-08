import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Axios from "axios";
import ReserveCalendar from "./reserveCalendar";

/* import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css"; */

export default function Reserve() {
    const [reserveData, setreserveData] = useState("");
    var moment = require('moment');
    
    function getData() {
        Axios.get(`http://localhost:8090/reserve/reservelist`, {
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
          console.log("=====================================================");
          console.log("response.data : " + JSON.stringify(response.data[0]["id"]));
          
          console.log("reserveDate : " + moment(response.data[0]["reserveDate"]).format("YYYY-MM-DD"));
          console.log("=====================================================");
          //console.log("response.data : " + JSON.stringify(response.data));
          
          //start: moment(response.data[0]["reserveDate"]).format("YYYY-MM-DD")+"T"+response.data[0]["reserveTime"][0]["time"]["time"]+":00:00",
          setreserveData(
            {
              id: response.data[0]["id"],
              title: response.data[0]["reserveReason"],
              start: moment(response.data[0]["reserveDate"]).format("YYYY-MM-DD")+"T"+response.data[0]["reserveTime"][0]["time"]["time"]+":00:00",
              allDay: false
            },
            {
              id: 'response.data[0]["id"]',
              title: response.data[0]["reserveReason"],
              start: moment(response.data[0]["reserveDate"]).format("YYYY-MM-DD")+"T"+response.data[0]["reserveTime"][0]["time"]["time"]+":00:00",
              allDay: false
            }
          );
/*           setreserveData("12312312"); */
          console.log("Reserve reserveData : " + JSON.stringify(reserveData));
          
        }).catch(function (error) {
/*         console.log("error.response.data : " + error.response.data);
        console.log("error.response.status : " + error.response.status);
        console.log("error.response.headers : " + JSON.stringify(error.response.headers)); */
        });
    }
            
    useEffect(() => {
        getData();
      }, []);
      console.log("Reserve reserveData except func : " + JSON.stringify(reserveData));
        return(
        <div>      
        <ReserveCalendar reserveData={reserveData}  key={"111"} />
        </div>
    )
}