import React from 'react';
import HeroSection from './HeroSection';
import FeatureSection from './FeatureSection';
import ContentSection from './ContentSection';
import TestimonialSection from './TestimonialSection';
import CtaSection from './CtaSection';

interface SectionRendererProps {
  sections: any[];
}

const SectionRenderer = ({ sections }: SectionRendererProps) => {
  if (!sections || sections.length === 0) {
    return null;
  }

  return (
    <>
      {sections.map((section, index) => {
        const { __component, ...props } = section;
        
        // Map component types to our React components
        switch (__component) {
          case 'sections.hero-section':
            return <HeroSection key={index} {...props} />;
          case 'sections.feature-section':
            return <FeatureSection key={index} {...props} />;
          case 'sections.content-section':
            return <ContentSection key={index} {...props} />;
          case 'sections.testimonial-section':
            return <TestimonialSection key={index} {...props} />;
          case 'sections.cta-section':
            return <CtaSection key={index} {...props} />;
          default:
            console.warn(`Unknown section type: ${__component}`);
            return null;
        }
      })}
    </>
  );
};

export default SectionRenderer;