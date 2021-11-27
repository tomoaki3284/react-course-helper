import React from 'react';
import CourseItem from './CourseItem';
import '../../css/scheduleListView.css';

class ScheduleListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coursesMapByTitle: props.coursesMapByTitle,
    };
  }

  static getDerivedStateFromProps(props, state) {
    
    if (props.coursesMapByTitle !== state.coursesMapByTitle) {
      console.log("getDrivedStateFromProps: " + props.coursesMapByTitle);
      return {
        coursesMapByTitle: props.coursesMapByTitle,
      };
    }

    return null;
  }

  /**
   * Because coursesMap couldn't easily converted to array in order to map over,
   * by using existing function (such as Array.from(), [...coursesMap], b/c of shallow copy?),
   * we wrote this function to manually convert the courseMap to array
   */
  courseMapToArray() {
    let arr = [];
    for (let title of Object.keys(this.state.coursesMapByTitle)) {
      const courses = this.state.coursesMapByTitle[title];
      arr.push({title, courses});
    }
    return arr;
  }

  render() {
    if (this.state.coursesMapByTitle !== null && this.state.coursesMapByTitle !== undefined && this.state.coursesMapByTitle.size !== 0) {
      const courses = this.courseMapToArray();

      return (
        <div className="classList">
          {
            Object.entries(courses).map(([index, courseObj]) => {
              const title = courseObj["title"];
              const cs = courseObj["courses"];
              return <CourseItem key={title} course={cs[0]} courseSections={cs}/>
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
}

export default ScheduleListView