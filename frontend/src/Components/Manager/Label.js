import React, { useState } from "react";
import Button from "@material-ui/core/Button";

import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import SendIcon from "@material-ui/icons/Send";

import UploadedItems from "./UploadedItems";
import Upload from "./Upload";
import "./Label.css";

const Label = () => {
  const [active, setActive] = useState("insert");

  const [inputValues, setInputValues] = useState({
    name: "Ankit",
    object: "pen",
  });

  return (
    <div>
      <div className="hardcode">
        {inputValues.name}
        {inputValues.object}
      </div>
      <div className="buttons">
        {/* This Button uses a Font Icon, see the installation instructions in the Icon component docs. */}
        <Button
          variant="contained"
          color="primary"
          endIcon={<SendIcon />}
          onClick={() => setActive("insert")}
          className="buttonstyle"
        >
          Insert
        </Button>
        <Button
          variant="contained"
          color="default"
          startIcon={<CloudUploadIcon />}
          onClick={() => setActive("show")}
        >
          Upload
        </Button>
      </div>

      <div>
        {active === "insert" && <Upload />}
        {active === "show" && <UploadedItems />}
      </div>
    </div>
  );
};

export default Label;