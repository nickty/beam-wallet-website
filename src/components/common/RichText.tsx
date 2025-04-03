import ReactMarkdown from "react-markdown"
import styled from "styled-components"

const RichTextContainer = styled.div`
  h1, h2, h3, h4, h5, h6 {
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    font-weight: 700;
    line-height: 1.2;
  }
  
  h1 {
    font-size: 2.5rem;
  }
  
  h2 {
    font-size: 2rem;
  }
  
  h3 {
    font-size: 1.75rem;
  }
  
  h4 {
    font-size: 1.5rem;
  }
  
  h5 {
    font-size: 1.25rem;
  }
  
  h6 {
    font-size: 1rem;
  }
  
  p {
    margin-bottom: 1rem;
    line-height: 1.6;
  }
  
  ul, ol {
    margin-bottom: 1rem;
    padding-left: 2rem;
    
    li {
      margin-bottom: 0.5rem;
    }
  }
  
  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  blockquote {
    border-left: 4px solid ${({ theme }) => theme.colors.primary};
    padding-left: 1rem;
    font-style: italic;
    margin-left: 0;
    margin-right: 0;
  }
  
  code {
    background-color: ${({ theme }) => theme.colors.muted};
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    font-family: monospace;
  }
  
  pre {
    background-color: ${({ theme }) => theme.colors.muted};
    padding: 1rem;
    border-radius: 5px;
    overflow-x: auto;
    
    code {
      background-color: transparent;
      padding: 0;
    }
  }
  
  img {
    max-width: 100%;
    height: auto;
    border-radius: 5px;
    margin: 1rem 0;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1rem;
    
    th, td {
      border: 1px solid ${({ theme }) => theme.colors.border};
      padding: 0.5rem;
    }
    
    th {
      background-color: ${({ theme }) => theme.colors.muted};
    }
  }
`

interface RichTextProps {
  content: string
  className?: string
}

const RichText = ({ content, className }: RichTextProps) => {
  if (!content) return null

  return (
    <RichTextContainer className={className}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </RichTextContainer>
  )
}

export default RichText

