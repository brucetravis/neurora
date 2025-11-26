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

    return (
        <PricingContext.Provider
            value={{
                openStandardModal, setOpenStandardModal,
                openQuotationModal, setOpenQuotationModal,
                selectedPlan, setSelectedPlan
            }}
        >
            {children}
        </PricingContext.Provider>
    )
}