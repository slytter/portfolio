import React from 'react'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import { graphql } from 'gatsby'
import Front from '../components/Front/Front'
import styled, { ThemeProvider, css } from 'styled-components'
import theme from '../styles/theme'
import Container from '../components/Shared/Container'
import { Tag } from './Work/Tag'
import Menu from '../components/Menu'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import 'swiper/css'
import 'swiper/css/pagination'
import {usePreLoader} from '../hooks/usePreloader'
import Footer from '../components/Footer/Footer'
import Markdown from '../components/Shared/Markdown'
import dayjs from 'dayjs'

const Doc = styled.div`
	margin-bottom: 100px;
`

const DotWrapper = styled.div`
	padding: 0px 8px 8px;
	cursor: pointer;
`

const Dot = styled.div<{active: boolean}>`
	height: 8px;
	width: 8px;
	background-color: #bbb;
  border-radius: 50%;
  ${props => props.active && css`
	background-color: #717171;
  `}
`

const Header = styled.h1`
  margin: ${props => props.theme.spacing(4, 0, 0, 0)};
  font-size: 80px;
  font-weight: bolder;
  color: black;
  text-transform: lowercase;
`

const Desc = styled.p`
  font-size: 19px;
  font-weight: 400;
  margin: ${props => props.theme.spacing(2, 0)};
`

const Image = styled.img`
	border-radius: 10px;
	overflow: hidden;
  height: 500px;
	cursor: grab;
`

const ImageWrapper = styled.span`
  height: 500px;
  padding-right: ${props => props.theme.spacing(2)};
`

const ReleaseDate = styled.div`
	margin-bottom: ${props => props.theme.spacing(1)};
	font-size: 14px;
	font-weight: 400;
`


const format = (url) => {
	if(url.includes('gif')) return url
	return `${url}?w=1000&fm=webp`
}

const Work = ({ data }) => {

	const items = data.datoCmsWork.gallery.map(({ fluid }) => (
		<ImageWrapper>
			<Image alt={data.datoCmsWork.title} key={fluid.src} src={fluid.src} draggable="false"  />
		</ImageWrapper>
	))

	const {didPreload} = usePreLoader(data.datoCmsWork.gallery.map(({ fluid }) => ({
		url: fluid.src,
		type: 'image',
	})))

	console.log(data.datoCmsWork)

	return (
		<ThemeProvider theme={theme}>
			<div>
				<Front
					isProject
					videoLink={data.datoCmsWork.video ? data.datoCmsWork.video.url : ''}
					caseName={data.datoCmsWork.title}
				/>
				<HelmetDatoCms seo={data.datoCmsWork.seoMetaTags}/>
				<Doc>
					<Menu isProject></Menu>
					<Container>
						<Header>
							{data.datoCmsWork.title}
						</Header>
						<ReleaseDate>{dayjs(data.datoCmsWork.releaseDate).format('D. MMMM YYYY')}</ReleaseDate>
						{
							data.datoCmsWork.tags.map((tag, i) => {
								return <Tag key={i}>{tag.tagLine}</Tag>
							})
						}
						{data.datoCmsWork.excerpt && <Desc>{data.datoCmsWork.excerpt}</Desc>}
						{didPreload && items.length !== 0 && <div style={{borderRadius: '10px', overflow: 'hidden'}}>
							<AliceCarousel
								mouseTracking
								items={items}
								autoPlay
								autoPlayInterval={2000}
								// responsive={responsive}
								autoWidth
								infinite
								renderDotsItem={(dot) => {
									return <DotWrapper>
										<Dot active={dot.isActive}/>
									</DotWrapper>
								}}
								disableButtonsControls
								controlsStrategy="alternate"
							/>
						</div>}

						<Markdown columnCount={1}>
							{data.datoCmsWork.description}
						</Markdown>

						{/* <div className="sheet__gallery">
						<Img fluid={data.datoCmsWork.coverImage.fluid} />
					</div> */}
					</Container>
				</Doc>
				<Footer
					enableBg
					enableBorder
				/>
			</div>
		</ThemeProvider>
	)	
}

export const query = graphql`
  query WorkQuery($slug: String!) {
    datoCmsWork(slug: { eq: $slug }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      tags {
        tagLine
      }
      excerpt
      gallery {
        fluid(maxWidth: 200, imgixParams: { fm: "jpg,gif", auto: "compress" }) {
          src
        }
      }
			releaseDate
      description
      coverImage {
        url
        fluid(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
        }
      }
      downloads {
        link
        title
      }
      video {
        url
      }
    }
  }
`


export default Work
