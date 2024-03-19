import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";

function DeleteConfirmationDialog({ open, onClose, onConfirm }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this event?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Back</Button>
        <Button onClick={onConfirm} color="error">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DeleteConfirmationDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
  };

export default DeleteConfirmationDialog;
