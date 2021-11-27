class CourseFilter {
  constructor() {
    this.core = '';
    this.mode = '';
    this.subject = '';
  }

  setFilter(whichFilter, newFilterValue) {
    if (whichFilter === 'core') {
      this.core = newFilterValue;
    } else if (whichFilter === 'mode') {
      this.mode = newFilterValue;
    } else {
      this.subject = newFilterValue;
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

  filterCourse(courseMap) {
    if (courseMap === undefined || courseMap === null) {
      return;
    }

    let courseMapArr = this.courseMapToArray(courseMap);

    const filteredCourseMap = new Map();
    
    if (this.core === 'Double Core') {
      courseMapArr = courseMapArr.filter((courseEntry) => {
        const course = courseEntry.courses[0];
        return course.cores.length >= 2;
      })
    }

    courseMapArr.filter((courseEntry) => {
      const course = courseEntry.courses[0];
      return (this.emptyString(this.core) || course.cores.includes(this.core) || this.core === 'Double Core') &&
             (this.emptyString(this.mode) || course.room.toLocaleLowerCase() === this.mode) &&
             (this.emptyString(this.subject) || course.subject.toLocaleLowerCase() === this.subject);
    })
    .forEach((filteredCourseEntry) => {
      const title = filteredCourseEntry.title;
      const courses = filteredCourseEntry.courses;
      filteredCourseMap.set(title, courses);
    })
  
    return Object.fromEntries(filteredCourseMap);
  }

  emptyString(str) {
    return !str || str.length === 0;
  }
}

export default CourseFilter;