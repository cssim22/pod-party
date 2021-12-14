/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@material-ui/core';
import { flexbox } from '@material-ui/system';
import Box from '@material-ui/core/Box';
import PodcastContainer from '../containers/PodcastContainer.jsx';

const PodcastClub = (props) => {

  // added podcast state needs to be passed down to podcast component to be displayed
  const [newPodcast, addNewPodcast] = useState('');
  const [podcast, setPodcast] = useState([]);
  const [friends, addFriend] = useState('');

  const addPodcast = () => {
    const copy = [...podcast];
    copy.push(newPodcast);
    setPodcast(copy);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const form = e.target;

  //   fetch(form.action, {
  //     method: form.action,
  //     headers: {
  //       'Content-type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       podcast
  //     })
  //   })
  //     .then((res) => res.json())
  //     .catch(res => console.log('Error in sending group'.res));
  // };

  const handlePodcast = (e) => {
    addNewPodcast(e.target.value);
  };

  const handleFriend = (e) => {
    addFriend(e.target.value);
  };

  const postPodcast = () => {
    fetch('/addpodcast',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          group_id: props.groupId,
          podcast_name: newPodcast
        })
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // setPodcasts(data);
        console.log('PODCASTS: ', data);
        console.log('props.podcasts ', props.podcasts);
        const copy = [...props.podcasts];
        console.log('copy ', copy);
        copy.push(data);
        props.setPodcasts(copy);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div style={{ width: '100%' }}>
      <Box display="flex" justifyContent="center" alignItems="center">
        <form id="PodcastForm" method="POST" action="/club/addPodcast">
          <TextField label='podcast' name='podcast' variant="outlined" style={{ margin: 20 }} onChange={handlePodcast}></TextField>
          <Button type='button' variant="outlined" onClick={() => postPodcast()}>Add Podcast</Button>
        </form>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        <form id="PodcastForm" method="POST" action="/club/addPodcast">
          <TextField label='friend' name='friend' variant="outlined" style={{ margin: 20 }} onChange={handleFriend}></TextField>
          <Button type='button' onClick={() => window.alert('friends feature coming soon!')} variant="outlined">Add Friend</Button>
        </form>
      </Box>
      {/* <PodcastContainer podcast={podcast} groupId={props.groupId}/> */}
    </div>


  );
};

export default PodcastClub;
