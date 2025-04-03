import Link from "next/link"
import styled from "styled-components"

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath: string
}

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`

const PaginationList = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
`

const PaginationItem = styled.li`
  margin: 0 0.25rem;
`

const PaginationLink = styled.a<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 4px;
  background-color: ${({ isActive, theme }) => (isActive ? theme.colors.primary : theme.colors.cardBackground)};
  color: ${({ isActive, theme }) => (isActive ? "white" : theme.colors.text)};
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${({ isActive, theme }) => (isActive ? theme.colors.primary : theme.colors.muted)};
  }
`

const PaginationEllipsis = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
`

const Pagination = ({ currentPage, totalPages, basePath }: PaginationProps) => {
  if (totalPages <= 1) {
    return null
  }

  const renderPageNumbers = () => {
    const pageNumbers = []

    // Always show first page
    pageNumbers.push(
      <PaginationItem key={1}>
        <Link href={`${basePath}${1 === 1 ? "" : `?page=${1}`}`} passHref legacyBehavior>
          <PaginationLink isActive={currentPage === 1}>1</PaginationLink>
        </Link>
      </PaginationItem>,
    )

    // Add ellipsis if needed
    if (currentPage > 3) {
      pageNumbers.push(
        <PaginationItem key="ellipsis-1">
          <PaginationEllipsis>...</PaginationEllipsis>
        </PaginationItem>,
      )
    }

    // Add pages around current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i === 1 || i === totalPages) continue // Skip first and last page as they're always shown

      pageNumbers.push(
        <PaginationItem key={i}>
          <Link href={`${basePath}?page=${i}`} passHref legacyBehavior>
            <PaginationLink isActive={currentPage === i}>{i}</PaginationLink>
          </Link>
        </PaginationItem>,
      )
    }

    // Add ellipsis if needed
    if (currentPage < totalPages - 2) {
      pageNumbers.push(
        <PaginationItem key="ellipsis-2">
          <PaginationEllipsis>...</PaginationEllipsis>
        </PaginationItem>,
      )
    }

    // Always show last page
    if (totalPages > 1) {
      pageNumbers.push(
        <PaginationItem key={totalPages}>
          <Link href={`${basePath}?page=${totalPages}`} passHref legacyBehavior>
            <PaginationLink isActive={currentPage === totalPages}>{totalPages}</PaginationLink>
          </Link>
        </PaginationItem>,
      )
    }

    return pageNumbers
  }

  return (
    <PaginationContainer>
      <PaginationList>{renderPageNumbers()}</PaginationList>
    </PaginationContainer>
  )
}

export default Pagination

