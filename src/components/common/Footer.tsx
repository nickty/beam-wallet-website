import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';

const FooterContainer = styled.footer`
  background-color: #222;
  color: #fff;
  padding: 3rem 2rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterLogo = styled.div`
  margin-bottom: 1rem;
`;

const FooterText = styled.p`
  color: #aaa;
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const FooterHeading = styled.h3`
  color: #fff;
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FooterLink = styled.li`
  margin-bottom: 0.75rem;
  
  a {
    color: #aaa;
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.3s ease;
    
    &:hover {
      color: #ff3366;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialIcon = styled.a`
  color: #fff;
  font-size: 1.2rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: #ff3366;
  }
`;

const BottomFooter = styled.div`
  max-width: 1200px;
  margin: 2rem auto 0;
  padding-top: 2rem;
  border-top: 1px solid #444;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: #aaa;
  font-size: 0.9rem;
`;

const LegalLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  
  a {
    color: #aaa;
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.3s ease;
    
    &:hover {
      color: #ff3366;
    }
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const AppDownloadLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterColumn>
          <FooterLogo>
            <Image src="/images/logo-white.svg" alt="Beam Wallet Logo" width={120} height={40} />
          </FooterLogo>
          <FooterText>
            Beam Wallet unites digital payments, consumer experience and retail marketing with a 360° solution 
            adapted to all retail and commerce agents.
          </FooterText>
          <SocialLinks>
            <SocialIcon href="https://facebook.com/beamwallet" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </SocialIcon>
            <SocialIcon href="https://twitter.com/beamwallet" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </SocialIcon>
            <SocialIcon href="https://instagram.com/beamwallet" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </SocialIcon>
            <SocialIcon href="https://linkedin.com/company/beamwallet" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin-in"></i>
            </SocialIcon>
          </SocialLinks>
        </FooterColumn>
        
        <FooterColumn>
          <FooterHeading>About Us</FooterHeading>
          <FooterLinks>
            <FooterLink>
              <Link href="/about-us/beam-wallet">Beam Wallet</Link>
            </FooterLink>
            <FooterLink>
              <Link href="/about-us/news">News</Link>
            </FooterLink>
            <FooterLink>
              <Link href="/blog">Blog</Link>
            </FooterLink>
            <FooterLink>
              <Link href="/careers">Careers</Link>
            </FooterLink>
            <FooterLink>
              <Link href="/investors">Investors</Link>
            </FooterLink>
            <FooterLink>
              <Link href="/beam-token-info">Beam Token Info</Link>
            </FooterLink>
          </FooterLinks>
        </FooterColumn>
        
        <FooterColumn>
          <FooterHeading>Our Solutions</FooterHeading>
          <FooterLinks>
            <FooterLink>
              <Link href="/for-consumers/pay-in-store">Pay in Store</Link>
            </FooterLink>
            <FooterLink>
              <Link href="/for-consumers/pay-online">Pay Online</Link>
            </FooterLink>
            <FooterLink>
              <Link href="/for-business">For Business</Link>
            </FooterLink>
            <FooterLink>
              <Link href="/technology-partners">Technology Partners</Link>
            </FooterLink>
            <FooterLink>
              <Link href="/local-partners">Local Partners</Link>
            </FooterLink>
            <FooterLink>
              <Link href="/partnerships">Partnerships</Link>
            </FooterLink>
          </FooterLinks>
        </FooterColumn>
        
        <FooterColumn>
          <FooterHeading>Download App</FooterHeading>
          <FooterText>
            Get the Beam Wallet app on your mobile device to start enjoying seamless payments and exclusive rewards.
          </FooterText>
          <AppDownloadLinks>
            <Link href="https://apps.apple.com/app/beam-wallet/id123456789" passHref>
              <Image 
                src="/images/app-store-badge-white.png" 
                alt="Download on App Store" 
                width={140} 
                height={42} 
              />
            </Link>
            <Link href="https://play.google.com/store/apps/details?id=com.beamwallet" passHref>
              <Image 
                src="/images/google-play-badge-white.png" 
                alt="Get it on Google Play" 
                width={140} 
                height={42} 
              />
            </Link>
          </AppDownloadLinks>
        </FooterColumn>
      </FooterContent>
      
      <BottomFooter>
        <Copyright>
          &copy; {new Date().getFullYear()} Beam Wallet. All rights reserved.
        </Copyright>
        <LegalLinks>
          <Link href="/terms-and-conditions">Terms and Conditions</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/contact">Contact Us</Link>
        </LegalLinks>
      </BottomFooter>
    </FooterContainer>
  );
};

export default Footer;