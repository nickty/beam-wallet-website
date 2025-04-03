import styled from "styled-components"
import Link from "next/link"
import StrapiMedia from "../common/StrapiMedia"

interface CtaSectionProps {
  title: string
  subtitle?: string
  buttonText: string
  buttonLink: string
  backgroundImage?: any
}

const SectionContainer = styled.section`
  position: relative;
  padding: 5rem 2rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`

const BackgroundImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  opacity: 0.2;
`

const SectionContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  text-align: center;
`

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const Subtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`

const CtaButton = styled.a`
  display: inline-block;
  background-color: white;
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.75rem 2rem;
  border-radius: 4px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.9);
    transform: translateY(-2px);
  }
`

const CtaSection = ({ title, subtitle, buttonText, buttonLink, backgroundImage }: CtaSectionProps) => {
  return (
    <SectionContainer>
      {backgroundImage && (
        <BackgroundImageWrapper>
          <StrapiMedia media={backgroundImage} fill />
        </BackgroundImageWrapper>
      )}

      <SectionContent>
        <Title>{title}</Title>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}

        <Link href={buttonLink} passHref legacyBehavior>
          <CtaButton>{buttonText}</CtaButton>
        </Link>
      </SectionContent>
    </SectionContainer>
  )
}

export default CtaSection

