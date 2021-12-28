import React, { useState, useEffect } from 'react';
import ManualScheduleTab from './manualScheduleTab';
import FilterGroup from './FilterGroup';
import '../../css/ExplorePage.css';
import CourseFilter from '../../controller/CourseFilter';
import FilterButton from './FilterButton';
import FullScreenDialog from '../FullScreenDialog';

const courseFilter = new CourseFilter();

const ExplorePage = ({coursesMapByTitleProp, handleAddCourse, scheduleProp, handleRemoveCourseFromSchedule}) => {
  const [coursesMapByTitle, setCoursesMapByTitle] = useState(coursesMapByTitleProp);
  const [filteredCourseMap, setFilteredCourseMap] = useState(coursesMapByTitleProp);
  
  useEffect(() => {
    setCoursesMapByTitle(coursesMapByTitleProp);
    setFilteredCourseMap(coursesMapByTitleProp);
  }, [coursesMapByTitleProp]);

  useEffect(() => {}, [scheduleProp]);

  function onInputChangeInFilter(event, newValue, filterTitle) {
    if (filterTitle === null || filterTitle === undefined) return;

    courseFilter.setFilter(filterTitle, newValue);
    const newFilteredCourseMap = courseFilter.filterCourse(coursesMapByTitle);
    setFilteredCourseMap(newFilteredCourseMap);
  }

  return (
    <div className='explore-container'>
      <div className='filter-group-container'>
        <FilterGroup onInputChange={onInputChangeInFilter}/>
      </div>
      <ManualScheduleTab coursesMapByTitle={filteredCourseMap} handleAddCourse={handleAddCourse} />
      <div className='float_filter_viewer_button_group'>
        <FilterButton className="filter-button" onInputChange={onInputChangeInFilter}/>
        <FullScreenDialog className="schedule-viewer-button" scheduleProp={scheduleProp} handleRemoveCourseFromSchedule={handleRemoveCourseFromSchedule}/>
      </div>
    </div>
  );
}

export default ExplorePage;