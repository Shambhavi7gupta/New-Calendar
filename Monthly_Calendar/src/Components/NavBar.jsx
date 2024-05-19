import React, { useEffect, useContext, useState } from 'react'
import WebContext from '../context/WebContext';
import './nav.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const NavBar = () => {
  // Get context values from WebContext
  const context = useContext(WebContext);
  const { month, setMonth, mname, setMname, year, setYear } = context;

  // Local state to manage flag for date picker visibility and selected date
  const [flag, setFlag] = useState(false);
  const [selectedDate, setSelectDate] = useState(null);

  // Function to set the current date (month and year)
  const currentDate = () => {
    const date = new Date();
    const currentMonth = date.getMonth() + 1;
    const currentYear = date.getFullYear();
    setMonth(currentMonth);
    setYear(currentYear);
  }

  // useEffect to update month name based on the month number
  useEffect(() => {
    switch (month) {
      case 1: setMname("January"); break;
      case 2: setMname("February"); break;
      case 3: setMname("March"); break;
      case 4: setMname("April"); break;
      case 5: setMname("May"); break;
      case 6: setMname("June"); break;
      case 7: setMname("July"); break;
      case 8: setMname("August"); break;
      case 9: setMname("September"); break;
      case 10: setMname("October"); break;
      case 11: setMname("November"); break;
      case 12: setMname("December"); break;
      default: return;
    }
  }, [month, setMname]);

  // Function to toggle the visibility of the date picker
  const click = () => {
    setFlag(!flag);
  }

  // Function to handle month navigation (previous and next)
  const click2 = (direction) => {
    if (direction === "-") {
      if (month > 1) {
        setMonth(month - 1);
      } else {
        setYear(year - 1);
        setMonth(12);
      }
    } else if (direction === "+") {
      if (month < 12) {
        setMonth(month + 1);
      } else {
        setYear(year + 1);
        setMonth(1);
      }
    }
  }

  // Function to handle date change from the date picker
  const handleDateChange = (date) => {
    setSelectDate(date);
    setMonth(date.getMonth() + 1);
    setYear(date.getFullYear());
    setFlag(false);
  };

  return (
    <>
      <div className='nav'>
        <div className='left margintop hovering' onClick={click}>{mname} {year}</div>
        <div className='right margintop hovering'>
          <div onClick={() => { click2("-") }}>{"<"}</div>
          <div onClick={currentDate}>Today</div>
          <div onClick={() => { click2("+") }}>{">"}</div>
        </div>
      </div>
      {flag && <div className='date_position'><DatePicker id="datepicker" selected={selectedDate} onChange={handleDateChange} inline /></div>}
    </>
  )
}

export default NavBar;
