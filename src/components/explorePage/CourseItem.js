import React from 'react';
import CourseSectionTable from './CourseSectionTable';
import '../../css/courseItem.css';

class CourseItem extends React.Component {
  constructor(props) {
    super();
    this.course = props.course;
    this.courseSections = props.courseSections;
    this.state = {
      expanded: false,
    }
  }

  handleClick() {
    const nextState = !this.state.expanded;
    this.setState({expanded: nextState})
  }

  render() {
    return (
      <div onClick={this.handleClick.bind(this)} className="course">
        <p className="course__title">{this.course.title}</p>
        <p className="course__categories">{this.course.subject} | {this.course.credit}.0 | {this.course.cores.join(', ')}</p>
        <div className="course__description">
          {this.course.courseDescription}
        </div>
        {
          this.state.expanded ? 
          <CourseSectionTable courseSections={this.courseSections}/>
          :
          <div></div>
        }
      </div>
    );
  }
}

export default CourseItem