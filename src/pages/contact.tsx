import React from 'react';
import styled from 'styled-components';
import Layout from '@/components/common/Layout';
import ContactForm from '@/components/forms/ContactForm';

const ContactContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  
  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;

const ContactHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const ContactTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ContactSubtitle = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 700px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const ContactContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const ContactInfo = styled.div`
  @media (max-width: 992px) {
    order: 2;
  }
`;

const ContactInfoTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
`;

const ContactInfoItem = styled.div`
  margin-bottom: 2rem;
`;

const ContactInfoItemTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const ContactInfoItemText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 0.5rem;
`;

const ContactInfoItemLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ContactFormContainer = styled.div`
  @media (max-width: 992px) {
    order: 1;
  }
`;

const ContactPage = () => {
  return (
    <Layout
      title="Contact Us | Beam Wallet"
      description="Get in touch with the Beam Wallet team. We're here to help with any questions or inquiries you may have."
    >
      <ContactContainer>
        <ContactHeader>
          <ContactTitle>Contact Us</ContactTitle>
          <ContactSubtitle>
            Have questions or want to learn more about Beam Wallet? Our team is here to help.
            Fill out the form below and we'll get back to you as soon as possible.
          </ContactSubtitle>
        </ContactHeader>
        
        <ContactContent>
          <ContactFormContainer>
            <ContactForm />
          </ContactFormContainer>
          
          <ContactInfo>
            <ContactInfoTitle>Get in Touch</ContactInfoTitle>
            
            <ContactInfoItem>
              <ContactInfoItemTitle>General Inquiries</ContactInfoItemTitle>
              <ContactInfoItemText>
                For general questions about Beam Wallet and our services.
              </ContactInfoItemText>
              <ContactInfoItemLink href="mailto:info@beamwallet.com">
                info@beamwallet.com
              </ContactInfoItemLink>
            </ContactInfoItem>
            
            <ContactInfoItem>
              <ContactInfoItemTitle>Customer Support</ContactInfoItemTitle>
              <ContactInfoItemText>
                Need help with your Beam Wallet account or have technical issues?
              </ContactInfoItemText>
              <ContactInfoItemLink href="mailto:support@beamwallet.com">
                support@beamwallet.com
              </ContactInfoItemLink>
            </ContactInfoItem>
            
            <ContactInfoItem>
              <ContactInfoItemTitle>Business Development</ContactInfoItemTitle>
              <ContactInfoItemText>
                Interested in partnering with Beam Wallet or exploring business opportunities?
              </ContactInfoItemText>
              <ContactInfoItemLink href="mailto:business@beamwallet.com">
                business@beamwallet.com
              </ContactInfoItemLink>
            </ContactInfoItem>
            
            <ContactInfoItem>
              <ContactInfoItemTitle>Media & Press</ContactInfoItemTitle>
              <ContactInfoItemText>
                For media inquiries, press releases, and interview requests.
              </ContactInfoItemText>
              <ContactInfoItemLink href="mailto:media@beamwallet.com">
                media@beamwallet.com
              </ContactInfoItemLink>
            </ContactInfoItem>
            
            <ContactInfoItem>
              <ContactInfoItemTitle>Office Location</ContactInfoItemTitle>
              <ContactInfoItemText>
                Beam Wallet Headquarters<br />
                123 Innovation Street<br />
                Dubai, United Arab Emirates
              </ContactInfoItemText>
            </ContactInfoItem>
          </ContactInfo>
        </ContactContent>
      </ContactContainer>
    </Layout>
  );
};

export default ContactPage;