"use client"

import { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import Link from "next/link"
import { useRouter } from "next/router"
import Image from "next/image"

const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`

const Logo = styled.div`
  position: relative;
  width: 120px;
  height: 40px;
`

const Nav = styled.nav`
  display: flex;
  align-items: center;
  
  @media (max-width: 992px) {
    display: none;
  }
`

const NavItem = styled.div`
  position: relative;
  margin-left: 1.5rem;
`

const NavLink = styled.a<{ active?: boolean; hasDropdown?: boolean }>`
  color: ${({ theme, active }) => (active ? theme.colors.primary : theme.colors.text)};
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 0;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
  
  ${({ hasDropdown }) =>
    hasDropdown &&
    `
    &::after {
      content: '';
      display: inline-block;
      width: 0;
      height: 0;
      margin-left: 0.5rem;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 5px solid currentColor;
      transition: transform 0.3s ease;
    }
    
    &:hover::after {
      transform: rotate(180deg);
    }
  `}
`

const Dropdown = styled.ul<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 0.5rem 0;
  min-width: 200px;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  transform: ${({ isOpen }) => (isOpen ? "translateY(0)" : "translateY(-10px)")};
  transition: all 0.3s ease;
  z-index: 10;
`

const DropdownItem = styled.li`
  list-style: none;
  padding: 0.5rem 1rem;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.muted};
  }
`

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (max-width: 992px) {
    display: block;
  }
`

const MobileMenu = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 80%;
  max-width: 300px;
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  transform: ${({ isOpen }) => (isOpen ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.3s ease;
  z-index: 1000;
  overflow-y: auto;
  
  @media (min-width: 993px) {
    display: none;
  }
`

const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  cursor: pointer;
`

const MobileNavItem = styled.div`
  margin-bottom: 1rem;
`

const MobileNavLink = styled.a<{ active?: boolean }>`
  color: ${({ theme, active }) => (active ? theme.colors.primary : theme.colors.text)};
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 0;
  display: block;
  font-size: 1.1rem;
`

const MobileDropdownButton = styled.button<{ isOpen: boolean }>`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  text-align: left;
  font-size: 1.1rem;
  cursor: pointer;
  
  &::after {
    content: '${({ isOpen }) => (isOpen ? "−" : "+")}';
    margin-left: 0.5rem;
  }
`

const MobileDropdown = styled.ul<{ isOpen: boolean }>`
  padding-left: 1rem;
  margin-top: 0.5rem;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
`

const MobileDropdownItem = styled.li`
  list-style: none;
  margin-bottom: 0.5rem;
`

const Overlay = styled.div<{ isVisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
  transition: all 0.3s ease;
  z-index: 999;
  
  @media (min-width: 993px) {
    display: none;
  }
`

const ActionButton = styled.a`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  margin-left: 2rem;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary}dd;
  }
  
  @media (max-width: 992px) {
    display: none;
  }
`

const MobileActionButton = styled.a`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  display: block;
  text-align: center;
  margin-top: 2rem;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary}dd;
  }
`

const Header = () => {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean }>({})
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  const toggleDropdown = (key: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const closeAllDropdowns = () => {
    setOpenDropdowns({})
  }

  const handleClickOutside = (event: MouseEvent) => {
    Object.entries(dropdownRefs.current).forEach(([key, ref]) => {
      if (ref && !ref.contains(event.target as Node) && openDropdowns[key]) {
        toggleDropdown(key)
      }
    })
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [openDropdowns])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  const isActive = (path: string) => {
    return router.pathname === path || router.pathname.startsWith(`${path}/`)
  }

  return (
    <HeaderContainer>
      <HeaderContent>
        <Link href="/" passHref legacyBehavior>
          <a>
            <Logo>
              <Image src="/images/logo.svg" alt="Beam Wallet Logo" fill style={{ objectFit: "contain" }} priority />
            </Logo>
          </a>
        </Link>

        <Nav>
          {/* About Us Dropdown */}
          <NavItem
            ref={(el) => (dropdownRefs.current["about"] = el)}
            onMouseEnter={() => toggleDropdown("about")}
            onMouseLeave={() => toggleDropdown("about")}
          >
            <NavLink href="#" onClick={(e) => e.preventDefault()} active={isActive("/about-us")} hasDropdown={true}>
              About Us
            </NavLink>
            <Dropdown isOpen={!!openDropdowns["about"]}>
              <DropdownItem>
                <Link href="/about-us/beam-wallet" passHref legacyBehavior>
                  <NavLink>Beam Wallet</NavLink>
                </Link>
              </DropdownItem>
              <DropdownItem>
                <Link href="/about-us/news" passHref legacyBehavior>
                  <NavLink>News</NavLink>
                </Link>
              </DropdownItem>
              <DropdownItem>
                <Link href="/blog" passHref legacyBehavior>
                  <NavLink>Blog</NavLink>
                </Link>
              </DropdownItem>
              <DropdownItem>
                <Link href="/careers" passHref legacyBehavior>
                  <NavLink>Careers</NavLink>
                </Link>
              </DropdownItem>
              <DropdownItem>
                <Link href="/investors" passHref legacyBehavior>
                  <NavLink>Investors</NavLink>
                </Link>
              </DropdownItem>
            </Dropdown>
          </NavItem>

          {/* For Consumers Dropdown */}
          <NavItem
            ref={(el) => (dropdownRefs.current["consumers"] = el)}
            onMouseEnter={() => toggleDropdown("consumers")}
            onMouseLeave={() => toggleDropdown("consumers")}
          >
            <NavLink
              href="#"
              onClick={(e) => e.preventDefault()}
              active={isActive("/for-consumers")}
              hasDropdown={true}
            >
              For Consumers
            </NavLink>
            <Dropdown isOpen={!!openDropdowns["consumers"]}>
              <DropdownItem>
                <Link href="/for-consumers/pay-in-store" passHref legacyBehavior>
                  <NavLink>Pay in Store</NavLink>
                </Link>
              </DropdownItem>
              <DropdownItem>
                <Link href="/for-consumers/pay-online" passHref legacyBehavior>
                  <NavLink>Pay Online</NavLink>
                </Link>
              </DropdownItem>
              <DropdownItem>
                <Link href="/for-consumers/rewards" passHref legacyBehavior>
                  <NavLink>Rewards</NavLink>
                </Link>
              </DropdownItem>
              <DropdownItem>
                <Link href="/for-consumers/offers" passHref legacyBehavior>
                  <NavLink>Offers</NavLink>
                </Link>
              </DropdownItem>
              <DropdownItem>
                <Link href="/for-consumers/security" passHref legacyBehavior>
                  <NavLink>Security</NavLink>
                </Link>
              </DropdownItem>
            </Dropdown>
          </NavItem>

          {/* For Business Dropdown */}
          <NavItem
            ref={(el) => (dropdownRefs.current["business"] = el)}
            onMouseEnter={() => toggleDropdown("business")}
            onMouseLeave={() => toggleDropdown("business")}
          >
            <NavLink href="#" onClick={(e) => e.preventDefault()} active={isActive("/for-business")} hasDropdown={true}>
              For Business
            </NavLink>
            <Dropdown isOpen={!!openDropdowns["business"]}>
              <DropdownItem>
                <Link href="/for-business/payment-solutions" passHref legacyBehavior>
                  <NavLink>Payment Solutions</NavLink>
                </Link>
              </DropdownItem>
              <DropdownItem>
                <Link href="/for-business/marketing-platform" passHref legacyBehavior>
                  <NavLink>Marketing Platform</NavLink>
                </Link>
              </DropdownItem>
              <DropdownItem>
                <Link href="/for-business/loyalty-program" passHref legacyBehavior>
                  <NavLink>Loyalty Program</NavLink>
                </Link>
              </DropdownItem>
              <DropdownItem>
                <Link href="/for-business/analytics" passHref legacyBehavior>
                  <NavLink>Analytics</NavLink>
                </Link>
              </DropdownItem>
              <DropdownItem>
                <Link href="/for-business/case-studies" passHref legacyBehavior>
                  <NavLink>Case Studies</NavLink>
                </Link>
              </DropdownItem>
            </Dropdown>
          </NavItem>

          {/* Partners Dropdown */}
          <NavItem
            ref={(el) => (dropdownRefs.current["partners"] = el)}
            onMouseEnter={() => toggleDropdown("partners")}
            onMouseLeave={() => toggleDropdown("partners")}
          >
            <NavLink href="#" onClick={(e) => e.preventDefault()} active={isActive("/partners")} hasDropdown={true}>
              Partners
            </NavLink>
            <Dropdown isOpen={!!openDropdowns["partners"]}>
              <DropdownItem>
                <Link href="/partners/technology-partners" passHref legacyBehavior>
                  <NavLink>Technology Partners</NavLink>
                </Link>
              </DropdownItem>
              <DropdownItem>
                <Link href="/partners/local-partners" passHref legacyBehavior>
                  <NavLink>Local Partners</NavLink>
                </Link>
              </DropdownItem>
              <DropdownItem>
                <Link href="/partners/become-a-partner" passHref legacyBehavior>
                  <NavLink>Become a Partner</NavLink>
                </Link>
              </DropdownItem>
            </Dropdown>
          </NavItem>

          {/* Contact Link */}
          <NavItem>
            <Link href="/contact" passHref legacyBehavior>
              <NavLink active={isActive("/contact")}>Contact</NavLink>
            </Link>
          </NavItem>
        </Nav>

        <ActionButton
          href="https://apps.apple.com/app/beam-wallet/id123456789"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download App
        </ActionButton>

        <MobileMenuButton onClick={() => setMobileMenuOpen(true)}>
          <i className="fas fa-bars"></i>
        </MobileMenuButton>
      </HeaderContent>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen}>
        <MobileMenuHeader>
          <Logo>
            <Image src="/images/logo.svg" alt="Beam Wallet Logo" fill style={{ objectFit: "contain" }} />
          </Logo>
          <CloseButton onClick={() => setMobileMenuOpen(false)}>
            <i className="fas fa-times"></i>
          </CloseButton>
        </MobileMenuHeader>

        <MobileNavItem>
          <MobileDropdownButton isOpen={!!openDropdowns["mobileAbout"]} onClick={() => toggleDropdown("mobileAbout")}>
            About Us
          </MobileDropdownButton>
          <MobileDropdown isOpen={!!openDropdowns["mobileAbout"]}>
            <MobileDropdownItem>
              <Link href="/about-us/beam-wallet" passHref legacyBehavior>
                <MobileNavLink>Beam Wallet</MobileNavLink>
              </Link>
            </MobileDropdownItem>
            <MobileDropdownItem>
              <Link href="/about-us/news" passHref legacyBehavior>
                <MobileNavLink>News</MobileNavLink>
              </Link>
            </MobileDropdownItem>
            <MobileDropdownItem>
              <Link href="/blog" passHref legacyBehavior>
                <MobileNavLink>Blog</MobileNavLink>
              </Link>
            </MobileDropdownItem>
            <MobileDropdownItem>
              <Link href="/careers" passHref legacyBehavior>
                <MobileNavLink>Careers</MobileNavLink>
              </Link>
            </MobileDropdownItem>
            <MobileDropdownItem>
              <Link href="/investors" passHref legacyBehavior>
                <MobileNavLink>Investors</MobileNavLink>
              </Link>
            </MobileDropdownItem>
          </MobileDropdown>
        </MobileNavItem>

        <MobileNavItem>
          <MobileDropdownButton
            isOpen={!!openDropdowns["mobileConsumers"]}
            onClick={() => toggleDropdown("mobileConsumers")}
          >
            For Consumers
          </MobileDropdownButton>
          <MobileDropdown isOpen={!!openDropdowns["mobileConsumers"]}>
            <MobileDropdownItem>
              <Link href="/for-consumers/pay-in-store" passHref legacyBehavior>
                <MobileNavLink>Pay in Store</MobileNavLink>
              </Link>
            </MobileDropdownItem>
            <MobileDropdownItem>
              <Link href="/for-consumers/pay-online" passHref legacyBehavior>
                <MobileNavLink>Pay Online</MobileNavLink>
              </Link>
            </MobileDropdownItem>
            <MobileDropdownItem>
              <Link href="/for-consumers/rewards" passHref legacyBehavior>
                <MobileNavLink>Rewards</MobileNavLink>
              </Link>
            </MobileDropdownItem>
            <MobileDropdownItem>
              <Link href="/for-consumers/offers" passHref legacyBehavior>
                <MobileNavLink>Offers</MobileNavLink>
              </Link>
            </MobileDropdownItem>
            <MobileDropdownItem>
              <Link href="/for-consumers/security" passHref legacyBehavior>
                <MobileNavLink>Security</MobileNavLink>
              </Link>
            </MobileDropdownItem>
          </MobileDropdown>
        </MobileNavItem>

        <MobileNavItem>
          <MobileDropdownButton
            isOpen={!!openDropdowns["mobileBusiness"]}
            onClick={() => toggleDropdown("mobileBusiness")}
          >
            For Business
          </MobileDropdownButton>
          <MobileDropdown isOpen={!!openDropdowns["mobileBusiness"]}>
            <MobileDropdownItem>
              <Link href="/for-business/payment-solutions" passHref legacyBehavior>
                <MobileNavLink>Payment Solutions</MobileNavLink>
              </Link>
            </MobileDropdownItem>
            <MobileDropdownItem>
              <Link href="/for-business/marketing-platform" passHref legacyBehavior>
                <MobileNavLink>Marketing Platform</MobileNavLink>
              </Link>
            </MobileDropdownItem>
            <MobileDropdownItem>
              <Link href="/for-business/loyalty-program" passHref legacyBehavior>
                <MobileNavLink>Loyalty Program</MobileNavLink>
              </Link>
            </MobileDropdownItem>
            <MobileDropdownItem>
              <Link href="/for-business/analytics" passHref legacyBehavior>
                <MobileNavLink>Analytics</MobileNavLink>
              </Link>
            </MobileDropdownItem>
            <MobileDropdownItem>
              <Link href="/for-business/case-studies" passHref legacyBehavior>
                <MobileNavLink>Case Studies</MobileNavLink>
              </Link>
            </MobileDropdownItem>
          </MobileDropdown>
        </MobileNavItem>

        <MobileNavItem>
          <MobileDropdownButton
            isOpen={!!openDropdowns["mobilePartners"]}
            onClick={() => toggleDropdown("mobilePartners")}
          >
            Partners
          </MobileDropdownButton>
          <MobileDropdown isOpen={!!openDropdowns["mobilePartners"]}>
            <MobileDropdownItem>
              <Link href="/partners/technology-partners" passHref legacyBehavior>
                <MobileNavLink>Technology Partners</MobileNavLink>
              </Link>
            </MobileDropdownItem>
            <MobileDropdownItem>
              <Link href="/partners/local-partners" passHref legacyBehavior>
                <MobileNavLink>Local Partners</MobileNavLink>
              </Link>
            </MobileDropdownItem>
            <MobileDropdownItem>
              <Link href="/partners/become-a-partner" passHref legacyBehavior>
                <MobileNavLink>Become a Partner</MobileNavLink>
              </Link>
            </MobileDropdownItem>
          </MobileDropdown>
        </MobileNavItem>

        <MobileNavItem>
          <Link href="/contact" passHref legacyBehavior>
            <MobileNavLink active={isActive("/contact")}>Contact</MobileNavLink>
          </Link>
        </MobileNavItem>

        <MobileActionButton
          href="https://apps.apple.com/app/beam-wallet/id123456789"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download App
        </MobileActionButton>
      </MobileMenu>

      <Overlay isVisible={mobileMenuOpen} onClick={() => setMobileMenuOpen(false)} />
    </HeaderContainer>
  )
}

export default Header

