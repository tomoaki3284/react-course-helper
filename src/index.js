import React from 'react';
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
  const [schedule, setSchedule] = React.useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAddCourse = (course) => {
    setSchedule([...schedule, course]);
  }

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
            <ExplorePage />
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