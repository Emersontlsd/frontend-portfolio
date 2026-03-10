import React from 'react';
import Hero from '../components/Hero';
import ProjectSlider from '../components/ProjectSlider';

const Home = () => {
  return (
    <main>
      <Hero />
      <section id="projetos" className='py-20'>
        <ProjectSlider />
      </section>
    </main>
  )
}

export default Home;