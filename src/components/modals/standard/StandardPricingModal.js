import React, { useState } from 'react'
import './StandardPricingModal.css'
// import { useParams } from 'react-router-dom'
import { usePricing } from '../../../contexts/PricingProvider'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../../configs/firebase'
import { toast } from 'react-toastify'

export default function StandardPricingModal({ aiPlans, swPlans }) {
  
  const [ activeEntity, setActiveEntity ] = useState(null)

  const [ showPurchaseSection, setShowPurchaseSection ] = useState(false)


  // state to show the form submission
  const [ isSubmit, setIsSubmit ] = useState(false) // initial state is false meaning no current submisison

  // state to store userData
  const [ userData, setUserData ] = useState({
    entity_type: "",
    software_type: "",
    clientName: "",
    businessName: "",
    enterpriseName: "",
    organizationName: "",
    domain_name: "",
    maintenance: ""
  })

  // function to handle the change in the input
  const handleChange = (e) => {

    // extract the name and the value from the browser
    const { name, value } = e.target

    setUserData((prev) => ({
      ...prev,
      [name]: value
    }))
  }


  // funtion to close teh module
  const handleCancel = () => {
    window.location.reload()
    setOpenStandardModal(false)
  }

  // Get the states from the context
  const { selectedPlan, openStandardModal, setOpenStandardModal } = usePricing();

  if (!selectedPlan) return null; // safety check


  // function to submit the data to firebase and handle te payment integration
  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsSubmit(true)
    
    try {
      // create a reference to the collection according to the entity the user chooses
      const collectionRef = collection(db, userData.entity_type)


      // Pick the correct name based on the entity type
      let nameField = ''
      // Pick the name title based on the entity type
      let name_title = ''

      switch(userData.entity_type) {
        case 'personal':
          nameField = userData.clientName;
          name_title = 'clientName'
          break
        
        case 'business':
          nameField = userData.businessName
          name_title = 'businessName'
          break

        case 'enterprise':
          nameField = userData.enterpriseName
          name_title = 'enterpriseName'
          break
        
        case 'organization':
          nameField = userData.organizationName
          name_title = 'organizationName'
          break
          
        default:
          nameField = 'Not Provided'
          name_title = 'Not Provided'
      }


      // build the document to send
      const dataToSend = {
        entityType: userData.entity_type,
        softwareType: userData.software_type,
        domainName: userData.domain_name,
        maintenance: userData.maintenance,
        [name_title]: nameField,
        plan: selectedPlan.name,
        charges: selectedPlan.usd
      }

      await addDoc(collectionRef, dataToSend)

      toast.success('Product successfully purchased.')
      
      setIsSubmit(false)

      // reload the page
      window.location.reload()
      
    } catch (err) {
      console.error('Error sending data to firestore: ', err)
    }
  }

  

  return (
    <section
      className='modal-overlay'
    >
      {openStandardModal && (
        <form
          className="standard-modal"
          onSubmit={handleSubmit}
        >
          <h2>checkout</h2>
          
          
          <div
            className='client-questionnaire'
          >
            <div
              className='owner_type'
            >
              <h3>Type of entity?</h3>

              <div
                className='d-flex align-items-center gap-5'
              >
                <label>
                  <input 
                    type='radio'
                    name='entity_type'
                    value='personal'
                    checked={userData.entity_type === 'personal'}
                    onChange={(e) => {
                      handleChange(e)
                      setActiveEntity('personal')
                    }}
                  />

                  Personal
                </label>
                
                <label>
                  <input
                    type='radio'
                    name='entity_type'
                    value='business'
                    checked={userData.entity_type === 'business'}
                    onChange={(e) => {
                      handleChange(e)
                      setActiveEntity('business')
                    }}
                  />

                  Business
                </label>

                <label>
                  <input
                    type='radio'
                    name='entity_type'
                    value='enterprise'
                    checked={userData.entity_type === 'enterprise'}
                    onChange={(e) => {
                      handleChange(e)
                      setActiveEntity('enterprise')
                    }}
                  />

                  Enterprise
                </label>

                <label>
                  <input
                    type='radio'
                    name='entity_type'
                    value='organization'
                    checked={userData.entity_type === 'organization'}
                    onChange={(e) => {
                      handleChange(e)
                      setActiveEntity('organization')
                    }}
                    required
                  />

                  Organization
                </label>

              </div>
            </div>

            {activeEntity === 'personal' && (
              <div className='name_of_entity'>
                <label htmlFor='name'>Names of Client</label>
                <input
                  type='text'
                  name='clientName'
                  placeholder='John Doe'
                  value={userData.clientName.toUpperCase()}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            {activeEntity === 'business' && (
              <div className='name_of_entity'>
                <label htmlFor='name'>Name of Business:</label>
                <input
                  type='text'
                  name='businessName'
                  placeholder='Mbao hardware'
                  value={userData.businessName.toUpperCase()}
                  
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            {activeEntity === 'enterprise' && (
              <div className='name_of_entity'>
                <label htmlFor='name'>Name of Enterprise</label>
                <input
                  type='text'
                  name='enterpriseName'
                  placeholder='Garage motors'
                  value={userData.enterpriseName.toUpperCase()}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            {activeEntity === 'organization' && (
              <div className='name_of_entity'>
                <label htmlFor='name'>Name of Organization</label>
                <input
                  type='text'
                  name='organizationName'
                  placeholder='KOPRA'
                  value={userData.organizationName.toUpperCase()}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div
              className='software_type'
            >
              <h3>Type of Software to purchase?</h3>

              <div
                className='d-flex align-items-center gap-5'
              >
                <label>
                  <input 
                    type='radio'
                    name='software_type'
                    value='website'
                    checked={userData.software_type === "website"} // controlled
                    onChange={handleChange}
                    required
                  />

                  Website
                </label>
                
                <label>
                  <input
                    type='radio'
                    name='software_type'
                    value='app'
                    checked={userData.software_type === "app"} // controlled
                    onChange={handleChange}
                  />

                  App
                </label>

                <label>
                  <input
                    type='radio'
                    name='software_type'
                    value='enterprise'
                    checked={userData.software_type === "enterprise"} // controlled
                    onChange={handleChange}
                  />

                  system
                </label>

                <label>
                  <input
                    type='radio'
                    name='software_type'
                    value='AI agent'
                    checked={userData.software_type === "AI agent"} // controlled
                    onChange={handleChange}
                  />
                  
                  AI agent
                </label>
              </div>
            </div><br/>
            
            
            <div
              className='domain_name'
            >
              <h3>Do you have a domain name?</h3>

              <label>
                <input 
                  type='radio'
                  name='domain_name'
                  value='yes'
                  checked={userData.domain_name === 'yes'}
                  onChange={handleChange}
                  required
                />

                Yes
              </label>

              <label>
                <input 
                  type='radio'
                  name='domain_name'
                  value='no'
                  checked={userData.domain_name === 'no'}
                  onChange={handleChange}
                />

                No
              </label>

            </div>


            <div
              className='maintenance'
            >
              <h3>Do you need ongoing software maintenance?</h3>

              <label>
                <input 
                  type='radio'
                  name='maintenance'
                  value='yes'
                  checked={userData.maintenance === 'yes'}
                  onChange={(e) => {
                    handleChange(e)
                    setShowPurchaseSection(true)
                  }}
                  required
                />

                Yes
              </label>

              <label>
                <input 
                  type='radio'
                  name='maintenance'
                  value='no'
                  checked={userData.maintenance === 'no'}
                  onChange={(e) => {
                    handleChange(e)
                    setShowPurchaseSection(true)
                  }}
                />

                No
              </label>

            </div>

          </div><br/>

          <div 
            className='schedule_meeting'
          >
            <h3>Schedule a meeting with us </h3>
            
            <a
              href="https://calendly.com/neurora4/30min"
              target="_blank"
              rel='noreferrer'
              className='meeting-link'
            >
              Schedule
            </a><br/>
          </div>

          {showPurchaseSection && (
            <div>
              <div>
                <h4>You are about to purchase our <strong>{selectedPlan.name}</strong> Plan</h4>
                <p className='cost'>Pay <strong>{selectedPlan.usd.toLocaleString()}</strong> for this service</p>
              </div>


              <div className='payment-buttons'>
                <button
                  type='submit'
                  className='purchase-button'
                >
                  { isSubmit ? 'Purchasing....' : 'Purchase' }
                </button>

                <button
                  className='cancel-button'
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

        </form>
      )}
    </section>
  )
}
