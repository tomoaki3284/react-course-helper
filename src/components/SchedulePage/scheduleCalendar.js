import React, {useState, useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Scheduler,
  WeekView,
  Appointments,
  AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState } from '@devexpress/dx-react-scheduler';
import AppointmentData from '../../controller/AppointmentData';

const ScheduleCalendar = (schedule) => {
  const [appointment, setAppointment] = useState(new AppointmentData(schedule));

  useEffect(() => {
    setAppointment(new AppointmentData(schedule));
  }, [schedule]);

  return (
    <Paper>
      <Scheduler data={appointment.datas} height={660}>
        <ViewState
            defaultCurrentDate="2021-11-01"
            defaultCurrentViewName="Week"
        />
        <WeekView startDayHour={6} endDayHour={19} excludedDays={[0, 6]}/>
        <Appointments />
        <AppointmentTooltip />
      </Scheduler>
    </Paper>
  );
}

export default ScheduleCalendar;