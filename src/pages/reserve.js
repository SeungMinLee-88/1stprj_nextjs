import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ReserveCalendar from "./reserveCalendar";

/* import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css"; */

export default function Reserve() {
        return(
        <div>      
        <ReserveCalendar />
        </div>
    )
}