import React, { useState, useEffect } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { mockApiResponse } from './list'

function App() {
  const localizer = momentLocalizer(moment)
  const [events, setEvents] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())

  useEffect(() => {
    const fetchData = async () => {
      const data = mockApiResponse.map(item => ({
        title: item.disabled ? null : `Slots: ${item.slots}`,
        start: new Date(item.date),
        end: new Date(item.date),
        allDay: true,
        disabled: item.disabled,
      }))
      setEvents(data)
    }
    fetchData()
  }, [])

  const handleSelectSlot = (slotInfo) => {
    const selectedDate = events.find(
      event => event.start.toDateString() === slotInfo.start.toDateString()
    )
    if (selectedDate && selectedDate.disabled) {
      alert('This date is disabled for booking')
    } else {
      setShowModal(true)
      // alert(`Selected date: ${slotInfo.start}`)
    }
  }

  const eventPropGetter = (event) => {
    if (event.disabled) {
      return {
        style: {
          display: 'none',
        },
      }
    }
    return {
      style: {
        backgroundColor: 'green',
      },
    }
  }

  const dayPropGetter = (date) => {
    const isDisabled = events.some(
      event => event.start.toDateString() === date.toDateString() && event.disabled
    )
    if (isDisabled) {
      return {
        style: {
          backgroundColor: 'red',
          cursor: "not-allowed",
          opacity: 0.5,
        },
      }
    }
    return {}
  }

  const handleNextYear = () => {
    const nextYear = new Date(currentDate.setFullYear(currentDate.getFullYear() + 1))
    setCurrentDate(nextYear)
  }

  const handlePreviousYear = () => {
    const prevYear = new Date(currentDate.setFullYear(currentDate.getFullYear() - 1))
    setCurrentDate(prevYear)
  }

  const handleToday = () => {
    setCurrentDate(new Date())
  }
  return (
    // everything here:
    <> 
      <div className="myCustomHeight">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable
          onSelectSlot={handleSelectSlot}
          eventPropGetter={eventPropGetter}
          dayPropGetter={dayPropGetter}
          style={{ height: 800, width: '90%', margin: "auto" }}
          date={currentDate}
          onNavigate={(date) => setCurrentDate(date)}
        />
      </div>
      {
        showModal && (
          <div className='modal'>
            <center>
              <div style={{ backgroundColor: "#fff", width: "400px", marginTop: 20, height: "200px", padding: "7px" }}>
                <button onClick={() => setShowModal(!showModal)}>Hide</button>
                <div>
                  hello
                </div>
              </div>
            </center>
          </div>
        )
      }
      <div style={{ marginBottom: 20 }}>
        <button onClick={handlePreviousYear} style={{ padding: 7 }}>Previous Year</button>
        <button onClick={handleToday} style={{ padding: 7 }}>Today</button>
        <button onClick={handleNextYear} style={{ padding: 7 }}>Next Year</button>
      </div>
    </>
  )
}

export default App
