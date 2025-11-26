import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
// import StandardPricingModal from './components/modals/standard/StandardPricingModal';
// import { usePricing } from './contexts/PricingProvider';
// import { aiPlans, swPlans } from './data/Pricing';

function App() {

  // const { openStandardModal } = usePricing();

  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>

      {/* {openStandardModal && <StandardPricingModal aiPlans={aiPlans} swPlans={swPlans} />} */}
    </>
  );
}

export default App;
