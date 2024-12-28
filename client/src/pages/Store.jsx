import ItemScroller from "../components/component/Store-Scroller/ItemScroller";
import ProductCard from "../components/component/StoreProd/ProductCard";
import ProductGrid from "../components/component/Store/ProductGrid";
import MainComponent from "../components/component/Store/MainCompo";

const Store = () => {
  return (
    <div>
      <ItemScroller />
      <div className="flex flex-wrap justify-around">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>

      <section>
        <ProductGrid />
        <MainComponent />
      </section>
    </div>
  );
};

export default Store;
