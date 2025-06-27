import "@fullcalendar/react/dist/vdom"; // Fix Vite error: https://github.com/fullcalendar/fullcalendar/issues/6371
import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Route } from "wouter";
import "./App.css";
import AddEvent from "./components/AddEvent/AddEvent";
import Calendar from "./components/Calendar/Calendar";
import CaptureColumn from "./components/CaptureColumn/CaptureColumn";
import EventDialog from "./components/EventDialog/EventDialog";
import Header from "./components/Header/Header";
import ShutdownComplete from "./components/ShutdownComplete/ShutdownComplete";

import VoiceControl from "./components/VoiceControl/VoiceControl";

function App() {
  const [eventList, setEventList] = useState([]);
  const [isLoaded, setReadyStatus] = useState(false);
  const [clickedEvent, setClickedEvent] = useState({ extendedProps: {} });
  const [openEditForm, setOpenEditForm] = useState(false);

  let handleEventClick = ({ event }) => {
    setClickedEvent(event);
    setOpenEditForm(true);
  };

  const handleClose = () => {
    setOpenEditForm(false);
  };

  const handleVoiceResult = (transcript) => {
    console.log(transcript);
  };

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((eventList) => {
        setEventList(eventList);
        setReadyStatus(true);
      })
      .catch((err) => console.log(err));
  }, []);

  const unscheduledTasks = eventList.filter((task) => !task.startTime);

  return isLoaded ? (
    <>
      <Route path="/">
        <Container fluid>
          <Row className="App-header">
            <Header />
          </Row>
          <Row>
            <Col xs={9} className="Calendar">
              <Calendar tasks={eventList} onEventClick={handleEventClick} />
            </Col>
            <Col xs={3} className="CaptureColumn">
              <CaptureColumn tasks={unscheduledTasks} />
              <ShutdownComplete />
              <VoiceControl onResult={handleVoiceResult} />
            </Col>
          </Row>
          <div>
            <EventDialog open={openEditForm} onClose={handleClose} event={clickedEvent} />
          </div>
        </Container>
      </Route>
      <Route path="/addevent">
        <AddEvent />
      </Route>
    </>
  ) : (
    <Calendar tasks={eventList} />
  );
}

export default App;