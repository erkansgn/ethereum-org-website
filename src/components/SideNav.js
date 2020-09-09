import React, { useState } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"

import Icon from "./Icon"
import Link from "./Link"

const links = [
  {
    title: "README",
    to: "/developers/learn/",
  },
  {
    title: "Foundational topics",
    to: "/developers/",
    items: [
      {
        title: "Blockchain basics",
        to: "/developers/learn/blockchain-basics/",
      },
      {
        title: "Intro to dapps",
        to: "/developers/learn/dapps/",
      },
      {
        title: "Web2 vs Web3",
        to: "/developers/learn/web2-vs-web3/",
      },
      {
        title: "Programming languages",
        to: "/developers/learn/programming-languages/",
        items: [
          {
            title: "Delphi",
            to: "/developers/learn/programming-languages/delphi/",
          },
          {
            title: ".NET",
            to: "/developers/learn/programming-languages/dot-net/",
          },
          {
            title: "Golang",
            to: "/developers/learn/programming-languages/golang/",
          },
          {
            title: "Java",
            to: "/developers/learn/programming-languages/java/",
          },
          {
            title: "Javascript",
            to: "/developers/learn/programming-languages/javascript/",
          },
          {
            title: "Python",
            to: "/developers/learn/programming-languages/python/",
          },
          {
            title: "Rust",
            to: "/developers/learn/programming-languages/rust/",
          },
        ],
      },
      {
        title: `Accounts`,
        to: `/developers/learn/accounts/`,
      },
      {
        title: "Transactions",
        to: "/developers/learn/transactions/",
      },
      {
        title: "Ethereum virtual machine (EVM)",
        to: "/developers/learn/evm/",
      },
      {
        title: "Gas",
        to: "/developers/learn/gas/",
      },
      {
        title: "Blocks",
        to: "/developers/learn/blocks/",
      },
      {
        title: "Block explorers",
        to: "/developers/learn/block-explorers/",
      },
      {
        title: "Mining",
        to: "/developers/learn/mining/",
      },
      {
        title: "Networks",
        to: "/developers/learn/networks/",
      },
      {
        title: "Nodes and clients",
        to: "/developers/learn/nodes-and-clients/",
      },
    ],
  },
  {
    title: "Ethereum stack",
    to: "/developers/",
    items: [
      {
        title: "Intro to the stack",
        to: "/developers/learn/intro-to-stack/",
      },
      {
        title: `Smart contracts`,
        to: `/developers/learn/smart-contracts/`,
        items: [
          {
            title: `Smart contract languages`,
            to: `/developers/learn/smart-contracts/languages/`,
          },
          {
            title: `Smart contract anatomy`,
            to: `/developers/learn/smart-contracts/anatomy/`,
          },
          {
            title: "Testing smart contracts",
            to: "/developers/learn/smart-contracts/testing-smart-contracts/",
          },
          {
            title: "Compiling smart contracts",
            to: "/developers/learn/smart-contracts/compiling-smart-contracts/",
          },
          {
            title: "Deploying smart contracts",
            to: "/developers/learn/smart-contracts/deploying-smart-contracts/",
          },
        ],
      },
      {
        title: "Javascript client libraries",
        to: "/developers/learn/javascript-client-libraries/",
      },
      {
        title: "Security",
        to: "/developers/learn/security/",
      },
      {
        title: "Storage",
        to: "/developers/learn/storage/",
      },
      {
        title: "Development frameworks",
        to: "/developers/learn/frameworks/",
      },
      {
        title: "Development environments",
        to: "/developers/learn/IDEs/",
      },
    ],
  },
  {
    title: "Advanced",
    to: "/developers/",
    items: [
      {
        title: "Token standards",
        to: "/developers/learn/tokens/",
      },
      {
        title: "Oracles",
        to: "/developers/learn/oracles/",
      },
      {
        title: "Scaling",
        to: "/developers/learn/layer-2-scaling/",
      },
    ],
  },
]

const IconContainer = styled(motion.div)`
  cursor: pointer;
`

const Aside = styled.aside`
  position: sticky;
  top: 6.25rem; /* account for navbar */
  padding: 4rem 0 2rem;
  height: calc(100vh - 80px); /* TODO take footer into account for height? */
  width: calc((100% - 1448px) / 2 + 298px);
  min-width: 298px;
  overflow-y: auto;
  transition: all 0.2s ease-in-out;
  transition: transform 0.2s ease;
  background-color: ${(props) => props.theme.colors.background};
  box-shadow: 1px 0px 0px rgba(0, 0, 0, 0.1);

  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    display: none;
  }
`

const InnerLinks = styled(motion.div)`
  font-size: ${(props) => props.theme.fontSizes.s};
  line-height: 1.6;
  font-weight: 400;
  margin-left: 1rem;
`
const innerLinksVariants = {
  open: {
    opacity: 1,
    display: "block",
  },
  closed: {
    opacity: 0,
    display: "none",
  },
}

const LinkContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem 0.5rem 2rem;
  &:hover {
    color: ${(props) => props.theme.colors.primary};
    background-color: ${(props) => props.theme.colors.ednBackground};
  }
`
const SideNavLink = styled(Link)`
  width: 100%;
  text-decoration: none;
  color: ${(props) => props.theme.colors.text};
  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
  &.active {
    color: ${(props) => props.theme.colors.primary};
  }
`

const NavItem = styled.div``

// TODO inner links flash on navigation...
// Some issue w/ re-render on route change?
const NavLink = ({ item, path }) => {
  const isLinkPartiallyActive = path.includes(item.to)
  const [isOpen, setIsOpen] = useState(isLinkPartiallyActive)

  if (item.items) {
    return (
      <NavItem>
        <LinkContainer>
          <SideNavLink to={item.to}>{item.title} </SideNavLink>
          <IconContainer
            onClick={() => setIsOpen(!isOpen)}
            variants={{
              open: {
                rotate: 0,
                transition: {
                  duration: 0.4,
                },
              },
              closed: { rotate: -90 },
            }}
            animate={isOpen ? "open" : "closed"}
          >
            <Icon name="chevronDown" />
          </IconContainer>
        </LinkContainer>
        <InnerLinks
          key={item.title}
          animate={isOpen ? "open" : "closed"}
          variants={innerLinksVariants}
          initial="closed"
        >
          {item.items.map((childItem, idx) => (
            <NavLink item={childItem} path={path} key={idx} />
          ))}
        </InnerLinks>
      </NavItem>
    )
  }
  return (
    <NavItem>
      <LinkContainer>
        <SideNavLink to={item.to}>{item.title}</SideNavLink>
      </LinkContainer>
    </NavItem>
  )
}

const SideNav = ({ path }) => {
  return (
    <Aside>
      {links.map((item, idx) => (
        <NavLink item={item} path={path} key={idx} />
      ))}
    </Aside>
  )
}

export default SideNav
