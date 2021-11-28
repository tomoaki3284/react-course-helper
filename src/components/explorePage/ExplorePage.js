import React, { useEffect } from 'react';
import ManualScheduleTab from './manualScheduleTab';
import FilterGroup from './FilterGroup';
import '../../css/ExplorePage.css';
import CourseFilter from '../../controller/CourseFilter';

const ExplorePage = ({coursesMapByTitleProp, filteredCourseMapProp}) => {
  const [coursesMapByTitle, setCoursesMapByTitle] = React.useState(coursesMapByTitleProp);
  const [filteredCourseMap, setFilteredCourseMap] = React.useState(filteredCourseMapProp);
  const courseFilter = new CourseFilter();

  useEffect(() => {
    async function fetchCourses() {
      // GET request using fetch with async/await
      const courseMap = await fetchFromAPI();
      setCoursesMapByTitle(courseMap);
      setFilteredCourseMap(courseMap);
    }

    async function fetchFromAPI() { 
      const courses = await fetch('http://localhost:8081/api/v1/courses/group-by-title')
      .then((response) => {
        if (response.status >= 400 && response.status < 600) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .catch((error) => {
        console.log(error)
      });
  
      return courses;
    }

    fetchCourses();
  });

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

export default ExplorePage