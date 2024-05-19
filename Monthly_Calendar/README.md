# Mobiscroll Monthly Calendar Timeline Clone

This project is a clone of the Mobiscroll monthly calendar timeline, built using Vite and React. It provides an interactive calendar interface where users can manage events across multiple resources and dates.

## Features

- **Calendar Navigation**: Change the calendar view by month and year.
- **Quick Navigation Buttons**: Decrease month, move to today, and increase month buttons.
- **Calendar Interface**:
  - Rows represent resources (e.g., "Resource A" to "Resource O").
  - Columns represent dates and days of the month.
  - Click on any box to add an event.
  - Drag events to change their duration or position.
  - Add more resources dynamically.
  - Highlight the current date.
  - Delete events with a confirmation alert.
- **Persistent State**: Data is stored in local storage to prevent data loss on refresh.
- **State Management**: Implemented using `useState`, `useContext`, `createContext`, and `useRef`.
- **Component-Based Architecture**: Modular components for better maintainability.

## Getting Started

To get started with this project, follow these steps:

1. **Clone the repository:**
   git clone
   cd mobiscroll-calendar-clone
2. **Install Dependencies:**
   npm install
3. **Start the development server:**
   npm run dev

4. Open your browser and navigate to http://localhost:3000 to see the app in action.

## Short Answers

### 3 Things Learned

1. Using onMouse event
2. The .map and for loop to render enormous amount of divs easily
3. Learnt to store and retrive array & objects from localStorage by using JSON.strigify and JSON.parse

### Most Difficult Part

The most challenging part was handling the dragging and positioning of the event DIV. I had to use the onMouseMove event to manage two different actions: dragging when clicking and moving on the edge of the DIV, and positioning when clicking and moving from the center of the DIV. Additionally, I needed to manage the event's start and end times during the onMouseMove event.

### What Would Have Been Done Differently

I plan to refine the event logic and enhance user experience by adding more event listeners. My improvements will include implementing alarm and notification features for specific events. Additionally, I will work on creating a more appealing UI for the app.
