import React, { useState, useEffect } from 'react';
import CourseItem from './CourseItem';
import '../../css/scheduleListView.css';

const ScheduleListView = ({coursesMapByTitle}) => {
  const [filteredCourseMap, setFilteredCourseMap] = useState(coursesMapByTitle);

  useEffect(() => {
    setFilteredCourseMap(coursesMapByTitle);
  });

  /**
   * Because coursesMap couldn't easily converted to array in order to map over,
   * by using existing function (such as Array.from(), [...coursesMap], b/c of shallow copy?),
   * we wrote this function to manually convert the courseMap to array
   */
  const courseMapToArray = () => {
    let arr = [];
    for (let title of Object.keys(filteredCourseMap)) {
      const courses = filteredCourseMap[title];
      arr.push({title, courses});
    }
    return arr;
  };

  const render = () => {
    if (filteredCourseMap !== null && filteredCourseMap !== undefined && filteredCourseMap.size !== 0) {
      const courses = courseMapToArray();

      return (
        <div className="classList">
          {
            Object.entries(courses).map(([index, courseObj]) => {
              const title = courseObj["title"];
              const cs = courseObj["courses"];
              return <CourseItem key={title} course={cs[0]} courseSections={cs} />
            })
          }
        </div>
      );
    } else {
      return(
        <div>
          Information unavailable
        </div>
      );
    }
  }

  return render();
}

export default ScheduleListView;