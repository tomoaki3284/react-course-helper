import React, {useEffect} from 'react';
import Button from '@mui/material/Button';
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
import AlertDialog from './AlertDialog';

import '../css/FullScreenDialog.css';

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

  const countCredit = () => {
    let credits = 0;
    schedule.forEach(course => {
      credits += course.credit;
    }); 
    return credits;
  }

  return schedule !== null ? (
    <div className='full-screen-adilog-container'>
      <Button color="primary" aria-label="add" className='schedule-button' onClick={handleClickOpen}>
        <img className='schedule-button'/>
      </Button>
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
              Your Schedule -- total credits: {countCredit()}
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          {
            schedule.map((course) => {
              return <div>
                <ListItem>
                  <ListItemText primary={course.title} secondary={course.courseCRN}/>
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