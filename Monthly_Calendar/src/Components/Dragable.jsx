import React, { useState, useEffect, useContext, useRef } from 'react';
import WebContext from '../context/WebContext';

function ResizableButton({ initialWidth, minWidth, maxWidth, classs, colour, children, position, ih, im, fh, fm }) {
  const context = useContext(WebContext);
  const [width, setWidth] = useState(initialWidth); // State for button width
  const buttonRef = useRef(null); // Ref for the button element
  const dragStartX = useRef(null); // Ref for storing initial X position during drag
  const resizeStartX = useRef(null); // Ref for storing initial X position during resize
  const initialDragPos = useRef(null); // Ref for storing initial drag position
  const initialWidthPos = useRef(null); // Ref for storing initial width position
  const prevPos = useRef(position); // Ref for storing previous position during drag
  const prevwid = useRef(width); // Ref for storing previous width during resize
  const [pos, setPos] = useState(position); // State for button position
  const [h, setH] = useState(ih || 1); // State for start hour
  const [m, setM] = useState(im || 0); // State for start minute
  const [h1, setH1] = useState(fh || 1); // State for end hour
  const [m1, setM1] = useState(fm || 0); // State for end minute

  // Load width and position from localStorage on initial render
  useEffect(() => {
    const storedWidth = localStorage.getItem(classs);
    if (storedWidth) {
      setWidth(Number(storedWidth));
    }

    const storedPos = localStorage.getItem(`${classs}1`);
    if (storedPos) {
      setPos(Number(storedPos));
    }
  }, [classs]);

  // Update localStorage with end time when h1 or m1 changes
  useEffect(()=>{
    const time = {
      hour: h1,
      min: m1
    };
    if(time){
      localStorage.setItem(`${classs}2`, JSON.stringify(time));
    }
  },[h1,m1]);

  // Update localStorage with start time when h or m changes
  useEffect(()=>{
    const time2 = {
      hour: h,
      min: m
    };
    if(time2){
      localStorage.setItem(`${classs}3`, JSON.stringify(time2));
    }
  },[h,m]);

  // Handle the start of resizing
  const onMouseDownResize = (event) => {
    resizeStartX.current = event.clientX;
    initialWidthPos.current = width;
    prevwid.current = width;
    window.addEventListener('mousemove', onMouseMoveResize);
    window.addEventListener('mouseup', onMouseUpResize);
  };

  // Handle resizing the button
  const onMouseMoveResize = (event) => {
    const deltaX = event.clientX - resizeStartX.current;
    const newWidth = Math.min(Math.max(width + deltaX, minWidth), maxWidth);
    setWidth(newWidth);

    // Calculate the change in minutes and hours based on the change in width
    const pixelsPerHour = 3; // 24 hours over 72 pixels
    const pixelsPerMinute = pixelsPerHour / 60; // 60 minutes in an hour

    const mChange = Math.floor(deltaX / pixelsPerMinute);
    const hChange = Math.floor(deltaX / pixelsPerHour);

    // Update end time based on resize
    if (mChange !== 0) {
      setM1(prevM1 => {
        let newM1 = prevM1 + mChange;
        while (newM1 >= 60) {
          newM1 -= 60;
          setH1(prevH1 => (prevH1 < 24 ? prevH1 + 1 : 1));
        }
        while (newM1 < 0) {
          newM1 += 60;
          setH1(prevH1 => (prevH1 > 1 ? prevH1 - 1 : 24));
        }
        return newM1;
      });
    }

    if (hChange !== 0) {
      setH1(prevH1 => {
        let newH1 = prevH1 + hChange;
        if (newH1 > 24) {
          newH1 = 1;
        } else if (newH1 < 1) {
          newH1 = 24;
        }
        return newH1;
      });
    }

    const time = {
      hour: h1,
      min: m1
    };

    // Store the new width and end time in localStorage
    localStorage.setItem(classs, newWidth);
    localStorage.setItem(`${classs}2`, JSON.stringify(time));
  };

  // Handle the end of resizing
  const onMouseUpResize = () => {
    window.removeEventListener('mousemove', onMouseMoveResize);
    window.removeEventListener('mouseup', onMouseUpResize);
  };

  // Handle the start of dragging
  const onMouseDownDrag = (event) => {
    dragStartX.current = event.clientX;
    initialDragPos.current = pos;
    prevPos.current = pos;

    window.addEventListener('mousemove', onMouseMoveDrag);
    window.addEventListener('mouseup', onMouseUpDrag);
  };

  // Handle dragging the button
  const onMouseMoveDrag = (event) => {
    const deltaX = event.clientX - dragStartX.current;
    const newPos = initialDragPos.current + deltaX;
    setPos(newPos);

    if (newPos !== prevPos.current) {
      const pixelsPerHour = 3; // 24 hours over 72 pixels
      const pixelsPerMinute = pixelsPerHour / 60; // 60 minutes in an hour

      const hChange = Math.floor((newPos - prevPos.current) / pixelsPerHour);
      const mChange = Math.floor((newPos - prevPos.current) / pixelsPerMinute);

      // Update start time based on drag
      if (mChange !== 0) {
        setM(prevM => {
          let newM = prevM + mChange;
          while (newM >= 60) {
            newM -= 60;
            setH(prevH => (prevH < 24 ? prevH + 1 : 1));
          }
          while (newM < 0) {
            newM += 60;
            setH(prevH => (prevH > 1 ? prevH - 1 : 24));
          }
          return newM;
        });
      }

      if (hChange !== 0) {
        setH(prevH => {
          let newH = prevH + hChange;
          if (newH > 24) {
            newH = 1;
          } else if (newH < 1) {
            newH = 24;
          }
          return newH;
        });
      }

      // Update end time based on drag
      if (mChange !== 0) {
        setM1(prevM => {
          let newM = prevM + mChange;
          while (newM >= 60) {
            newM -= 60;
            setH1(prevH => (prevH < 24 ? prevH + 1 : 1));
          }
          while (newM < 0) {
            newM += 60;
            setH1(prevH => (prevH > 1 ? prevH - 1 : 24));
          }
          return newM;
        });
      }

      if (hChange !== 0) {
        setH1(prevH => {
          let newH = prevH + hChange;
          if (newH > 24) {
            newH = 1;
          } else if (newH < 1) {
            newH = 24;
          }
          return newH;
        });
      }

      prevPos.current = newPos;
    }

    const time = {
      hour: h1,
      min: m1
    };

    const time2 = {
      hour: h,
      min: m
    };

    // Store the new position and times in localStorage
    localStorage.setItem(`${classs}2`, JSON.stringify(time));
    localStorage.setItem(`${classs}3`, JSON.stringify(time2));
    localStorage.setItem(`${classs}1`, newPos);
  };

  // Handle the end of dragging
  const onMouseUpDrag = () => {
    window.removeEventListener('mousemove', onMouseMoveDrag);
    window.removeEventListener('mouseup', onMouseUpDrag);
  };

  return (
    <div style={{backgroundColor: colour, display: 'flex', justifyContent: "center", alignItems: "center", width: `${width+4}px`, position: "relative", left: `${pos}px`,  height: "60px", zIndex: "1"}}>
      <div
      ref={buttonRef}
      style={{width: "2px", height: "59px", zIndex: "1", backgroundColor: colour}}
      // onMouseDown={onMouseDownResize}
      className={classs}
      id='child'
    >
    </div>
      <button style={{ display: "flex", fontSize: "8px", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: colour, width: `${width}px`}} onMouseDown={onMouseDownDrag}>
        <div style={{display: "flex", justifyContent: 'center', alignItems: "center"}}>
        {children}
        </div>
        {h} : {m} - {h1} :{m1}
      </button>
    <div
      ref={buttonRef}
      style={{width: "2px", height: "59px", zIndex: "1", backgroundColor: colour, cursor: "e-resize"}}
      onMouseDown={onMouseDownResize}
      className={classs}
      id='child'
    >
    </div>
    </div>
  );
}

export default ResizableButton;
