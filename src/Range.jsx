import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const validStartDate = moment('2022-07-05');
const validEndDate = moment('2022-12-09');

const MyCalendar = () => {

    const dayPropGetter = date => {
        const currentDate = moment(date);

        if (currentDate.isBefore(validStartDate) || currentDate.isAfter(validEndDate)) {
            return {
                className: 'disabled-date',
                onClick: () => {
                    alert('This date is outside the valid range.');
                }
            };
        }

        return {};
    };

    return (
        <div style={{ height: 500 }}>
            <Calendar
                localizer={localizer}
                events={[]}
                startAccessor="start"
                endAccessor="end"
                views={['month', 'week', 'day']}
                dayPropGetter={dayPropGetter}
            />
        </div>
    );
};

export default MyCalendar;
