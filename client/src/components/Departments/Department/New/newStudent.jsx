import { Fragment, useContext, useEffect, useState } from "react";
import xlsxParser from "xlsx-parse-json";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import { fetchAll } from "../../../../api/users";
import { useParams } from "react-router-dom";
import { userContext } from "../../../../context/userContext";

const NewStudent = ({ onSubmit, setAdd }) => {
  const [upload, setUpload] = useState(false);
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState({
    name: "",
    password: "",
    eduMail: "",
    classroom: "",
  });
  const { id } = useParams();
  const { token } = useContext(userContext).user;

  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    fetchAll(token, id, "classrooms")
      .then(({ classrooms }) => {
        setClassrooms(classrooms);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const onChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const { name, password, eduMail } = student;
  return (
    <Fragment>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(students);
          // onSubmit(e, students);
        }}
      >
        <FormControl fullWidth>
          <select
            onChange={(e) => {
              setStudent({ ...student, [e.target.name]: e.target.value });
            }}
            name="classroom"
          >
            <option value={null}>Select Classroom</option>
            {classrooms.map(({ _id: id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </FormControl>
        {!upload ? (
          <Fragment>
            <FormControl fullWidth>
              <TextField
                variant="outlined"
                label="name"
                name="name"
                value={name}
                onChange={onChange}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                variant="outlined"
                label="email"
                onChange={onChange}
                name="eduMail"
                value={eduMail}
                type="email"
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                variant="outlined"
                onChange={onChange}
                label="password"
                name="password"
                value={password}
                type="password"
              />
            </FormControl>

            <FormControl fullWidth>
              <Button variant="contained" component="label">
                Upload File
                <input
                  type="file"
                  hidden
                  onChange={(e) => {
                    setUpload(true);

                    const [user] = e.target.files;
                    xlsxParser
                      .onFileSelection(user)
                      .then(
                        ({ Sheet1: data }) =>
                          (data.classroom = setStudents([...students, data]))
                      )
                      .catch((err) => console.error(err));
                  }}
                />
              </Button>
            </FormControl>
          </Fragment>
        ) : null}

        <FormControl fullWidth>
          <div className="form__btn">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              onClick={() => {
                if (!upload) {
                  setStudents([...students, student]);
                }
              }}
            >
              Create
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={() => {
                setAdd(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </FormControl>
      </form>
    </Fragment>
  );
};
export default NewStudent;
