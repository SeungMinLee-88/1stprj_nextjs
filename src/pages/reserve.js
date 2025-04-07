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
    const [reserveData, setreserveData] = useState("/");
    
    function getData() {
        Axios.get(`http://localhost:8090/reserve/reservelist`, {
          headers: {
            "Content-Type": "application/json", 
            access: localStorage.getItem("access") 
          },
          params: {
            reserveDate: 202504
          },
        }
      ).then((response, error) => {
          //console.log("response.data : " + JSON.stringify(response.data));
          
        }).catch(function (error) {
/*         console.log("error.response.data : " + error.response.data);
        console.log("error.response.status : " + error.response.status);
        console.log("error.response.headers : " + JSON.stringify(error.response.headers)); */
        });
    }
            
    useEffect(() => {
        getData();
      }, [reserveData]);
    
        return(
        <div>      
        <ReserveCalendar />
        </div>
    )
}