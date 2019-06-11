import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import Home from './Home';
import Login from './Login.js';
import MyDecks from './MyDecks.js';
import CardSearch from './CardSearch.js';
import CardModal from './CardModal.js';
import DeckForm from './DeckForm.js';
import NewUser from './NewUser.js';

const API='http://api.magicthegathering.io/v1/cards?'

const BACKGROUNDS = [
  'http://magic.wizards.com/sites/mtg/files/images/wallpaper/Verdurous-Gearhulk_KLD_2560x1600_Wallpaper.jpg',
  'https://hdwallpaperim.com/wp-content/uploads/2017/08/23/458370-Magic_The_Gathering-Trading_Card_Games-748x421.jpg',
  'https://wallpaperplay.com/walls/full/e/6/a/137371.jpg',
  'https://i.imgur.com/XrIPH0W.jpg',
  'https://images2.alphacoders.com/861/thumb-1920-86152.jpg',
  'https://video-images.vice.com/articles/59f737eaf35dc52c2acfd216/lede/1509382986614-image10.jpeg',
  'https://i.imgur.com/coDFoDK.jpg'
]

let chooseBackground = BACKGROUNDS[Math.floor(Math.random()*BACKGROUNDS.length)]

function App() {
  return (    
      <div className="App" style={{backgroundImage: `url(${chooseBackground})`}}>
        <header className="App-header">
          <Home />
        </header>
          <Login />
          <MyDecks />
          <CardSearch />
          <CardModal/>
          <DeckForm/>
          <NewUser/>
      </div>
  );
}

export default App;
