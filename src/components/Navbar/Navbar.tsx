import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from 'react-icons/ai';
import './Navbar.css';
import {SidebarData} from "./SidebarData";
import {IconContext} from "react-icons";
import {Col, Container, Row} from "react-bootstrap";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar)

  return (
    <>
      <IconContext.Provider value={{color: '#feb886'}}>
        <Container className="text-center p-0">
          <Col className="col-12">
            <Row className="nav-icons">
              <Link to="#">
                <FaIcons.FaBars onClick={showSidebar}/>
              </Link>
            </Row>
            {SidebarData.map((item, index) => {
              return (
                <Row className="nav-icons" key={index}>
                  <Link to={item.path}>
                    {item.icon}
                  </Link>
                </Row>
              );
            })}
          </Col>
        </Container>

      </IconContext.Provider>

      <IconContext.Provider value={{color: '#f9f9f9'}}>
        <Container className={sidebar ? 'nav-menu active' : 'nav-menu'}>

          <Col className="col-12">
            <Row className="nav-icons">
              <Link to="#">
                <AiIcons.AiOutlineCloseSquare onClick={showSidebar}/>
              </Link>
            </Row>

            {SidebarData.map((item, index) => {
              return (
                <Row className="nav-icons nav-text" key={index}>
                  <Link to={item.path} onClick={showSidebar}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </Row>
              );
            })}
          </Col>
        </Container>
      </IconContext.Provider>

    </>
  )
}

export default Navbar