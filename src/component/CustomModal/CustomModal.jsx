import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  paper: {
    position: "absolute",
    [theme.breakpoints.up("md")]: {
      width: theme.spacing.unit * 50
    },
    [theme.breakpoints.up("lg")]: {
      width: theme.spacing.unit * 50
    },
    [theme.breakpoints.down("sm")]: {
      width: theme.spacing.unit * 80
    },
    [theme.breakpoints.down("xs")]: {
      width: theme.spacing.unit * 50
    },
    height: "auto",
    backgroundColor: "white",
    boxShadow: theme.shadows[8],
    padding: theme.spacing.unit * 6,
    overflow: "auto",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  root: {
    zIndex: "1029",
    flexGrow: 1
  }
});

class CustomModal extends React.Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.state = {
      open: true
    };
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  close(e) {
    e.preventDefault();

    if (this.props.onClose) {
      this.props.onClose();
    }
  }


  render() {
    const {classes} = this.props;
    console.log(this.state);
    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item lg={6} md={6} xs={12} sm={12}>
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={this.props.isOpen}
              onClose={this.props.onClose}
              className={classes.root}
            >
              <div className={classes.paper}>
                {this.props.children}
              </div>
            </Modal>
          </Grid>
        </Grid>
      </div>
    );
  }
}

CustomModal.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
  height: PropTypes.string
};

// We need an intermediary variable for handling the recursive nesting.
const CustomModalWrapped = withStyles(styles)(CustomModal);

export default CustomModalWrapped;
