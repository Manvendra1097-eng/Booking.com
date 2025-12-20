import React from 'react';
import Hero from './hero.section';
import Trending from './trending.section';
import Search from '../feature/search';

function Home() {
  return (
    <div>
      <Hero />
      <Search />
      <Trending />
    </div>
  );
}

export default Home;
