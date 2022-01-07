class CourseFilter {
  constructor() {
    this.core = '';
    this.mode = '';
    this.subject = '';
    this.title = '';
  }

  /**
   * Return the param specified filter value
   * 
   * @param {string} whichFilter 
   */
  getFilterValue(whichFilter) {
    if (whichFilter.toLowerCase() === 'core') {
      return this.core;
    } else if (whichFilter.toLowerCase() === 'mode') {
      return this.mode;
    } else if (whichFilter.toLocaleLowerCase() === 'subject') {
      return this.subject;
    } else if (whichFilter.toLocaleLowerCase() === 'title') {
      return this.title;
    }
    console.log('whichFilter is not applicable: ', whichFilter);
  }

  /**
   * Set the filter value on the certain filter
   * 
   * e.g.
   * whichFilter = core
   * newFilterValue = SOCU - social understanding
   * In this case, it would set the value (SOCU) in the certain filter category (core)
   * 
   * @param {string} whichFilter - filter category that you want to modify
   * @param {string} newFilterValue - value that would be filtered by
   */
  setFilter(whichFilter, newFilterValue) {
    if (whichFilter === 'core') {
      this.core = newFilterValue;
    } else if (whichFilter === 'mode') {
      if (newFilterValue === 'remote synchronous') {
        this.mode = 'remsyc'
      } else {
        this.mode = newFilterValue;
      }
    } else if (whichFilter === 'subject') {
      this.subject = newFilterValue;
    } else if (whichFilter === 'title') {
      this.title = newFilterValue;
    } else {
      console.log('whichFilter is not applicable: ', whichFilter);
    }
  }

  courseMapToArray(courseMap) {
    if (courseMap === undefined || courseMap === null) {
      return;
    }

    let arr = [];
    for (let title of Object.keys(courseMap)) {
      const courses = courseMap[title];
      arr.push({title, courses});
    }
    return arr;
  }

  /**
   * Return filtered courses map by title after filtered based on the set current filter value
   * 
   * @param {Map<String,List<Course>>} courseMap - section courses map by title
   * @return {Map<String,List<Course>>} Returns
   */
  filterCourse(courseMap) {
    if (courseMap === undefined || courseMap === null) {
      return;
    }

    // to make it easy to iterate and filter our class, convert map into array
    let courseMapArr = this.courseMapToArray(courseMap);

    const filteredCourseMap = new Map();
    
    // special filter 'Double Core', because this needs to filter out course that fills two core 
    if (this.core === 'Double Core') {
      courseMapArr = courseMapArr.filter((courseEntry) => {
        const course = courseEntry.courses[0];
        return course.cores.length >= 2;
      })
    }

    // apply filter based on current set filter value
    courseMapArr.filter((courseEntry) => {
      const course = courseEntry.courses[0];
      return (this.emptyString(this.core) || course.cores.includes(this.core) || this.core === 'Double Core') &&
             (this.emptyString(this.mode) || course.room.toLocaleLowerCase() === this.mode.toLocaleLowerCase()) &&
             (this.emptyString(this.subject) || course.subject === this.subject) &&
             (this.emptyString(this.title) || course.title.toLowerCase().includes(this.title.toLowerCase()));
    })
    // then for each filtered course, add it to filteredCourseMap
    .forEach((filteredCourseEntry) => {
      const title = filteredCourseEntry.title;
      const courses = filteredCourseEntry.courses;
      filteredCourseMap.set(title, courses);
    })
  
    // filteredCourseMap is typical Map structure, where each entry (courses map by title) is map by index.
    // To return the Object of entries, which map courses to course title, it needs to be converted through Object::fromEntries
    return Object.fromEntries(filteredCourseMap);
  }

  emptyString(str) {
    return !str || str.length === 0;
  }
}

export default CourseFilter;