import React from 'react';
import styled from 'styled-components';
import Layout from '@/components/common/Layout';
import Hero from '@/components/sections/Hero';
import Button from '@/components/common/Button';
import Image from 'next/image';

const AboutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  
  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;

const AboutSection = styled.section`
  margin-bottom: 5rem;
`;

const AboutTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const AboutText = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const MissionVisionContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-top: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const MissionVisionCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  padding: 2rem;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.medium};
`;

const MissionVisionTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const MissionVisionText = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
`;

const TeamContainer = styled.div`
  margin-top: 3rem;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const TeamMember = styled.div`
  text-align: center;
`;

const TeamMemberImage = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto 1.5rem;
  border-radius: 50%;
  overflow: hidden;
`;

const TeamMemberName = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
`;

const TeamMemberPosition = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 1rem;
`;

const TeamMemberBio = styled.p`
  font-size: 0.9rem;
  line-height: 1.6;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-top: 3rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  text-align: center;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const AboutUsPage = () => {
  return (
    <Layout
      title="About Us | Beam Wallet"
      description="Learn about Beam Wallet's mission, vision, and the team behind the innovative payment solution."
    >
      <Hero
        title="About Beam Wallet"
        subtitle="We're on a mission to revolutionize the way people pay and businesses operate in the retail ecosystem."
        ctaText="Join Our Team"
        ctaLink="/careers"
        variant="primary"
      />
      
      <AboutContainer>
        <AboutSection>
          <AboutTitle>Our Story</AboutTitle>
          <AboutText>
            Founded in 2012, Beam Wallet started with a simple idea: to make payments easier, faster, and more rewarding. 
            What began as a mobile payment solution has evolved into a comprehensive platform that connects consumers 
            with businesses, offering seamless payment solutions, loyalty programs, and personalized marketing opportunities.
          </AboutText>
          <AboutText>
            Over the years, we've grown from a small startup to a leading fintech company, serving millions of users 
            and thousands of merchants across multiple markets. Our journey has been driven by innovation, customer-centricity, 
            and a relentless pursuit of excellence.
          </AboutText>
          <AboutText>
            Today, Beam Wallet is at the forefront of the digital payment revolution, continuously pushing the boundaries 
            of what's possible in the world of retail and commerce. We're proud of how far we've come, but we're even more 
            excited about where we're headed.
          </AboutText>
          
          <MissionVisionContainer>
            <MissionVisionCard>
              <MissionVisionTitle>Our Mission</MissionVisionTitle>
              <MissionVisionText>
                To unite digital payments, consumer experience, and retail marketing through an authentic 360° solution 
                adapted to all retail and commerce agents, empowering businesses and delighting consumers.
              </MissionVisionText>
            </MissionVisionCard>
            
            <MissionVisionCard>
              <MissionVisionTitle>Our Vision</MissionVisionTitle>
              <MissionVisionText>
                To shape the future of retail by creating a seamless ecosystem where payments, loyalty, and marketing 
                converge to deliver exceptional value to both businesses and consumers.
              </MissionVisionText>
            </MissionVisionCard>
          </MissionVisionContainer>
        </AboutSection>
        
        <AboutSection>
          <AboutTitle>Our Team</AboutTitle>
          <AboutText>
            Behind Beam Wallet's success is a diverse team of passionate individuals who bring their unique skills, 
            perspectives, and experiences to the table. From seasoned fintech experts to creative problem-solvers, 
            our team is united by a shared commitment to innovation and excellence.
          </AboutText>
          
          <TeamContainer>
            <TeamGrid>
              <TeamMember>
                <TeamMemberImage>
                  <Image 
                    src="/images/team/ceo.jpg" 
                    alt="CEO" 
                    fill 
                    style={{ objectFit: 'cover' }} 
                  />
                </TeamMemberImage>
                <TeamMemberName>John Smith</TeamMemberName>
                <TeamMemberPosition>Chief Executive Officer</TeamMemberPosition>
                <TeamMemberBio>
                  John brings over 20 years of experience in fintech and digital payments. 
                  He leads Beam Wallet's strategic vision and global expansion.
                </TeamMemberBio>
              </TeamMember>
              
              <TeamMember>
                <TeamMemberImage>
                  <Image 
                    src="/images/team/cto.jpg" 
                    alt="CTO" 
                    fill 
                    style={{ objectFit: 'cover' }} 
                  />
                </TeamMemberImage>
                <TeamMemberName>Sarah Johnson</TeamMemberName>
                <TeamMemberPosition>Chief Technology Officer</TeamMemberPosition>
                <TeamMemberBio>
                  Sarah oversees Beam Wallet's technology strategy and innovation roadmap, 
                  ensuring our platform remains at the cutting edge of fintech.
                </TeamMemberBio>
              </TeamMember>
              
              <TeamMember>
                <TeamMemberImage>
                  <Image 
                    src="/images/team/coo.jpg" 
                    alt="COO" 
                    fill 
                    style={{ objectFit: 'cover' }} 
                  />
                </TeamMemberImage>
                <TeamMemberName>Michael Chen</TeamMemberName>
                <TeamMemberPosition>Chief Operating Officer</TeamMemberPosition>
                <TeamMemberBio>
                  Michael drives operational excellence across Beam Wallet, 
                  optimizing processes and scaling our business efficiently.
                </TeamMemberBio>
              </TeamMember>
            </TeamGrid>
            
            <div className="text-center mt-5">
              <Button href="/about-us/team" variant="outline">
                Meet the Full Team
              </Button>
            </div>
          </TeamContainer>
        </AboutSection>
        
        <AboutSection>
          <AboutTitle>Beam Wallet by the Numbers</AboutTitle>
          <AboutText>
            Our growth and impact in the digital payment space reflect our commitment to innovation and excellence.
          </AboutText>
          
          <StatsContainer>
            <StatCard>
              <StatNumber>5M+</StatNumber>
              <StatLabel>Active Users</StatLabel>
            </StatCard>
            
            <StatCard>
              <StatNumber>10K+</StatNumber>
              <StatLabel>Merchant Partners</StatLabel>
            </StatCard>
            
            <StatCard>
              <StatNumber>15+</StatNumber>
              <StatLabel>Countries</StatLabel>
            </StatCard>
            
            <StatCard>
              <StatNumber>$2B+</StatNumber>
              <StatLabel>Annual Transaction Volume</StatLabel>
            </StatCard>
          </StatsContainer>
        </AboutSection>
      </AboutContainer>
    </Layout>
  );
};

export default AboutUsPage;