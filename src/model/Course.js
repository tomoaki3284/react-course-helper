class Course {

  // string
  courseCRN;
  subject;
  title;
  courseDescription;
  faculty;
  room;
  timeContent;

  // boolean
  isLabCourse;
  isCancelled;

  // double
  credit;

  // list of string
  cores;

  // Map<DayOfWeek, List<Hours>>
  hoursOfDay;

  constructor(courseCRN, subject, title, courseDescription, faculty, room, timeContent, isLabCourse, isCancelled, credit, cores, hoursOfDay) {
    this.courseCRN = courseCRN;
    this.subject = subject;
    this.title = title;
    this.courseDescription = courseDescription;
    this.faculty = faculty;
    this.room = room;
    this.timeContent = timeContent;
    this.isLabCourse = isLabCourse;
    this.isCancelled = isCancelled;
    this.credit = credit;
    this.cores = cores;
    this.hoursOfDay = hoursOfDay;
  }

}