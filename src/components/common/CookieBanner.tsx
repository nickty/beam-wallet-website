import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const BannerContainer = styled.div<{ isVisible: boolean }>`
  display: ${props => props.isVisible ? 'flex' : 'none'};
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem 2rem;
  z-index: 1000;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const BannerText = styled.p`
  margin: 0;
  font-size: 0.9rem;
  max-width: 70%;
  
  @media (max-width: 768px) {
    max-width: 100%;
    text-align: center;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const AcceptButton = styled.button`
  background-color: #ff3366;
  color: white;
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  
  &:hover {
    background-color: #e62e5c;
  }
`;

const RejectButton = styled.button`
  background-color: transparent;
  color: #333;
  border: 1px solid #ccc;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Check if user has already made a cookie choice
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);
  
  const handleAccept = async () => {
    try {
      // Log consent to backend
      await axios.post('/api/cookie-consent', {
        consent: true,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
      });
      
      // Save consent in localStorage
      localStorage.setItem('cookieConsent', 'accepted');
      setIsVisible(false);
      
      // Initialize analytics
      initializeAnalytics();
    } catch (error) {
      console.error('Error logging cookie consent:', error);
    }
  };
  
  const handleReject = async () => {
    try {
      // Log rejection to backend
      await axios.post('/api/cookie-consent', {
        consent: false,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
      });
      
      // Save rejection in localStorage
      localStorage.setItem('cookieConsent', 'rejected');
      setIsVisible(false);
    } catch (error) {
      console.error('Error logging cookie rejection:', error);
    }
  };
  
  const initializeAnalytics = () => {
    // Initialize Google Analytics
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
      // Google Analytics script would be loaded here
      console.log('Analytics initialized');
    }
    
    // Initialize Facebook Pixel
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_FB_PIXEL_ID) {
      // Facebook Pixel script would be loaded here
      console.log('Facebook Pixel initialized');
    }
  };
  
  return (
    <BannerContainer isVisible={isVisible}>
      <BannerText>
        We use cookies to enhance your experience on our website. By continuing to browse, you agree to our use of cookies.
        Please read our <a href="/privacy-policy">Privacy Policy</a> for more information.
      </BannerText>
      <ButtonGroup>
        <AcceptButton onClick={handleAccept}>Accept All</AcceptButton>
        <RejectButton onClick={handleReject}>Reject Non-Essential</RejectButton>
      </ButtonGroup>
    </BannerContainer>
  );
};

export default CookieBanner;