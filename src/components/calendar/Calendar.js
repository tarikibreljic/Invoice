import React, { useEffect } from "react";
import Header from "../header/Header";
import { AiOutlineCalendar } from "react-icons/ai";
import { GrNext } from "react-icons/gr";
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
  Resize,
} from "@syncfusion/ej2-react-schedule";
// import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { useDispatch, useSelector } from "react-redux";
import { getInvoices } from "../../actions/InvoiceActions";
import { useNavigate } from "react-router-dom";

const Calendar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //
  useEffect(() => {
    let user = JSON.parse(sessionStorage.getItem("user"));
    if (user == null) {
      navigate("/login");
    }
    dispatch(getInvoices());
    // eslint-disable-next-line
  }, []);

  const invoices = useSelector((state) => state.invoice);

  const data = invoices.map((el) => ({
    id: el.id,
    StartTime: el.dueToPayBy,
    EndTime: el.dueToPayBy,
    Location: el.clientDetails.companyName,
    Subject: `${el.clientDetails.clientName} ~ ${el.amount} ${el.currency}`,
    IsAllDay: true,
    IsReadonly: true,
  }));

  // console.log(data);
  return (
    <div className="container-main">
      <Header
        title1="Calendar"
        icon1={<AiOutlineCalendar />}
        icon2={<GrNext />}
        title2="Invoices"
      />
      <div>
        {data && (
          <ScheduleComponent
            currentView="Month"
            height="500px"
            eventSettings={{ dataSource: data }}
            // style={{ background: "#1dcf77" }}
          >
            <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize]} />
          </ScheduleComponent>
        )}
      </div>
    </div>
  );
};

export default Calendar;
