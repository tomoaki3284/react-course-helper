import React, {useEffect} from 'react';
import Fab from '@mui/material/Fab';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import AlertDialog from './AlertDialog';

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FullScreenDialog = ({ scheduleProp, handleRemoveCourseFromSchedule }) => {
  const [open, setOpen] = React.useState(false);
  const [schedule, setSchedule] = React.useState([]);

  // to get parent's state update properly, useEffect
  useEffect(() => {
    setSchedule(scheduleProp);
  }, [scheduleProp]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  return schedule !== null ? (
    <div>
      <Box sx={{ '& > :not(style)': { m: 1 } }} className='fab'>
        <Fab color="primary" aria-label="add" className='fab-button' onClick={handleClickOpen}>
          <img alt='schedule-icon' className='schedule-icon' />
        </Fab>
      </Box>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Your Schedule
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          {
            schedule.map((course) => {
              return <div>
                <ListItem button>
                  <ListItemText primary={course.title + " -- " + course.courseCRN} secondary={course.timeContent} />
                  <AlertDialog 
                    positiveCallback={handleRemoveCourseFromSchedule} 
                    negativeCallback={(e) => {}} 
                    element={course} 
                    dialogTitle="Remove Course" 
                    dialogDetail="Do you want to remove this couse from your schdule?"
                  />
                </ListItem>
                <Divider />
              </div>
            })
          }
        </List>
      </Dialog>
    </div>
  )
  :
  <div>
    none
  </div>;
}

export default FullScreenDialog;