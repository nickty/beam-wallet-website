import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  href?: string;
  children: ReactNode;
  isLoading?: boolean;
}

interface StyledButtonProps {
  variant: ButtonVariant;
  size: ButtonSize;
  fullWidth: boolean;
  isLoading?: boolean;
}

const buttonStyles = css<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  border-radius: 4px;
  transition: all 0.3s ease;
  cursor: pointer;
  text-decoration: none;
  
  ${props => props.fullWidth && `
    width: 100%;
  `}
  
  ${props => props.isLoading && `
    opacity: 0.7;
    cursor: not-allowed;
  `}
  
  ${props => {
    switch (props.size) {
      case 'small':
        return `
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        `;
      case 'large':
        return `
          padding: 0.875rem 2rem;
          font-size: 1.125rem;
        `;
      default: // medium
        return `
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
        `;
    }
  }}
  
  ${props => {
    switch (props.variant) {
      case 'secondary':
        return `
          background-color: #00c2a8;
          color: white;
          border: none;
          
          &:hover {
            background-color: #00a08a;
          }
          
          &:focus {
            box-shadow: 0 0 0 3px rgba(0, 194, 168, 0.3);
          }
        `;
      case 'outline':
        return `
          background-color: transparent;
          color: #ff3366;
          border: 2px solid #ff3366;
          
          &:hover {
            background-color: rgba(255, 51, 102, 0.1);
          }
          
          &:focus {
            box-shadow: 0 0 0 3px rgba(255, 51, 102, 0.3);
          }
        `;
      case 'text':
        return `
          background-color: transparent;
          color: #ff3366;
          border: none;
          padding-left: 0.5rem;
          padding-right: 0.5rem;
          
          &:hover {
            background-color: rgba(255, 51, 102, 0.1);
          }
          
          &:focus {
            box-shadow: none;
          }
        `;
      default: // primary
        return `
          background-color: #ff3366;
          color: white;
          border: none;
          
          &:hover {
            background-color: #e62e5c;
          }
          
          &:focus {
            box-shadow: 0 0 0 3px rgba(255, 51, 102, 0.3);
          }
        `;
    }
  }}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    
    &:hover {
      ${props => {
        switch (props.variant) {
          case 'secondary':
            return `background-color: #00c2a8;`;
          case 'outline':
            return `background-color: transparent;`;
          case 'text':
            return `background-color: transparent;`;
          default: // primary
            return `background-color: #ff3366;`;
        }
      }}
    }
  }
`;

const StyledButton = styled.button<StyledButtonProps>`
  ${buttonStyles}
`;

const StyledLinkButton = styled.a<StyledButtonProps>`
  ${buttonStyles}
`;

const LoadingSpinner = styled.span`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const Button = ({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  href,
  children,
  isLoading = false,
  ...props
}: ButtonProps) => {
  const buttonProps = {
    variant,
    size,
    fullWidth,
    isLoading,
    ...props
  };
  
  if (href) {
    return (
      <Link href={href} passHref legacyBehavior>
        <StyledLinkButton {...buttonProps}>
          {isLoading && <LoadingSpinner />}
          {children}
        </StyledLinkButton>
      </Link>
    );
  }
  
  return (
    <StyledButton {...buttonProps}>
      {isLoading && <LoadingSpinner />}
      {children}
    </StyledButton>
  );
};

export default Button;