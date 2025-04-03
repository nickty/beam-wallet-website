import React from 'react';
import styled from 'styled-components';
import Layout from '@/components/common/Layout';
import Link from 'next/link';
import Image from 'next/image';

const HeroSection = styled.section`
  background: linear-gradient(135deg, #ff3366 0%, #ff6b98 100%);
  color: white;
  padding: 4rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  max-width: 800px;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const HeroButton = styled.a`
  background-color: white;
  color: #ff3366;
  padding: 0.75rem 2rem;
  border-radius: 4px;
  font-weight: bold;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #f5f5f5;
    transform: translateY(-2px);
  }
`;

const TokenBanner = styled.div`
  background-color: #00c2a8;
  color: white;
  padding: 1.5rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const TokenText = styled.h2`
  font-size: 1.5rem;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const TokenButton = styled.a`
  background-color: #ff3366;
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  font-weight: bold;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #e62e5c;
  }
`;

const FeaturesSection = styled.section`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureImage = styled.div`
  position: relative;
  height: 400px;
  
  @media (max-width: 768px) {
    height: 300px;
  }
`;

const FeatureContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const FeatureTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #333;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const FeatureDescription = styled.p`
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const AppDownloadSection = styled.div`
  display: flex;
  gap: 1rem;
`;

const HomePage = () => {
  return (
    <Layout>
      <TokenBanner>
        <TokenText>Participate in the BEAM TOKEN pre-sale</TokenText>
        <TokenButton href="/token-sale">Click here</TokenButton>
      </TokenBanner>
      
      <HeroSection>
        <HeroContent>
          <HeroTitle>Shaping the future of Retail</HeroTitle>
          <HeroSubtitle>
            Beam's mission is to unite digital payments, consumer experience and retail marketing. 
            To do this, Beam Wallet focuses on all the pillars of its innovation strategy, 
            creating an authentic 360° solution adapted to all retail and commerce agents.
          </HeroSubtitle>
          <HeroButton href="/about-us">Learn More</HeroButton>
        </HeroContent>
      </HeroSection>
      
      <FeaturesSection>
        <FeatureImage>
          <Image 
            src="/images/app-mockup.png" 
            alt="Beam Wallet App" 
            fill 
            style={{ objectFit: 'contain' }} 
          />
        </FeatureImage>
        <FeatureContent>
          <FeatureTitle>The complete retail solution</FeatureTitle>
          <FeatureDescription>
            Beam Wallet provides a comprehensive platform that connects consumers with businesses, 
            offering seamless payment solutions, loyalty programs, and personalized marketing opportunities. 
            Our technology helps retailers increase customer engagement and drive sales.
          </FeatureDescription>
          <AppDownloadSection>
            <Link href="https://apps.apple.com/app/beam-wallet/id123456789" passHref>
              <Image 
                src="/images/app-store-badge.png" 
                alt="Download on App Store" 
                width={140} 
                height={42} 
              />
            </Link>
            <Link href="https://play.google.com/store/apps/details?id=com.beamwallet" passHref>
              <Image 
                src="/images/google-play-badge.png" 
                alt="Get it on Google Play" 
                width={140} 
                height={42} 
              />
            </Link>
          </AppDownloadSection>
        </FeatureContent>
      </FeaturesSection>
    </Layout>
  );
};

export default HomePage;