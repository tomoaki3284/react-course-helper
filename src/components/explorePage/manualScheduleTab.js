import React from 'react';
import ScheduleListView from './scheduleListView';

class ManualScheduleTab extends React.Component {
  constructor(props) {
    super(props);
    // use in course section table
    this.handleAddCourse = props.handleAddCourse;
    this.state = {
      coursesMapByTitle: props.coursesMapByTitle,
    }
  }

  /**
   * Parent class will load content (state) from an api asynchronosly.
   * So the state needs to be synchronize with the parent state. Therefor,
   * we are using getDerivedStateFromProps to update the state whenever the
   * state is updated in parent class.
   * 
   * @param {*} props 
   * @param {*} state 
   */
  static getDerivedStateFromProps(props, state) {
    if (props.coursesMapByTitle !== state.coursesMapByTitle) {
      return {
        coursesMapByTitle: props.coursesMapByTitle,
      };
    }

    return null;
  }

  render() {
    return (
      <ScheduleListView coursesMapByTitle={this.state.coursesMapByTitle} />
    );
  }
}

export default ManualScheduleTab