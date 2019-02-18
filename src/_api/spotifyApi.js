
import axios from 'axios';

export function attemptLogin(){
  axios.get('https://accounts.spotify.com/authorize');
}
