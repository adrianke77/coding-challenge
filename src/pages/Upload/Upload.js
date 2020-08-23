import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import ReactPlayer from 'react-player';
import { DropzoneArea } from 'material-ui-dropzone';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import './styles.css';

const Home = () => {
  const history = useHistory();
  const [video, setVideo] = useState(null);
  const [videoURL, setVideoURL] = useState(null);

  const onDropzoneChange = (files) => {
    if (files[0]) {
      setVideo(files[0]);
      setVideoURL(URL.createObjectURL(files[0]));
    } else {
      setVideo(null);
      setVideoURL(null);
    }
  };

  const onUploadButton = () => {
    const newData = new FormData();
    newData.append('videoFile', video);
    newData.append('new_file_name', video.name);
    fetch('http://localhost:8080/video', {
      method: 'POST',
      body: newData,
    })
      .then(() => {
        history.push('/');
      })
      .catch(console.warn);
  };

  const onCancelButton = () => {
    history.push('/');
  };

  return (
    <div className="uploadpage">
      <Paper className="uploadpage-container" elevation={3}>
        <h2 className="uploadpage-header"> Upload Video File </h2>
        <div className="uploadpage-subheader">
          <h3> File types available are .mp4, .wmv and .avi </h3>
          <h3>File size is limited to 50 MB</h3>
        </div>
        <DropzoneArea
          filesLimit={1}
          acceptedFiles={['video/mp4', 'video/x-ms-wmv', 'video/x-msvideo']}
          maxFileSize={50000000}
          dropzoneClass={`uploadpage-dropzone ${
            !!video && 'uploadpage-dropzone--hidden'
          }`}
          onChange={onDropzoneChange}
          showPreviews={true}
          showPreviewsInDropzone={false}
          useChipsForPreview
          previewGridClasses={{ container: 'uploadpage-previewcontainer' }}
          previewText=""
        />
        {!!videoURL && (
          <ReactPlayer
            className={'uploadpage-videoplayer'}
            url={videoURL}
            controls
          />
        )}
        <div className="uploadpage-buttonrow">
          <Button
            className="uploadpage-button"
            variant="contained"
            color="secondary"
            onClick={onCancelButton}
          >
            Cancel
          </Button>
          <Button
            className="uploadpage-button"
            disabled={!video}
            variant="contained"
            color="primary"
            onClick={onUploadButton}
          >
            Upload Video
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default Home;
