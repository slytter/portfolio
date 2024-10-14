import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Fade } from 'react-reveal'
import Container from '../Shared/Container'
import Img from 'gatsby-image'
import Markdown from '../Shared/Markdown'

const Root = styled.div`
    padding: ${props => props.theme.spacing(16, 0)};
`

const Content = styled.div`
    display: grid;
    grid-gap: ${props => props.theme.spacing(6)};
    grid-template-columns: 2fr 2fr;
    align-items: center;
    @media ${props => props.theme.media.lg} {
        grid-template-columns: 1fr ;
    }
    color: white;
`


const ImageContainer = styled.div`
    width: 100%;
    padding-bottom: 100%;
    grid-row: 1 / -1;
    position: relative;
    
`

const Image = styled.img`
    img{
        object-position: top center !important;
    }
    div{
        padding-bottom:0 !important;
    }
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: all 0.3s ease-in-out;
`

const GradiantBG = styled.div`
    margin-top: calc(-100vw / 10 * 4);
    padding-top: calc(100vw / 10 * 4);

    @media ${props => props.theme.media.lg} {
        margin-top: calc(-100vw / 8 * 3);
        padding-top: calc(100vw / 8 * 3);
    }
    @media ${props => props.theme.media.md} {
        margin-top: calc(-100vw / 6 * 3 - 2px);
        padding-top: calc(100vw / 6 * 3 - 2px);
    }
    @media ${props => props.theme.media.sm} {
        margin-top: calc(-100vw / 2 * 3 - 2px);
        padding-top: calc(100vw / 2 * 3 - 2px);
        grid-template-columns: repeat(2, 1fr);
    }
    width: 100%;
    background: #000;
    /* background-image: linear-gradient(0deg, #212121 0%, #0c0c0c calc(100% - 100vw / 10), rgba(1, 1, 1, 0)); */
`

const GradiantBGWrapper = styled.div`
    /* background: linear-gradient(to bottom,  rgba(255,255,255,0) 0%, rgba(255,255,255,1) 70%); */
`

const Desc = styled.div`
    line-height: 1.5;
    font-weight: 400;
    strong{
        font-weight: bold;
    }
`

const Header = styled.h2`
    font-size: 36px;
    font-weight: bolder;
`

const Right = styled.div``

interface ImageCarouselProps {
    photos: { url: string }[]
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ photos }) => {
    const [currentPhoto, setCurrentPhoto] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPhoto(currentPhoto => (currentPhoto + 1) % photos.length)
        }, 400)
        return () => clearInterval(interval)
    }, [photos])

    return (
        <ImageContainer>
            <Image src={photos[currentPhoto].url + '?w=600&fm=webp'} alt="Carousel image" />
        </ImageContainer>
    )
}

export default (props: {data: any, photos: {url: string}[]}) => {

    console.log('p', props.photos) 


    return (
		<GradiantBGWrapper>
			<GradiantBG>
				<a id={'about'}/>
				<Root>
					<Container>
						<Content>
                            <ImageCarousel photos={props.photos} />
							<Right>
								<Header>
									<Fade bottom>
										{props.data.title}
									</Fade>
								</Header>
								<Fade bottom>
									<Desc >
										<Markdown>{props.data.bio}</Markdown>
									</Desc>
								</Fade>
							</Right>
						</Content>
					</Container>
				</Root>
			</GradiantBG>
		</GradiantBGWrapper>
	)
}