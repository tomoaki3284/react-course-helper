import React, {useState, useEffect} from 'react';
import ScheduleListView from './scheduleListView';

const ManualScheduleTab = ({coursesMapByTitle}) => {
  const [filteredCourseMap, setFilteredCourseMap] = useState(coursesMapByTitle);

  useEffect(() => {
    setFilteredCourseMap(coursesMapByTitle);
  });

  return (
    <ScheduleListView coursesMapByTitle={filteredCourseMap} />
  );
}

export default ManualScheduleTab;