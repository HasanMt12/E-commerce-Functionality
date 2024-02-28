import OfferSection from "./OfferSection";
import ProductList from "./ProductList";

const Home = () => {
  return (
    <div className='min-h-screen'>
      <ProductList></ProductList>
      <OfferSection></OfferSection>
    </div>
  );
};

export default Home;