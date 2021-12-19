class AppointmentData {
  

  constructor({ schedule }) {
    console.log(schedule);

    if (schedule === null || schedule === undefined || schedule.length === 0) return;

    // for 2021 Nov, because 2021 Nov 1st is staring from Monday so convinient
    this.dayToDayOfDate = {
      "MONDAY": 1,
      "TUESDAY": 2,
      "WEDNESDAY": 3,
      "THURSDAY": 4,
      "FRIDAY": 5,
    };
    this.datas = [];

    schedule.forEach(course => {
      let hoursOfDay = course.hoursOfDay;
      if (hoursOfDay === null || hoursOfDay === undefined) return;
      
      Object.keys(hoursOfDay).forEach(dayOfWeek => {
        let times = hoursOfDay[dayOfWeek];
        times.forEach(time => {
          let data = this.convertCourseToData(course, time, this.dayToDayOfDate[dayOfWeek]);
          this.datas.push(data);
        });
      });
    });
  }

  /*
  example output
  {
    title: 'Website Re-Design Plan',
    startDate: new Date(2018, 5, 25, 9, 35),
    endDate: new Date(2018, 5, 25, 11, 30),
    id: 0,
    location: 'Room 1',
  }
   */
  convertCourseToData(course, time, day) {
    let startDate = new Date(2021, 10, day, time["startHour"], time["startMinute"]);
    let endDate = new Date(2021, 10, day, time["endHour"], time["endMinute"]);
    let data = {
      "title": course.title,
      "startDate": startDate,
      "endDate": endDate,
      "id": course.courseCRN + time + day,
      "location": course.room,
    };

    return data;
  }
}

export default AppointmentData;