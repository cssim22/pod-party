/* eslint-disable react/prop-types */
import React from 'react';
import PodcastClub from '../components/PodcastClub.jsx';
import PodcastContainer from '../containers/PodcastContainer.jsx';
import GroupChat from '../components/GroupChat.jsx';
import { useState, useEffect } from 'react';
import { Button, TextField } from '@material-ui/core';
import { flexbox } from '@material-ui/system';
import Box from '@material-ui/core/Box';

const ClubPageContainer = (props) => {

  const [groupId, setGroupId] = useState(props.groupId);
  const [podcasts, setPodcasts] = useState([]);
  const [messages, setMessages ] = useState([]);
  const [email, setEmail ] = useState('');
  
  useEffect(() => {
    setGroupId(props.groupId);
  });

  useEffect(() => {
    const cookieEmail = document.cookie.split('; ').find(row => row.startsWith('email='))
      .split('=')[1].replace('%40', '@');
    setEmail(cookieEmail);
  }, []);

  useEffect(() => {
    fetch('/podcasts',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          group_id: props.groupId,
        })
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPodcasts(data);
        console.log('PODCASTS: ', data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [groupId]);


  useEffect(() => {
    fetch('/getcomments',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          group_id: props.groupId,
        })
      }
    ).then((response) => {
      return response.json();
    }).then((data) => {
      console.log('GET MESSAGES ', data);
      setMessages(data);
    }).catch(err => console.log(err));
  }, [groupId]);

  const sendMessage = () => {
    const message = document.getElementById('message').value;
    console.log(email);
    console.log('message: ', message);

    fetch('/addcomment', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          group_id: props.groupId,
          email,
          comment: message,
        })
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        data.comment.first_name = data.first_name;
        const copy = [...messages];
        copy.push(data.comment);
        setMessages(copy);
      })
      .catch(err => console.log(err));
  };
  const msgs = [];
  for (const message of messages){
    msgs.push(<li><b>{message.first_name}:</b> {message.comment}</li>);
  }

  return (
    <div>
      <h2>{props.name} Podcast Club</h2>
      <PodcastClub groupId={props.groupId} setPodcasts={setPodcasts} podcasts={podcasts}/>
      <h3>Group Chat</h3>
      <Box display="flex" justifyContent="center" alignItems="center">
        <form id="PodcastForm" method="POST" action="/club/addPodcast">
          <TextField label='message' name='message' variant="outlined" id="message"></TextField>
          <Button type='button' onClick={() => sendMessage()} variant="outlined">Send</Button>
        </form>
      </Box>
      <ul>
        {msgs}
      </ul>
      <br></br>
      <h3>Currently listening to...</h3>
      <PodcastContainer groupId={props.groupId} podcasts={podcasts} />
    </div>
  );
};

export default ClubPageContainer;