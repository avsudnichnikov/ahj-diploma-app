import Organizer from './Organizer';
import User from './User';

const user = new User(
  document.querySelector('#join'),
  'http://localhost:3000/',
);

const organizer = new Organizer(
  document.querySelector('#organizer'),
  'ws://localhost:3000/',
  user,
);

organizer.init();
