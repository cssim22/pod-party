/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Podcasts from '../components/Podcasts.jsx';

const PodcastContainer = (props) => {

  const podcasts = [];
  for (const podcast of props.podcasts){
    podcasts.push(<Podcasts podcast_name={podcast.podcast_name} author={podcast.author}/>);
  }
  return (
    <div>
      <ul>
        {podcasts}
      </ul>
    </div>
  );
};

export default PodcastContainer;