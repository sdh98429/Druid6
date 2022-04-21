import Flickity from 'react-flickity-component';

const flickityOptions = {
    initialIndex: 2
}

export default function Carousel() {
  return (
    <Flickity
      className={'carousel'} // default ''
      elementType={'div'} // default 'div'
      options={flickityOptions} // takes flickity options {}
      disableImagesLoaded={false} // default false
      reloadOnUpdate // default false
      static // default false
    >
      <img src="/images/placeholder1.jpg" alt="main-img"/>
      <img src="/images/placeholder2.jpg" alt="main-img"/>
      <img src="/images/placeholder3.jpg" alt="main-img"/>
    </Flickity>
  )
}
