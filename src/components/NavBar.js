import React, { useState, useEffect } from 'react';

import {Container} from "react-bootstrap";
import {Navbar} from "react-bootstrap";
import {Nav} from "react-bootstrap";
import {NavDropdown} from "react-bootstrap";


export function NavBar({items}) {
  const [activeSection, setActiveSection] = useState(items[0].ref);

  useEffect(() => {

    const determineActiveSection = () => {
      // Check if the user has scrolled to the bottom of the page - must be the last section
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.offsetHeight;
      if (isAtBottom) {
        setActiveSection(items[items.length - 1].ref);
        return;
      }
      let topSection = null;
      let smallestDistance = Infinity; // Smallest distance from the top of the viewport to the top of a section

      items.forEach(item => {
        const el = document.getElementById(item.ref);
        if (el) {
          const sectionTop = el.offsetTop;
          const viewportTop = window.scrollY;
          const distance = sectionTop - viewportTop;

          // Check if this section is the closest to the top of the viewport but still below the top
          if (distance >= 0 && distance < smallestDistance) {
            smallestDistance = distance;
            topSection = item.ref;
          }
        }
      });

      if (topSection) {
        setActiveSection(topSection);
      }
    }

    const handleScroll = () => {
      determineActiveSection()
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  return (
    // <div id="navbar" className="navbar navbar-expand-sm navbar-light fixed-top">
    <div id="navbar" className="navbar">
    <Navbar expand="lg" fixed="top">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {
              items.map(item => (
             // <Nav.Link className={`nav-link ${activeSection === item.ref && 'active '}`} href={`#`+item.ref}>{item.label}</Nav.Link>
                <li key={`nav_`+item.ref} className="nav-item">
                  <a className={`nav-link ${activeSection === item.ref && 'active '}`} href={`#`+item.ref}>{item.label}</a>
                </li>
              ))
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>

  );
}