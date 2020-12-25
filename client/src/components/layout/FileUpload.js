import fileParser from "xlsx-parse-json";
import "./styles/fileUpload.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
const FileUpload = ({ setUsers }) => {
  const onInput = (e) => {
    const file = e.target.files[0];
    fileParser
      .onFileSelection(file)
      .then((parsedFile) => {
        setUsers(parsedFile.Sheet1);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const onDragEnter = (e) => {
    const parent = e.target.parentNode;
    parent.classList.add("drag__dropContainer--drag");
  };
  const onDrop = (e) => {
    e.target.parentNode.classList.remove("drag__dropContainer--drag");
  };
  const onDragLeave = onDrop;
  return (
    <div className="file__upload">
      <div className="drag__dropContainer">
        <input
          type="file"
          className="drag__drop"
          onInput={onInput}
          onDrop={onDrop}
          onDragLeave={onDragLeave}
          onDragEnter={onDragEnter}
        />
        <div className="file__uploadContent">
          <div>
            <FontAwesomeIcon icon={faFileUpload} size="5x" />
          </div>
          <div>
            Drag and drop or <span className="browse">browse</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
