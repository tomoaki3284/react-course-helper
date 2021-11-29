import React, {useState, useEffect} from 'react';
import ScheduleListView from './scheduleListView';

const ManualScheduleTab = ({coursesMapByTitle, handleAddCourse}) => {
  const [filteredCourseMap, setFilteredCourseMap] = useState(coursesMapByTitle);

  useEffect(() => {
    setFilteredCourseMap(coursesMapByTitle);
  }, [coursesMapByTitle]);

  return (
    <ScheduleListView coursesMapByTitle={filteredCourseMap} handleAddCourse={handleAddCourse} />
  );
}

export default ManualScheduleTab;