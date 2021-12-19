import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
// import './css/index.css';
import Navbar from './components/navbar';
import ExplorePage from './components/explorePage/ExplorePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import GalleryView from './components/GalleryView';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import FullScreenDialog from './components/FullScreenDialog';
import ScheduleCalendar from './components/SchedulePage/scheduleCalendar';

const Home =  () => {
  const [value, setValue] = React.useState('1');
  const [coursesMapByTitle, setCoursesMapByTitle] = React.useState(null);
  const [schedule, setSchedule] = React.useState([]);

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // by passing [] as dependencies (second arg), it will only called once
  useEffect(() => {
    async function fetchCourses() {
      // GET request using fetch with async/await

      // for prod
      // const courseMap = await fetchFromAPI();
      // setCoursesMapByTitle(courseMap);

      // for dev
      const arr = await require('./asset/current-semester.json');
      const courseMap = new Map();
      arr.forEach(course => {
        if (courseMap.get(course.title) === undefined) {
          courseMap.set(course.title, [course]);
        } else {
          courseMap.get(course.title).push(course);
        }
      });
      setCoursesMapByTitle(Object.fromEntries(courseMap));
      console.log("api called");
    }

    // async function fetchFromAPI() { 
    //   const courses = await fetch('http://localhost:8081/api/v1/courses/group-by-title')
    //   .then((response) => {
    //     if (response.status >= 400 && response.status < 600) {
    //       throw new Error("Bad response from server");
    //     }
    //     return response.json();
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   });
  
    //   return courses;
    // }

    // // for the dev env
    // function fetchFromFile() {
    //   console.log('fetching from file');
    //   console.log(jsonData);
    //   return JSON.parse(JSON.stringify(jsonData));
    // }

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
              <Tab label="Courses" value="1"/>
              <Tab label="Schedule" value="2"/>
            </TabList>
          </Box>
          <TabPanel value="1">
            <ExplorePage coursesMapByTitleProp={coursesMapByTitle} handleAddCourse={handleAddCourse}/>
          </TabPanel>
          <TabPanel value="2">
            <ScheduleCalendar schedule={schedule}/>
          </TabPanel>
        </TabContext>
      </Box>

      <FullScreenDialog scheduleProp={schedule} handleRemoveCourseFromSchedule={handleRemoveCourseFromSchedule}/>
    </div>
  );
}

ReactDOM.render(
  <Home />,
  document.getElementById('root')
);