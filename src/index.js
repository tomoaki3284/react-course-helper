import React, { useEffect } from 'react';
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

const Home =  () => {
  const [value, setValue] = React.useState('1');
  const [coursesMapByTitle, setCoursesMapByTitle] = React.useState(null);
  var schedule = [];

  const handleAddCourse = (course) => {
    if (course === null || course === undefined || schedule.includes(course)) return;

    schedule = [...schedule, course];
    console.log(schedule);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // by passing [] as dependencies (second arg), it will only called once
  useEffect(() => {
    async function fetchCourses() {
      // GET request using fetch with async/await
      const courseMap = await fetchFromAPI();
      setCoursesMapByTitle(courseMap);
    }

    async function fetchFromAPI() { 
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

    fetchCourses();
  }, []);

  return (
    <div className='page-container'>
      <Navbar />
      <GalleryView />
      <Box className="tab-context-container" sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box className='tab-container' sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Course Explorer" value="1"/>
              <Tab label="Schedule Visualizer" value="2"/>
            </TabList>
          </Box>
          <TabPanel value="1">
            <ExplorePage coursesMapByTitleProp={coursesMapByTitle} handleAddCourse={handleAddCourse}/>
          </TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}

ReactDOM.render(
  <Home />,
  document.getElementById('root')
);