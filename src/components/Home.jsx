import React, { useState } from "react";

const Home = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus("Please select a file to upload.");
      return;
    }

    try {
        const token = localStorage.getItem("Access") ;
        console.log(token)
      const accessToken = token;
      const endpoint = `https://graph.microsoft.com/v1.0/me/drive/root/children/${file.name}/content`;

      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          Authorization: `Bearer EwB4A8l6BAAUkj1NuJYtTVha+Mogk+HEiPbQo04AAdsvga3qCDTmYIV/FO/d3som/AgzNSUiVF810ka3QZ5+YuovchCa4QxkuMja8lv01rrclX+bDiYI2NPSyaBxKCEey8zJk3zMEzL1I6PDtSmQHEuYsoW37PpGRNIvus1dyv0JUbfQtu0u3kUyObli9BZqq4J4zIUsCRHK07Ia+Lpz6UHIRVnQd4m4JZEe3+MJFzq7RdDFznEaN55/Wyfl8ffm4Zox2mUft0hbqp7ODz06nKNZN0OrYCdjmXzvoJSt4YnQJ9+m+7VqXkVY1f221Qrf/xag15Pr80dvMomMairVIXEajiBESSZ6tERROaUpH26cW/VfhisXXp46w+2JAkkDZgAACAmIdj+i/LeNSAJ0R6eTx8PytvbHCuF63RKvObgsLPIcLaH+bcOXC/Dp0+zFtVpDKe3I6pwRDloE2H7TRH2rw+abVqWz7MJ17JBymkVa1md6nGtRulOySBt7fcaAjTJRAIZIigOUnl2HXiYJZ9x21fFgXcHi+GYJqjEFuxblS3e6BXWTHJ8ZHTs+6Li+ubdmDdpJIHWrrRuJOZp+zC/gd5YjBKhG5IRyxcSkKH1zmidTgTFHDRUHOqZZJC8iEsLvTQAEDjmPardYOHXLYIdBGr5Fh2ZViXllLoQ9RosMxwDaKHpRXPPxK6fxiOvSzI02S761hHFWxk1xi44s4XSRoTJ457a2YM9HfPYj8xO/ioVuDunxGueT35HwewTgavN8WhNCS4Ko7guLpvnb174sOLA2JH6ft4CX85F0zjl6eZs351eMrB6cTrKpfoiNTvpexqoX5MpWPDKcECSlPkW7RAWPOAOtxCT10GMT3Z2rJMluORWzsN2Q1WK4ffMUacTaXgrd+x3gR1edISrZBaG9znhDYesjtdPJW3amIwy25u27+NBE4BdiQYauQiKctRxsAZVOWKxQp88XaCOi4oQCKzK155pEArpNMrB5poVBrmcuJ3dvMBfFOwryObHroiqlwVPx/8am3NTmTSuYXbFLGeqyPKE6B+4B4reXbGj7x2VaWlx1bKvE1/ex5lXErT1PngeWFjJyLIEzauqIi12gzuem5dYHMGQ1TueXOAdDVBNkagvX4YBluDzRq6Zh7gD8LjHYnmKYMMB7GLsLinc4lKkhIJ4C`,
          "Content-Type": file.type,
        },
        body: file,
        
      });
       console.log("yes")
      if (!response.ok) {
        throw new Error("Failed to upload file.");
      }

      setUploadStatus("File uploaded successfully!");
    } catch (error) {
      setUploadStatus("Failed to upload file.");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <p>{uploadStatus}</p>
    </div>
  );
};

export default Home;