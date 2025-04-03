import styled from "styled-components"
import StrapiMedia from "../common/StrapiMedia"
import RichText from "../common/RichText"

interface ContentSectionProps {
  title: string
  content: string
  image?: any
  imagePosition?: "left" | "right"
  backgroundColor?: string
}

const SectionContainer = styled.section<{ backgroundColor?: string }>`
  padding: 5rem 2rem;
  background-color: ${({ backgroundColor, theme }) => backgroundColor || theme.colors.background};
  
  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`

const SectionContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const ContentWrapper = styled.div<{ imagePosition?: "left" | "right" }>`
  display: flex;
  align-items: center;
  flex-direction: ${({ imagePosition }) => (imagePosition === "left" ? "row-reverse" : "row")};
  gap: 4rem;
  
  @media (max-width: 992px) {
    flex-direction: column;
    gap: 2rem;
  }
`

const TextContent = styled.div`
  flex: 1;
`

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const StyledRichText = styled(RichText)`
  line-height: 1.6;
`

const ImageWrapper = styled.div`
  flex: 1;
  position: relative;
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 992px) {
    width: 100%;
  }
`

const ContentSection = ({ title, content, image, imagePosition = "right", backgroundColor }: ContentSectionProps) => {
  return (
    <SectionContainer backgroundColor={backgroundColor}>
      <SectionContent>
        <ContentWrapper imagePosition={imagePosition}>
          <TextContent>
            <Title>{title}</Title>
            <StyledRichText content={content} />
          </TextContent>

          {image && (
            <ImageWrapper>
              <StrapiMedia media={image} fill />
            </ImageWrapper>
          )}
        </ContentWrapper>
      </SectionContent>
    </SectionContainer>
  )
}

export default ContentSection

