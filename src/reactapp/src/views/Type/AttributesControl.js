import React, { Component } from "react";
import { connect } from "react-redux";
import AttributeControl from "./AttributeControl";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Add from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {
  updateSelectedType,
  updateAttributesArr
} from "../../redux/actions/index";

const Label = styled("label")`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
`;
// import Navbar from "react-bootstrap/lib/Navbar";
// import { Button } from "reactstrap";
// import {
//   Form,
//   FormGroup,
//   FormControl,
//   ControlLabel,
//   Checkbox,
// } from "react-bootstrap";

// It will let you add and remove attributes.
// Each needs to have a unique name as part of validation.
// Each also needs to have a valid type.
// The type can be string, integer, double, enum, any Type
// already defined for this world, or a list of any of the
// other types.
// In future versions I will add support for additional types:
// Color, DateTime, Schedule.

const mapStateToProps = state => {
  // // console.log(state);
  return {
    selectedType: state.app.selectedType,
    attributesArr: state.app.attributesArr,
    types: state.app.types
  };
};
function mapDispatchToProps(dispatch) {
  return {
    updateSelectedType: type => dispatch(updateSelectedType(type)),
    updateAttributesArr: arr => dispatch(updateAttributesArr(arr))
  };
}
class Control extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     attributes:
  //   };
  // }

  componentDidMount() {
    // // console.log(this.props);
  }

  newAttribute = () => {
    // // console.log(this.props);
    const type = this.props.selectedType;
    type.AttributesArr.push({
      index: type.AttributesArr.length,
      Name: "",
      Type: "Text",
      Options: [],
      ListType: "",
      FromSupers: [],
      AttributeTypes: ["Text", "Number", "True/False", "Options"]
    });
    this.props.updateSelectedType(type);
    // const arr = this.props.attributesArr;
    // arr.push({Name: "", Type: ""});
    // this.props.updateAttributesArr(arr);
    // I need to put it into state and do setstate.
    // Actually, I may need to put the active type into the main state.
  };

  changeAttribute = value => {
    // console.log(value);
    // const name = e.target.name;
    // const value = (e.target.type === "checkbox" ? e.target.checked : e.target.value);
    // // console.log(value);
    const type = this.props.selectedType;
    // type.AttributesArr.push({Name: "", Type: ""});
    type.AttributesArr[value.index] = {
      index: value.index,
      Name: value.Name,
      Type: value.Type,
      Options: value.Options,
      ListType: value.ListType,
      // Default: value.Default
      FromSupers: value.FromSupers,
      AttributeTypes: ["Text", "Number", "True/False", "Options"]
    };
    // console.log(type);
    this.props.updateSelectedType(type);
    // this.setState({ [name]: value });
  };

  blurAttribute = e => {
    // // console.log(e);
    // const name = e.target.name;
    // const value = (e.target.type === "checkbox" ? e.target.checked : e.target.value);
    // // console.log(value);
    // this.setState({ [name]: value });
  };

  deleteAttribute = value => {
    // console.log(value);
    const type = this.props.selectedType;
    // console.log(type);
    type.AttributesArr.splice(value.index);
    this.props.updateSelectedType(type);
  };

  render() {
    // // console.log(this.props);
    return (
      <Grid item xs={12} container spacing={0} direction="column">
        <Grid item>
          <Label>Attributes</Label>
        </Grid>
        <Grid item>
          <List>
            <ListItem>
              <Button variant="contained" color="primary" onClick={this.newAttribute}>
                <Add />
                <ListItemText primary={"Create New"} />
              </Button>
            </ListItem>
            {this.props.selectedType === null ||
            this.props.selectedType === undefined
              ? ""
              : this.props.selectedType.AttributesArr.map((attribute, i) => {
                  return (
                    <ListItem key={i}>
                      <AttributeControl
                        typeID={this.props.selectedType._id}
                        attribute={attribute}
                        onChange={this.changeAttribute}
                        onDelete={this.deleteAttribute}
                        onBlur={this.blurAttribute}
                        types={this.props.types}
                      />
                    </ListItem>
                  );
                })}
          </List>
        </Grid>
      </Grid>
    );
  }
}

const AttributesControl = connect(mapStateToProps, mapDispatchToProps)(Control);
export default AttributesControl;