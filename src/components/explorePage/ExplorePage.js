import React from 'react';
import ManualScheduleTab from './manualScheduleTab';
import FilterGroup from './FilterGroup';
import '../../css/ExplorePage.css';
import CourseFilter from '../../controller/CourseFilter';

class ExplorePage extends React.Component {
  constructor(props) {
    super(props);
    this.courseFilter = new CourseFilter();
    this.state = {
      coursesMapByTitle: null,
      filteredCourseMap: null,
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

    console.log(courseMap);

    this.setState({
      coursesMapByTitle: courseMap,
      filteredCourseMap: courseMap,
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

  onInputChangeInFilter(thisInstance, event, newValue, filterTitle) {
    if (filterTitle === null || filterTitle === undefined) {
      return;
    }
    
    thisInstance.courseFilter.setFilter(filterTitle, newValue);
    const newFilteredCourseMap = thisInstance.courseFilter.filterCourse(thisInstance.state.coursesMapByTitle);
    console.log(newFilteredCourseMap);
    thisInstance.setState({
      filteredCourseMap: newFilteredCourseMap,
    });
  }

  render() {
    return (
      <div className='explore-container'>
        <FilterGroup className='explore-container__sticky-filter' parent={this} onInputChange={this.onInputChangeInFilter}/>
        <ManualScheduleTab coursesMapByTitle={this.state.filteredCourseMap}/>
      </div>
    );
  }
}

export default ExplorePage