import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import Navbar from './components/navbar';
import ExplorePage from './components/explorePage/ExplorePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import GalleryView from './components/GalleryView';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ScheduleCalendar from './components/SchedulePage/scheduleCalendar';
import { properties } from './properties.js';
import AppointmentData from './controller/AppointmentData';
import Button from '@mui/material/Button';
import { exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG } from 'react-component-export-image';

const Home =  () => {
  const [value, setValue] = React.useState('1');
  const [coursesMapByTitle, setCoursesMapByTitle] = React.useState(null);
  const [schedule, setSchedule] = React.useState([]);
  const [offeringTerm, setOfferingTerm] = React.useState('');
  const componentRef = useRef();

  /**
   * 
   * Return true if course has been added. False if not (duplicate course exist)
   * 
   * @return boolean
   * @param {*} course 
   */
  const handleAddCourse = (course) => {
    let added = false;
    setSchedule(prevState => {
      let duplicate = prevState.indexOf(course) >= 0;
      added = !duplicate;
      return duplicate ? prevState : [...prevState, course];
    });
    return added;
  }

  const handleRemoveCourseFromSchedule = (course) => {
    const copySchedule = [...schedule]
    let idx = copySchedule.indexOf(course);
    copySchedule.splice(idx, 1);
    setSchedule(prevState => copySchedule);
  }

  const handleRemoveCourseFromScheduleByCRN = (courseCRN) => {
    const copySchedule = [...schedule]
    let delIdx = -1;
    copySchedule.forEach((course, index) => {
      if (course.courseCRN === courseCRN) {
        delIdx = index;
      }
    });
    console.assert(delIdx !== -1, "courseCRN that you want to delete from scheduler cannot be find: " + courseCRN);
    copySchedule.splice(delIdx, 1);
    setSchedule(prevState => copySchedule);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // by passing [] as dependencies (second arg), it will only called once
  useEffect(() => {
    async function fetchCourses() {
      const SERVER_URL = properties.REACT_APP_SERVER_URL;
      const courseMap = await fetchFromAPI(SERVER_URL);
      setCoursesMapByTitle(courseMap[properties.JSON_KEY_COURSES]);
      setOfferingTerm(courseMap[properties.JSON_KEY_OFFERING_TERM]);
    }

    async function fetchFromAPI(SERVER_URL) { 
      const courses = await fetch(SERVER_URL)
      .then((response) => {
        if (response.status >= 400 && response.status < 600) {
          console.log(response.status);
          throw new Error("Bad response from server");
        }
        return response.json();
      }) 
      .catch((error) => {
        console.log(error)
      });
      return courses;
    }

    fetchCourses();
  }, []);

  /*
    Why are we doing this? Isn't this redundant? Read:
    https://stackoverflow.com/questions/54069253/usestate-set-method-not-reflecting-change-immediately
  */
  useEffect(() => {
    setSchedule(schedule);
  },[schedule]);

  return (
    <div className='page-container'>
      <Navbar />
      <GalleryView />
      <Box className="tab-context-container" sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box className='tab-container' sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Courses" value="1" className='tab-button'/>
              <Tab label="Schedule" value="2" className='tab-button'/>
            </TabList>
          </Box>
          <TabPanel value="1">
            <ExplorePage offeringTerm={offeringTerm} coursesMapByTitleProp={coursesMapByTitle} handleAddCourse={handleAddCourse} scheduleProp={schedule} handleRemoveCourseFromSchedule={handleRemoveCourseFromSchedule}/>
          </TabPanel>
          <TabPanel value="2">
            <Button
            variant="outlined"
            onClick={() => exportComponentAsPNG(componentRef)}>
              Export Schedule As PNG
            </Button>
            <ScheduleCalendar ref={componentRef} schedule={schedule} appointmentProp={new AppointmentData(schedule)} handleRemoveCourseFromScheduleByCRN={handleRemoveCourseFromScheduleByCRN} />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}

ReactDOM.render(
  <Home />,
  document.getElementById('root')
);