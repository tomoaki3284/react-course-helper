import React, { useState } from 'react';
import CourseSectionTable from './CourseSectionTable';
import '../../css/courseItem.css';

const CourseItem = ({course, courseSections, handleAddCourse}) => {
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState('close');

  const handleClick = () => {
    setExpanded(!expanded);
    setOpen(open === 'open' ? 'close' : 'open');
  }

  return (
    <div className="course">
      <p onClick={handleClick} className="course__title">{course.title}<span className={'course__plus-icon ' + open}></span></p>
      <p className="course__categories">{course.subject} | {course.credit}.0 | {course.cores.join(', ')}</p>
      <div className="course__description">
        {course.courseDescription}
      </div>
      {
        expanded ? 
        <CourseSectionTable courseSections={courseSections} handleAddCourse={handleAddCourse} open={open}/>
        :
        <div></div>
      }
    </div>
  );
}

export default CourseItem;