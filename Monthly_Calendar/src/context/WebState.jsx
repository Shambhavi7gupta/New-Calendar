import WebContext from "./WebContext";
import { useState } from "react";

// WebState component to manage global state and provide it to the rest of the application
const WebState = (props) => {
    // Initialize the current date
    const a = new Date();

    // State variables to manage month, month name, year, width, alert visibility, and initial widths
    const [month, setMonth] = useState(a.getMonth() + 1); // JavaScript months are 0-11, adding 1 to make it 1-12
    const [mname, setMname] = useState(""); // Name of the month
    const [year, setYear] = useState(a.getFullYear()); // Current year
    const [width, setWidth] = useState(null); // Width for some component (context dependent)
    const [showAlert, setShowAlert] = useState(false); // Alert visibility flag
    const [iwidth, setIwidth] = useState([]); // Array to manage initial widths (context dependent)

    // Function to update month, year, and corresponding month name
    const moye = () => {
        // Update month and year to current values
        setMonth(a.getMonth());
        setYear(a.getFullYear());

        // Set the month name based on the current month
        switch(month) {
            case 1:
                setMname("Jan");
                break;
            case 2:
                setMname("Feb");
                break;
            case 3:
                setMname("Mar");
                break;
            case 4:
                setMname("Apr");
                break;
            case 5:
                setMname("May");
                break;
            case 6:
                setMname("June");
                break;
            case 7:
                setMname("July");
                break;
            case 8:
                setMname("Aug");
                break;
            case 9:
                setMname("Sep");
                break;
            case 10:
                setMname("Oct");
                break;
            case 11:
                setMname("Nov");
                break;
            case 12:
                setMname("Dec");
                break;
            default:
                return;
        }
    }

    // Provide the state and functions to the rest of the application through the context provider
    return (
        <WebContext.Provider value={{
            month, // Current month
            mname, // Month name
            setMname, // Function to set month name
            year, // Current year
            moye, // Function to update month, year, and month name
            setMonth, // Function to set month
            setYear, // Function to set year
            width, // Width for some component
            setWidth, // Function to set width
            showAlert, // Alert visibility flag
            setShowAlert, // Function to set alert visibility
            iwidth, // Array to manage initial widths
            setIwidth // Function to set initial widths
        }}>
            {props.children} {/* Render child components */}
        </WebContext.Provider>
    )
}

export default WebState;
