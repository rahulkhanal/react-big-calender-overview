import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import MyCalendar from './Range.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <MyCalendar />
  </React.StrictMode>,
)
