import { createContext, useContext, useState } from "react";

// create the pricing Provider context
const PricingContext = createContext()

// create a custom hook to use the pricing context
export const usePricing = () => useContext(PricingContext)


// export default
export default function PricingProvider({ children }) {

    // state to open and close the modal
    const [ openStandardModal, setOpenStandardModal ] = useState(false)
    const [ openQuotationModal, setOpenQuotationModal ] = useState(false)
    const [ selectedPlan, setSelectedPlan ] = useState(null)
    const [currency, setCurrency] = useState('USD');

    const EUR_RATE = 0.92;
    const KES_RATE = 130;

    const format = (usd) => {
    if (currency === 'USD') return `$${usd.toLocaleString()}`;
    if (currency === 'EUR') return `€${Math.round(usd * EUR_RATE).toLocaleString()}`;
    return `KSh ${Math.round(usd * KES_RATE).toLocaleString()}`;
    };


    return (
        <PricingContext.Provider
            value={{
                openStandardModal, setOpenStandardModal,
                openQuotationModal, setOpenQuotationModal,
                selectedPlan, setSelectedPlan, currency, 
                setCurrency, format
            }}
        >
            {children}
        </PricingContext.Provider>
    )
}