import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import StandardPricingModal from './components/modals/standard/StandardPricingModal';
import { usePricing } from './contexts/PricingProvider';
import { aiPlans, swPlans } from './data/Pricing';
import CustomQuoteModal from './components/modals/custom/CustomQuoteModal';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  const { openStandardModal, openQuotationModal } = usePricing();

  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>

      {openStandardModal && <StandardPricingModal aiPlans={aiPlans} swPlans={swPlans} />}
      {openQuotationModal && <CustomQuoteModal />}

      <ToastContainer 
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme=''
      />
    
    </>
  );
}

export default App;
