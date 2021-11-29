import React, { useState, useEffect } from 'react';
import ManualScheduleTab from './manualScheduleTab';
import FilterGroup from './FilterGroup';
import '../../css/ExplorePage.css';
import CourseFilter from '../../controller/CourseFilter';

const courseFilter = new CourseFilter();

const ExplorePage = ({coursesMapByTitleProp}) => {
  const [coursesMapByTitle, setCoursesMapByTitle] = useState(coursesMapByTitleProp);
  const [filteredCourseMap, setFilteredCourseMap] = useState(coursesMapByTitleProp);
  
  useEffect(() => {
    setCoursesMapByTitle(coursesMapByTitleProp);
    setFilteredCourseMap(coursesMapByTitleProp);
  }, [coursesMapByTitleProp]);

  function onInputChangeInFilter(event, newValue, filterTitle) {
    if (filterTitle === null || filterTitle === undefined) return;

    courseFilter.setFilter(filterTitle, newValue);
    const newFilteredCourseMap = courseFilter.filterCourse(coursesMapByTitle);
    console.log(newFilteredCourseMap);
    setFilteredCourseMap(newFilteredCourseMap);
  }

  return (
    <div className='explore-container'>
      <FilterGroup className='explore-container__sticky-filter'  onInputChange={onInputChangeInFilter}/>
      <ManualScheduleTab coursesMapByTitle={filteredCourseMap}/>
    </div>
  );
}

export default ExplorePage;