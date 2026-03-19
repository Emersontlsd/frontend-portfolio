import React from 'react';
import Hero from '../../components/Home/Hero';
import ProjectSlider from '../../components/Home/ProjectSlider';

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