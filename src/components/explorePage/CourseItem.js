import React, { useState } from 'react';
import CourseSectionTable from './CourseSectionTable';
import '../../css/courseItem.css';

const CourseItem = ({course, courseSections}) => {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(!expanded);
  }

  return (
    <div className="course">
      <p onClick={handleClick} className="course__title">{course.title}<span className='course__plus-icon'></span></p>
      <p className="course__categories">{course.subject} | {course.credit}.0 | {course.cores.join(', ')}</p>
      <div className="course__description">
        {course.courseDescription}
      </div>
      {
        expanded ? 
        <CourseSectionTable courseSections={courseSections}/>
        :
        <div></div>
      }
    </div>
  );
}

export default CourseItem;