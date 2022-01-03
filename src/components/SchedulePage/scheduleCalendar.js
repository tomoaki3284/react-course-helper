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

const ScheduleCalendar = ({appointmentProp, handleRemoveCourseFromScheduleByCRN}) => {
  const commitChanges = ({added, changed, deleted}) => {
    handleRemoveCourseFromScheduleByCRN(deleted.split("/")[0]);
  }
  
  return (
    <Paper>
      <Scheduler data={appointmentProp.datas} height={660}>
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
  );
}

export default ScheduleCalendar;