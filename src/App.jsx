import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

function App() {
  const localizer = momentLocalizer(moment)
  const handleSelectSlot = (slotInfo) => {
    alert(`Selected date: ${slotInfo.start}`)
  }
  return (
    <>
      <div className="myCustomHeight">
        <Calendar
          localizer={localizer}
          events={[]}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          onSelectSlot={handleSelectSlot}
        />
      </div>
    </>
  )
}

export default App
