import styled from "styled-components"
import Link from "next/link"
import StrapiMedia from "../common/StrapiMedia"

interface Feature {
  id: string
  title: string
  description: string
  icon?: any
  link?: string
}

interface FeatureSectionProps {
  title: string
  subtitle?: string
  features: Feature[]
}

const SectionContainer = styled.section`
  padding: 5rem 2rem;
  background-color: ${({ theme }) => theme.colors.background};
  
  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`

const SectionContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
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
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 700px;
  margin: 0 auto;
`

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`

const FeatureCard = styled.div`
  background-color: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`

const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  margin-bottom: 1.5rem;
  position: relative;
`

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
`

const FeatureDescription = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 1.5rem;
  line-height: 1.6;
`

const FeatureLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  
  &:hover {
    text-decoration: underline;
  }
  
  &::after {
    content: '→';
    margin-left: 0.5rem;
    transition: transform 0.3s ease;
  }
  
  &:hover::after {
    transform: translateX(3px);
  }
`

const FeatureSection = ({ title, subtitle, features }: FeatureSectionProps) => {
  return (
    <SectionContainer>
      <SectionContent>
        <SectionHeader>
          <Title>{title}</Title>
          {subtitle && <Subtitle>{subtitle}</Subtitle>}
        </SectionHeader>

        <FeaturesGrid>
          {features.map((feature) => (
            <FeatureCard key={feature.id}>
              {feature.icon && (
                <IconWrapper>
                  <StrapiMedia media={feature.icon} width={60} height={60} />
                </IconWrapper>
              )}

              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>

              {feature.link && (
                <Link href={feature.link} passHref legacyBehavior>
                  <FeatureLink>Learn more</FeatureLink>
                </Link>
              )}
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </SectionContent>
    </SectionContainer>
  )
}

export default FeatureSection

