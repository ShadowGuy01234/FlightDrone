
import ItemScroller from '../components/Store-Scroller/ItemScroller';
import Foot from '../components/Foot/Foot'
import ProductCard from '../components/StoreProd/ProductCard';
import ProductGrid from '../components/Store/ProductGrid';
import MainComponent from '../components/Store/MainCompo';




const Store = () => {
    return (
        <div>
            <ItemScroller />
            <div className='flex flex-wrap justify-around'>
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </div>

            <section>
                
                <ProductGrid />
                <MainComponent />
            </section>

            <Foot />

        </div>
    );
}

export default Store