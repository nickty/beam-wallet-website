import React from 'react';
import styled from 'styled-components';
import Button from '@/components/common/Button';
import Image from 'next/image';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage?: string;
  imageUrl?: string;
  imageAlt?: string;
  variant?: 'primary' | 'secondary';
}

const HeroContainer = styled.section<{ backgroundImage?: string; variant: string }>`
  padding: 5rem 2rem;
  position: relative;
  overflow: hidden;
  
  ${props => props.backgroundImage ? `
    background-image: url(${props.backgroundImage});
    background-size: cover;
    background-position: center;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 1;
    }
  ` : `
    background: ${props.variant === 'primary' 
      ? 'linear-gradient(135deg, #ff3366 0%, #ff6b98 100%)' 
      : 'linear-gradient(135deg, #00c2a8 0%, #00e6c8 100%)'};
  `}
  
  color: white;
  
  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
  }
`;

const HeroContent = styled.div<{ hasImage: boolean }>`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: ${props => props.hasImage ? '1fr 1fr' : '1fr'};
  gap: 3rem;
  align-items: center;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const HeroTextContent = styled.div`
  @media (max-width: 992px) {
    order: 2;
  }
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  
  @media (max-width: 992px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 576px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  line-height: 1.6;
  opacity: 0.9;
  
  @media (max-width: 576px) {
    font-size: 1.1rem;
  }
`;

const HeroImageContainer = styled.div`
  position: relative;
  height: 400px;
  
  @media (max-width: 992px) {
    order: 1;
    height: 300px;
    margin-bottom: 2rem;
  }
`;

const Hero = ({
  title,
  subtitle,
  ctaText,
  ctaLink,
  backgroundImage,
  imageUrl,
  imageAlt = 'Hero image',
  variant = 'primary'
}: HeroProps) => {
  return (
    <HeroContainer backgroundImage={backgroundImage} variant={variant}>
      <HeroContent hasImage={!!imageUrl}>
        <HeroTextContent>
          <HeroTitle>{title}</HeroTitle>
          <HeroSubtitle>{subtitle}</HeroSubtitle>
          <Button href={ctaLink} size="large">
            {ctaText}
          </Button>
        </HeroTextContent>
        
        {imageUrl && (
          <HeroImageContainer>
            <Image 
              src={imageUrl || "/placeholder.svg"} 
              alt={imageAlt} 
              fill 
              style={{ objectFit: 'contain' }} 
              priority
            />
          </HeroImageContainer>
        )}
      </HeroContent>
    </HeroContainer>
  );
};

export default Hero;