import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Videos from 'pages/Video/Videos.js';
import Upload from 'pages/Upload/Upload.js';

import { BrowserRouter as Router, Route } from 'react-router-dom';

describe('Videos page', () => {
  it('should render basic elements and page without videos', () => {
    const server = setupServer(
      rest.get('http://localhost:8080/video/list', (req, res, ctx) => {
        return res(ctx.json([]));
      })
    );
    server.listen();
    render(<Videos />);
    const pageHeader = screen.getByText('Your Videos');
    expect(pageHeader).toBeInTheDocument();
    const addVideoButton = screen.getByText('Add A Video');
    expect(addVideoButton).toBeInTheDocument();
    const addVideoHint = screen.getByText(
      'Upload some videos to see them here!'
    );
    expect(addVideoHint).toBeInTheDocument();
    server.close();
  });
});

describe('Upload page', () => {
  it('should render basic elements', () => {
    render(<Upload />);
    const pageHeader = screen.getByText('Upload Video File');
    expect(pageHeader).toBeInTheDocument();
    const subHeader1 = screen.getByText(
      'File types available are .mp4, .wmv and .avi'
    );
    expect(subHeader1).toBeInTheDocument();
    const subHeader2 = screen.getByText('File size is limited to 50 MB');
    expect(subHeader2).toBeInTheDocument();
    const dropzoneHint = screen.getByText('Drag and drop a file here or click');
    expect(dropzoneHint).toBeInTheDocument();
  });
  it('should redirect to videos page if cancel clicked', () => {
    render(
      <Router>
        <Upload />
        <Route path="/">mock Videos page</Route>
      </Router>
    );
    const cancelbutton = screen.getByText('Cancel');
    fireEvent.click(cancelbutton);
    const mockVideosPage = screen.getByText('mock Videos page');
    expect(mockVideosPage).toBeInTheDocument();
  });
});
