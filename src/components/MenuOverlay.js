import React from 'react'
// import PropTypes from 'prop-types'
import styled from 'styled-components'
import HoverTransformer from './HoverTransformer'
import slyt from '../graphics/slyt.svg'
import nikolaj from '../graphics/nikolaj.svg'
import PropTypes from 'prop-types'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import SlytterAniLink from './Shared/SlytterAniLink'

const Root = styled.div`
    z-index: 2999;
    @keyframes fadeIn {
        from{
            opacity: 0;
        }
        to{
            opacity: 1;
        }
    }
    animation: 0.4s fadeIn forwards;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(1, 1, 1, 0.7);
    color: white;
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto;
    backdrop-filter: invert(1) grayscale(1);


`

const MenuWrapper = styled.div`
	justify-self: center;
	align-self: center;
`


const MenuLines = styled.div`
	text-align: center;
	font-size: 16px;
    background: rgb(255,255,255);
	padding: 20px 0; 
	max-width: 300px;
	margin: 10px auto;
	color: #292929;
	width: 100%;
	font-weight: lighter;
	cursor: pointer;
    transition: 0.4s cubic-bezier(0, 0.59, 0.08, 1);
	:hover {
		max-width: 270px;
		font-weight: bold;
	}
    @keyframes moveOut {
        0% {
    	    opacity: 0;
            transform: perspective(0px) rotateX(90deg) rotateY(0) scale(0.90);
        }
        100% {
	        opacity: 1;	
            transform: perspective(1000px) rotateX(0deg) rotateY(0) scale(1);; 
        }
    }
    animation: moveOut ${props => 0.6 + 0.15 * props.i}s forwards cubic-bezier(0.77, 0, 0.175, 1);

`

const Logo = styled.img`
	width: 100%;
	max-width: 300px;
	display: flex;
`

function MenuOverlay(props) {

	const {
		onClose,
	} = props



	return (
		<Root onClick={onClose}>
			<MenuWrapper >
				<HoverTransformer>
					<Logo src={slyt}></Logo>
				</HoverTransformer>
				<SlytterAniLink to="/" onClick={onClose}>
					<HoverTransformer>
						<MenuLines i={0}>schlüter</MenuLines>
					</HoverTransformer>
				</SlytterAniLink>
				<SlytterAniLink to="/cases" onClick={onClose}>
					<HoverTransformer>
						<MenuLines i={1}>all cases</MenuLines>
					</HoverTransformer>
				</SlytterAniLink>
				<SlytterAniLink to={window.location.origin + '#about'} onClick={onClose}>
					<HoverTransformer>
						<MenuLines i={2}>about</MenuLines>
					</HoverTransformer>
				</SlytterAniLink>

				{/*<HoverTransformer>*/}
				{/*	<MenuLines i={3}>expirience</MenuLines>*/}
				{/*</HoverTransformer>*/}
			</MenuWrapper>
		</Root>
	)
}

MenuOverlay.propTypes = {
	onClose: PropTypes.func.isRequired,
}

export default MenuOverlay

