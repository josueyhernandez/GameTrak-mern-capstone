import React, { useEffect, useState } from "react";
import { Button, Col, Container, Navbar, Nav, Row } from "react-bootstrap";
import { useProvideUser, } from 'hooks/globalStates';

function Header(props) {
    const { state, dispatch } = useProvideUser();
    function expandedWin() {
        return (
            <Nav id="header-bar">
                <Nav.Item>
                    <div class="log">
                        <button class="logout" onClick={() => window.location.replace("/")}>Logout</button>
                        <button class="back" onClick={() => window.location.replace("/games")}>Back to List</button>
                    </div>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/character">Characters</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/item">Items</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/places">Places</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/skills">Skills</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/attributes">Attributes</Nav.Link>
                </Nav.Item></Nav>
        )
    }
    function colWin() {
        return (
            <div></div>
        )
    }
    return (
        <React.Fragment >
            <Navbar bg="dark" variant="dark" id="nav-bar" sticky="top" >
                <Nav.Link href="/"></Nav.Link>
                <Nav.Link id="nav-title" href="/"><div>Hello</div></Nav.Link>
                {expandedWin()}
            </Navbar>
        </React.Fragment>
    )

}
export default Header;