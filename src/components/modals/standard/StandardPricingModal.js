import React from 'react'
import './StandardPricingModal.css'
// import { useParams } from 'react-router-dom'
import { usePricing } from '../../../contexts/PricingProvider'

export default function StandardPricingModal({ aiPlans, swPlans }) {

  // Get the states from the context
  const { selectedPlan, openStandardModal, setOpenStandardModal } = usePricing();

  if (!selectedPlan) return null; // safety check

  return (
    <section
      className='modal-overlay'
    >
      {openStandardModal && (
        <div
          className="standard-modal"
        >
          <h2>checkout</h2>
          <p>You selected <strong>{selectedPlan.name}</strong></p>
          <p>You are about to pay <strong>{selectedPlan.usd}</strong> for this service</p>

          <div className='payment-buttons'>
              <buttons
                className='purchase-button'
              >
                Purchase
              </buttons>

              <buttons
                className='cancel-button'
                onClick={() => setOpenStandardModal(false)}
              >
                Cancel
              </buttons>
          </div>
        </div>
      )}
    </section>
  )
}
