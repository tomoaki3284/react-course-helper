import React, { useState, useEffect } from 'react';
import ManualScheduleTab from './manualScheduleTab';
import FilterGroup from './FilterGroup';
import '../../css/ExplorePage.css';
import CourseFilter from '../../controller/CourseFilter';
import FilterButton from './FilterButton';
import FullScreenDialog from '../FullScreenDialog';

const courseFilter = new CourseFilter();

const ExplorePage = ({coursesMapByTitleProp, handleAddCourse, scheduleProp, handleRemoveCourseFromSchedule, offeringTerm}) => {
  const [coursesMapByTitle, setCoursesMapByTitle] = useState(coursesMapByTitleProp);
  const [filteredCourseMap, setFilteredCourseMap] = useState(coursesMapByTitleProp);
  
  useEffect(() => {
    setCoursesMapByTitle(coursesMapByTitleProp);
    const newFilteredCourseMap = courseFilter.filterCourse(coursesMapByTitleProp);
    setFilteredCourseMap(newFilteredCourseMap);
  }, [coursesMapByTitleProp]);

  useEffect(() => {}, [scheduleProp]);

  function onInputChangeInFilter(event, newValue, filterTitle) {
    if (filterTitle === null || filterTitle === undefined) return;

    courseFilter.setFilter(filterTitle, newValue);
    const newFilteredCourseMap = courseFilter.filterCourse(coursesMapByTitle);
    setFilteredCourseMap(newFilteredCourseMap);
  }

  return (
    <div className='explore-container-big'>
      <h3>{offeringTerm}</h3>
      <div className='explore-container'>
        <div className='filter-group-container'>
          <FilterGroup onInputChange={onInputChangeInFilter} courseFilter={courseFilter}/>
        </div>
        <ManualScheduleTab coursesMapByTitle={filteredCourseMap} handleAddCourse={handleAddCourse} />
        <div className='float_filter_viewer_button_group'>
          <FilterButton className="filter-button" onInputChange={onInputChangeInFilter} courseFilter={courseFilter}/>
          <FullScreenDialog className="schedule-viewer-button" scheduleProp={scheduleProp} handleRemoveCourseFromSchedule={handleRemoveCourseFromSchedule}/>
        </div>
      </div>
    </div>
  );
}

export default ExplorePage;