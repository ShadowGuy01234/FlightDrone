
import Nav from '../components/Nav/Nav'
import Foot from '../components/Foot/Foot'
import Hero from '../components/Hero/Hero'
import Shop from '../components/Shop/Shop'
import Ad from '../components/Ad/Ad'
import ImageSlider from '../components/ImageSlider/ImageSlider'
import VideoCard from '../components/VideoCard/VideoCard'
import GalleryCard from '../components/GalleryCard/GalleryCard'
import QnA from '../components/QnA/QnA'

const Home = () => {
  return (
    <div>
     
        <Hero/>
        
        <Shop/>

        <Ad/>

        <ImageSlider/>

        <VideoCard/>

        <GalleryCard/>

        <QnA/>

        <Foot/>

    </div>
  )
}

export default Home