import React, { useState } from "react";
import * as microsoftTeams from "@microsoft/teams-js";
import axios from "axios";

const FilePicker = () => {
  const [selectedFile, setSelectedFile] = useState({});

  const pickFile = async () => {
    microsoftTeams.initialize();
    microsoftTeams.ui.picker({
      type: "file",
      success: async (files) => {
        setSelectedFile(files[0]);
        const accessToken = await microsoftTeams.authentication.getAccessToken();
        const response = await axios.get(`https://graph.microsoft.com/v1.0/me/drive/items/${files[0].id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(response.data);
      },
      failure: (error) => {
        console.error(error);
      },
    });
  };

  return (
    <div>
      <button onClick={pickFile}>Pick File</button>
      <div>
        {selectedFile.name ? (
          <div>
            <h2>Selected file:</h2>
            <p>Name: {selectedFile.name}</p>
            <p>URL: {selectedFile.webUrl}</p>
          </div>
        ) : (
          <p>No file selected</p>
        )}
      </div>
    </div>
  );
};

export default FilePicker;
