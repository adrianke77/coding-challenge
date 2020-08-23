import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ReactPlayer from 'react-player';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Paper from '@material-ui/core/Paper';

const VideoList = () => {
  const history = useHistory();
  const [videoNames, setVideoNames] = useState(null);
  const [currentVideoURL, setCurrentVideoURL] = useState(null);
  const [videoPlayerOpen, setVideoPlayerOpen] = useState(false);

  const isMounted = React.useRef(false);

  const refreshlist = () => {
    fetch('http://localhost:8080/video/list', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((videoNames) => {
        console.log('fetch returned');
        if (isMounted.current === true) {
          console.log('setting videonames', videoNames);
          setVideoNames(videoNames);
        }
      })
      .catch(console.warn);
  };

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  });

  useEffect(() => {
    if (videoNames === null) {
      refreshlist();
    }
  });

  const onUploadButton = () => {
    history.push('/upload');
  };

  const onVideoPlayerDialogClose = () => {
    setVideoPlayerOpen(false);
  };

  const onPlayButton = (name) => () => {
    setCurrentVideoURL(`http://localhost:8080/video/play/${name}`);
    setVideoPlayerOpen(true);
  };

  const onDownloadButton = (name) => () => {
    const downloadLink = document.createElement('a');
    downloadLink.setAttribute('href', `http://localhost:8080/video/${name}`);
    downloadLink.click();
  };

  return (
    <div className="videospage">
      <Paper className="videospage-container" elevation={3}>
        <h2>Your Videos</h2>
        <Button
          className="videospage-uploadbutton"
          variant="contained"
          color="primary"
          onClick={onUploadButton}
        >
          Add A Video
        </Button>
        {!!videoNames && videoNames.length > 0 ? (
          videoNames.map((name, index) => (
            <div key={index} className="videospage-listrow">
              <h3 className="videospage-videoname">{name.split('----')[0]}</h3>
              <div className="videospage-videobuttons">
                <Button
                  className="videospage-videobutton"
                  variant="contained"
                  color="secondary"
                  onClick={onPlayButton(name)}
                >
                  Play
                </Button>
                <Button
                  className="videospage-videobutton"
                  variant="contained"
                  color="secondary"
                  onClick={onDownloadButton(name)}
                >
                  Download
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div>Upload some videos to see them here!</div>
        )}
      </Paper>
      <Dialog
        open={videoPlayerOpen}
        onClose={onVideoPlayerDialogClose}
        classes={{ paper: 'videospage-videodialog' }}
      >
        <ReactPlayer
          playing
          className={'videospage-videoplayer'}
          url={currentVideoURL}
          controls
        />
      </Dialog>
    </div>
  );
};

export default VideoList;
