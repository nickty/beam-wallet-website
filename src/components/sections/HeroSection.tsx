import styled from "styled-components"
import Link from "next/link"
import StrapiMedia from "../common/StrapiMedia"

interface HeroSectionProps {
  title: string
  subtitle?: string
  backgroundImage?: any
  ctaText?: string
  ctaLink?: string
  image?: any
  variant?: "primary" | "secondary"
}

const HeroContainer = styled.section<{ variant?: "primary" | "secondary" }>`
  position: relative;
  padding: 6rem 2rem;
  background-color: ${({ theme, variant }) => (variant === "secondary" ? theme.colors.muted : theme.colors.background)};
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`

const BackgroundImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  opacity: 0.1;
`

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  @media (max-width: 992px) {
    flex-direction: column;
    text-align: center;
  }
`

const TextContent = styled.div`
  flex: 1;
  padding-right: 2rem;
  
  @media (max-width: 992px) {
    padding-right: 0;
    margin-bottom: 2rem;
  }
`

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`

const Subtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 600px;
  
  @media (max-width: 992px) {
    margin-left: auto;
    margin-right: auto;
  }
`

const CtaButton = styled.a`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 4px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary}dd;
    transform: translateY(-2px);
  }
`

const ImageWrapper = styled.div`
  flex: 1;
  position: relative;
  height: 400px;
  
  @media (max-width: 768px) {
    height: 300px;
    width: 100%;
  }
`

const HeroSection = ({
  title,
  subtitle,
  backgroundImage,
  ctaText,
  ctaLink,
  image,
  variant = "primary",
}: HeroSectionProps) => {
  return (
    <HeroContainer variant={variant}>
      {backgroundImage && (
        <BackgroundImageWrapper>
          <StrapiMedia media={backgroundImage} fill priority />
        </BackgroundImageWrapper>
      )}

      <HeroContent>
        <TextContent>
          <Title>{title}</Title>
          {subtitle && <Subtitle>{subtitle}</Subtitle>}

          {ctaText && ctaLink && (
            <Link href={ctaLink} passHref legacyBehavior>
              <CtaButton>{ctaText}</CtaButton>
            </Link>
          )}
        </TextContent>

        {image && (
          <ImageWrapper>
            <StrapiMedia media={image} fill />
          </ImageWrapper>
        )}
      </HeroContent>
    </HeroContainer>
  )
}

export default HeroSection

