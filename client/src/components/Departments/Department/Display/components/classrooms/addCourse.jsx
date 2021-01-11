import {
  Button,
  Card,
  FormControl,
  IconButton,
  TextField,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { green } from "@material-ui/core/colors";
import { useParams } from "react-router-dom";

import { useContext, useState } from "react";

import { userContext } from "@context/userContext";

import { update } from "@api/classroom";
import department from "@api/department";

const AddCourse = ({ setCourse }) => {
  return (
    <div className="editClassroom">
      <Card>
        <div className="editClassroom__container">
          <div className="editClassroom__cancel">
            <IconButton
              onClick={() => {
                setCourse(false);
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <form onSubmit={null}>
            <FormControl fullWidth>
              <TextField
                focused
                variant="outlined"
                value="name"
                name="name"
                label="name"
              />
            </FormControl>
            <FormControl fullWidth>
              <div className="select">
                <select name="homeRoomTeacher">
                  <option value={"homeRoomTeacher"}>{"teachName"}</option>
                </select>
              </div>
            </FormControl>
            <FormControl fullWidth>
              <Button
                type="submit"
                variant="contained"
                style={{
                  backgroundColor: green["A700"],
                  color: "#fff",
                  fontWeight: "600",
                  fontSize: "0.8rem",
                }}
              >
                Add
              </Button>
            </FormControl>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default AddCourse;
