import React from 'react';

import { Section } from './styles.js/styles';
import logo from '../../utils/graphics/logo.png';

const AboutPage = () => {
  return (
    <Section>
      <div style={{ width: '100%', marginTop: '50px' }} className="contain">
        <div><img className="logo" src={logo} alt="Code The Dream"></img></div>
        <h3 style={{ color: 'black' }}><strong>Who we are</strong></h3>
        <div className="about">
          <p><strong>Our mission is to help drivers earn a fair and equitable income, by giving them the ability to share in the ownership of the companies they drive for.</strong></p>
          <p><strong>A cooperative (also known as co-operative, co-op, or coop) is "an autonomous association of persons united voluntarily to meet their common economic, social, and cultural needs and aspirations through a jointly-owned enterprise". In other words, it is a group of like-minded people working together in an enterprise to achieve a common goal.</strong></p>
        </div>
      </div>
    </Section>
  )
}

export default AboutPage;