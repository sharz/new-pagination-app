import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";


const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  }
});

function SearchBar(props) {
  const {classes} = props;
  return (
    <React.Fragment>
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="outlined-search-input"
          label="Search"
          className={classes.textField}
          type="Search"
          name="Search"
          autoComplete="Search"
          margin="normal"
          variant="outlined"
          value={props.searchInput}
          onChange={props.handleInputChange}
        />
      </form>
    </React.Fragment>
  );
}

SearchBar.propTypes = {
  classes: PropTypes.object.isRequired,
  searchInput: PropTypes.any,
  handleInputChange: PropTypes.func
};

export default withStyles(styles)(SearchBar);

