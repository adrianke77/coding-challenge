const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const { Stream } = require('stream');

const videosDir = '/videos';

const videosPath = `${__dirname}${videosDir}`;

if (!fs.existsSync(videosPath)) {
  fs.mkdirSync(videosPath);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, videosPath);
  },

  filename: function (req, file, cb) {
    // prevent clashes if user uploads files with same names
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${file.originalname}----${uniqueSuffix}`);
  },
});

const upload = multer({ storage });

app.use(cors());

app.use(express.json());

app.use('/video/play', express.static(videosPath));

app.post('/video', upload.single('videoFile'), (req, res, next) => {
  // Originally intended to generate thumbnails from videos here,
  // to be returned with GET /video/list,
  // but apparently a OS-level installation of ffmpeg is needed
  // in order to call thumbnail generation from Node.
  // In production circumstances we could install ffmpeg in the deployment script.
  if (!req.file) {
    const err = new Error('No file found');
    err.httpStatusCode = 400;
    return next(err);
  }
  res.status(200).end();
});

app.get('/video/list', function (req, res) {
  fs.readdir(videosPath, (err, filenames) => {
    if (err) {
      return next(err);
    }
    res.status(200).json(filenames);
  });
});

app.get('/video/:filename', function (req, res) {
  const filename = req.params.filename;
  try {
    res
      .status(200)
      .download(
        `${__dirname}${videosDir}/${filename}`,
        filename.split('----')[0]
      );
  } catch (err) {
    next(err);
  }
});

const server = app.listen(8080, () => {
  console.log('Listening on port 8080');
});

module.exports = server;
