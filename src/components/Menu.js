import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import MenuOverlay from './MenuOverlay';
import { window } from 'global'

const BURGER_STATES = {
    ARROW: 'ARROW',
    BURGER: 'BURGER',
    EXIT: 'EXIT',
}

const Burger = styled.div`
    width: ${props => props.theme.spacing(4)};
    height: ${props => props.theme.spacing(4)};
    left: ${props => props.theme.spacing(4)};
    top: ${props => props.theme.spacing(4)};
    @media ${props => props.theme.media.md} {
        left: ${props => props.theme.spacing(2)};
        top: ${props => props.theme.spacing(2)};
    }
    ${props => props.burgerState !== BURGER_STATES.ARROW ? css`
        cursor: pointer;
        * {
          backdrop-filter: invert(1) grayscale(1);
        }
    ` : css`
        * {
          background-color: black;
        }
    `}
    position: fixed;
    display: inline;
    z-index: 3000;

`

const Line = styled.div`
    z-index: 1000;
    height: 3px;
    width: 100%;
    position: absolute;
    transition: 0.5s cubic-bezier(0.75, 0, 0.26, 0.98), background-color 0.3s linear;
    margin: auto;

    ${props => props.top && css`
        /* x */
        ${props => props.burgerState === BURGER_STATES.EXIT && css` 
            width: 0;
            top:0;
            right: 0;
            left: 0;
            bottom:0;
            /* opacity:0; */
        `}

        /* = */
        ${props => props.burgerState === BURGER_STATES.BURGER && css` 
            right: 0;
            left: 0;
            bottom: calc(100% - 5px);
            opacity:1;
        `}

        /* -> */
        ${props => props.burgerState === BURGER_STATES.ARROW && css` 
            transform: rotate(45deg);
            right: 0;
            width: 30%;
            left: 75%;
            bottom: 52%;
        `}
    `}

    ${props => props.bottom && css`
        /* x */
        ${props => props.burgerState === BURGER_STATES.EXIT && css` 
            width: 0;
            top:0;
            bottom:0;
            /* opacity:0; */
            right: 0;
            left: 0;
        `}

        /* = */
        ${props => props.burgerState === BURGER_STATES.BURGER && css` 
            right: 0;
            left: 0;
            top: calc(100% - 5px);
            /* bottom:5px; */
            opacity:1;
        `}

        /* -> */
        ${props => props.burgerState === BURGER_STATES.ARROW && css` 
            transform: rotate(-45deg);
            right: 0;
            width: 30%;
            left: 75%;
            top: 55%;
        `}
    `}


`


const CrossPart = styled.div`
    height: 3px;
    width: 100%;
    position: absolute;
    transition: 0.5s cubic-bezier(0.75, 0, 0.26, 0.98), background-color 0.3s linear;
    top:0;
    bottom:0;
    margin: auto;
    opacity: ${props => props.rev ? 1 : 0};
    ${props => props.burgerState === BURGER_STATES.EXIT && css`
        opacity: 1;
        transform: ${props => props.rev ? 'rotate(-45deg)' : 'rotate(45deg)'}
    `};

`


export default class Menu extends Component {
    static propTypes = {
    }

    componentDidMount(){
        window.addEventListener('scroll', this.handleScroll.bind(this), true);
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this.handleScroll.bind(this));
    }

    state = {
        LineColor: 'black',
        burgerState: BURGER_STATES.ARROW,
        burgerIndex: 1,
    }

    handleScroll() {
        this.setState({
            burgerState: window.pageYOffset > 5 ? BURGER_STATES.BURGER : BURGER_STATES.ARROW,
        })
        this.setState({
            LineColor: (window.pageYOffset > window.innerHeight * 2 || this.state.burgerState === BURGER_STATES.EXIT ? 'white' : 'black')
        })

    }

    toggleCollapsed (){
        this.setState({
            burgerState: (this.state.burgerState === BURGER_STATES.EXIT) ? BURGER_STATES.BURGER : BURGER_STATES.EXIT,
        })
    }

    render() {
        return (
            <>
            {this.state.burgerState === BURGER_STATES.EXIT && <MenuOverlay />}
            <Burger onClick={this.toggleCollapsed.bind(this)} burgerState={this.state.burgerState}>
                <Line collapsed={this.state.collapsed} top burgerState={this.state.burgerState} bgColor={this.state.LineColor}></Line>
                <Line collapsed={this.state.collapsed} bottom burgerState={this.state.burgerState} bgColor={this.state.LineColor}></Line>
                <CrossPart collapsed={this.state.collapsed} burgerState={this.state.burgerState} bgColor={this.state.LineColor}/>
                <CrossPart collapsed={this.state.collapsed} rev burgerState={this.state.burgerState} bgColor={this.state.LineColor}/>
            </Burger>
            </>
        )
    }
}
