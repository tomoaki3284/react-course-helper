import React, {useState, useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Scheduler,
  WeekView,
  Appointments,
  AppointmentTooltip,
  ConfirmationDialog,
} from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState, EditingState, IntegratedEditing} from '@devexpress/dx-react-scheduler';

const ScheduleCalendar = React.forwardRef(({appointmentProp, handleRemoveCourseFromScheduleByCRN}, ref) => {
  const commitChanges = ({added, changed, deleted}) => {
    handleRemoveCourseFromScheduleByCRN(deleted.split("/")[0]);
  }
  
  return (
    <div ref={ref}>
      <Paper>
        <Scheduler data={appointmentProp.datas} height={1300}>
          <ViewState
              defaultCurrentDate="2021-11-01"
              defaultCurrentViewName="Week"
          />
          <WeekView startDayHour={6} endDayHour={19} excludedDays={[0, 6]}/>

          <EditingState
            onCommitChanges={(data) => {
              commitChanges(data);
            }}
          />
          <IntegratedEditing />

          <ConfirmationDialog
            ignoreCancel
            messages="Are you sure you wamt to remove this class?"
          />

          <Appointments />
          <AppointmentTooltip
            showCloseButton
            showDeleteButton
          />
        </Scheduler>
      </Paper>
    </div>
  );
});

export default ScheduleCalendar;