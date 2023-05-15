import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useDispatch } from 'react-redux';
import axios from '../../api/axios'
import { actionsUsers } from '../../store';



// eslint-disable-next-line prefer-arrow-callback
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



export default function AlertDialogSlide(props) {
  const diapatch = useDispatch()


  const handleClickOpen = () => {
    props.setOpen(true);
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  const handelDelete = (i) =>{

   axios.delete(`/api/users/${i}`).then((e)=>{
    console.log(e);
        diapatch(actionsUsers.removeUsers({id:i}))
   })

  }


  return (
    <div>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Before We Take the action "}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          Are You sure You want delete This user ? because this action is permanently
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}> Cancel </Button>
          <Button onClickCapture={() => handelDelete(props.id)} variant="outlined" color='error' onClick={handleClose}> Delete </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}