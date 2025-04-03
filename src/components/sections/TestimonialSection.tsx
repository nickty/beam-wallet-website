import styled from "styled-components"
import StrapiMedia from "../common/StrapiMedia"

interface Testimonial {
  id: string
  attributes: {
    name: string
    position: string
    company: string
    quote: string
    rating?: number
    image?: any
  }
}

interface TestimonialSectionProps {
  title: string
  testimonials: {
    data: Testimonial[]
  }
}

const SectionContainer = styled.section`
  padding: 5rem 2rem;
  background-color: ${({ theme }) => theme.colors.muted};
  
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
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const TestimonialsGrid = styled.div`
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

const TestimonialCard = styled.div`
  background-color: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
`

const QuoteText = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex-grow: 1;
  font-style: italic;
  
  &::before {
    content: '"';
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.primary};
  }
  
  &::after {
    content: '"';
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`

const TestimonialFooter = styled.div`
  display: flex;
  align-items: center;
`

const ImageWrapper = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 1rem;
  position: relative;
`

const PersonInfo = styled.div`
  display: flex;
  flex-direction: column;
`

const Name = styled.span`
  font-weight: 600;
  margin-bottom: 0.25rem;
`

const Position = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

const Rating = styled.div`
  display: flex;
  margin-top: 0.5rem;
  color: ${({ theme }) => theme.colors.primary};
`

const TestimonialSection = ({ title, testimonials }: TestimonialSectionProps) => {
  const renderRating = (rating: number) => {
    const stars = []
    for (let i = 0; i < 5; i++) {
      stars.push(<span key={i}>{i < rating ? "★" : "☆"}</span>)
    }
    return stars
  }

  return (
    <SectionContainer>
      <SectionContent>
        <SectionHeader>
          <Title>{title}</Title>
        </SectionHeader>

        <TestimonialsGrid>
          {testimonials.data.map((testimonial) => (
            <TestimonialCard key={testimonial.id}>
              <QuoteText>{testimonial.attributes.quote}</QuoteText>

              <TestimonialFooter>
                {testimonial.attributes.image?.data && (
                  <ImageWrapper>
                    <StrapiMedia media={testimonial.attributes.image} fill />
                  </ImageWrapper>
                )}

                <PersonInfo>
                  <Name>{testimonial.attributes.name}</Name>
                  <Position>
                    {testimonial.attributes.position}, {testimonial.attributes.company}
                  </Position>

                  {testimonial.attributes.rating && <Rating>{renderRating(testimonial.attributes.rating)}</Rating>}
                </PersonInfo>
              </TestimonialFooter>
            </TestimonialCard>
          ))}
        </TestimonialsGrid>
      </SectionContent>
    </SectionContainer>
  )
}

export default TestimonialSection

