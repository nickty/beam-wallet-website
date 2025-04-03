import styled from "styled-components"
import Link from "next/link"
import StrapiMedia from "../common/StrapiMedia"
import { formatDate } from "@/utils/helpers"

interface BlogCardProps {
  post: any
}

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
`

const CardContent = styled.div`
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`

const PostMeta = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

const Category = styled.span`
  background-color: ${({ theme }) => theme.colors.muted};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  margin-right: 0.75rem;
`

const Date = styled.span``

const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  line-height: 1.3;
`

const Excerpt = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 1.5rem;
  line-height: 1.6;
  flex-grow: 1;
`

const ReadMore = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  
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

const BlogCard = ({ post }: BlogCardProps) => {
  const { attributes } = post
  const { title, slug, excerpt, publishedAt, featuredImage, categories } = attributes

  return (
    <Card>
      {featuredImage?.data && (
        <Link href={`/blog/${slug}`} passHref legacyBehavior>
          <a>
            <ImageContainer>
              <StrapiMedia media={featuredImage} fill />
            </ImageContainer>
          </a>
        </Link>
      )}

      <CardContent>
        <PostMeta>
          {categories?.data && categories.data.length > 0 && <Category>{categories.data[0].attributes.name}</Category>}
          <Date>{formatDate(publishedAt)}</Date>
        </PostMeta>

        <Title>
          <Link href={`/blog/${slug}`} passHref legacyBehavior>
            <a style={{ color: "inherit", textDecoration: "none" }}>{title}</a>
          </Link>
        </Title>

        {excerpt && <Excerpt>{excerpt}</Excerpt>}

        <Link href={`/blog/${slug}`} passHref legacyBehavior>
          <ReadMore>Read more</ReadMore>
        </Link>
      </CardContent>
    </Card>
  )
}

export default BlogCard

