import React from 'react';
import ManualScheduleTab from './manualScheduleTab';

class ExplorePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coursesMapByTitle: null,
    };
  }

  /**
   * componentDidMount() is invoked immediately after a component is mounted
   *  (inserted into the tree). 
   * Initialization that requires DOM nodes should go here. 
   * If you need to load data from a remote endpoint, 
   * this is a good place to instantiate the network request.
   */
  async componentDidMount() {
    // GET request using fetch with async/await
    const courseMap = await this.fetchCourses();

    this.setState({
      coursesMapByTitle: courseMap,
    })
  }

  async fetchCourses() {
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

  render() {
    return (
      <ManualScheduleTab coursesMapByTitle={this.state.coursesMapByTitle}/>
    );
  }
}

export default ExplorePage