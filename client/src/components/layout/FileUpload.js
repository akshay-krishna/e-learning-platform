import fileParser from "xlsx-parse-json";
import "./styles/fileUpload.css";

const FileUpload = ({ setUsers }) => {
  const onChange = (e) => {
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
  return (
    <div className="file__upload">
      <div className="drag__dropContainer">
        <input
          type="file"
          className="drag__drop"
          onInput={onChange}
          onDrop={onChange}
        />
        <input type="file" name="data" className="browse" onInput={onChange} />
      </div>
    </div>
  );
};

export default FileUpload;
