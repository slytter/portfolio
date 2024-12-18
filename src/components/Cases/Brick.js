import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const Root = styled.div`
  position: relative;
  width: 100%;
  outline: 1px solid #000;
  outline-offset: 0;
  background-color: white;
  z-index: 1500;

  :after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }

  ${props => props.db && css`
    grid-column: auto / span 2;

    :after {
      padding-bottom: 50%;
    }
  `}

  ${props => props.projectOpened && css`
        will-change: transform;
        transform-style: preserve-3d; 
        /* transition: all 1s cubic-bezier(0.19, 1, 0.22, 1); */
        /* transform: perspective(2000px) rotateX(0deg) rotateY(90deg) translateZ(1000px);  */
    `}
`

const Content = styled.div`
    ${props => props.db && css`
        position: absolute;
        top:5px;
        bottom:5px;
        left:${props => props.theme.spacing(4)};
        right:5px;
        display: flex;
        align-items: center;
        font-weight:bold;
        color: black;
        font-size: 30px;
    `}
`

const Title = styled.h2``


const Brick = props => {
	const tileIndex = props.getTileIndex()
	return (
		<Root
			className={props.className}
			db={props.db}
			projectOpened={props.projectOpened}
			i={tileIndex}>
			{props.db &&
			<Content db={props.db}>
				<Title>
					{props.title}
				</Title>
				{props.children}
			</Content>
			}
		</Root>
	)
}

Brick.propTypes = {
	className: PropTypes.string,
	db: PropTypes.bool,
	projectOpened: PropTypes.bool,
	getTileIndex: PropTypes.func,
	title: PropTypes.string,
	children: PropTypes.node,
}

export default Brick
