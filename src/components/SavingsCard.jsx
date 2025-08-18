import React from 'react'
import './SavingsCard.css'

const SavingsCard = ({ fivetranCost, dataChannelCost, annualSavings, savingsPercentage, additionalNeeds }) => {
  const hasAddons = additionalNeeds.managedDataWarehouse
  
  return (
    <div className="savings-card">
      <div className="savings-header">
        <h2>Your Estimated Savings</h2>
      </div>

      <div className="cost-breakdown">
        <div className="cost-item fivetran">
          <span className="cost-label-group">
            <img className="cost-logo" src="/assets/logos/fivetran.png" alt="Fivetran logo" />
            <span className="cost-label">Estimated Fivetran Cost</span>
          </span>
          <span className="cost-value">${fivetranCost.toLocaleString()} / mo</span>
        </div>
        
        <div className="cost-item datachannel">
          <span className="cost-label-group">
            <img className="cost-logo" src="/assets/logos/datachannel.png" alt="DataChannel logo" />
            <span className="cost-label">DataChannel Cost </span>
          </span>
          <span className="cost-value">${dataChannelCost.toLocaleString()} / mo</span>
        </div>
        
        <div className="cost-item addons">
          <span className="cost-label">Add-ons</span>
          <span className="cost-value">
            {hasAddons ? (
              <span className="addons-list">
                {additionalNeeds.managedDataWarehouse && <span>Managed DW</span>}
              </span>
            ) : (
              '--'
            )}
          </span>
        </div>
      </div>

      <div className="annual-savings">
        <div className="savings-amount">${annualSavings.toLocaleString()}</div>
        <div className="savings-label">Annual Savings</div>
        <div className="savings-percentage">({savingsPercentage}% reduction)</div>
      </div>

      <div className="disclaimer">
        <div className="disclaimer-icon">
          <svg viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#8b5cf6"/>
            <path d="M12 16v-4M12 8h.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <p>The prices shown are estimates based on publicly available data and should not be considered final. For exact pricing, please visit our <a href='https://www.datachannel.co/pricing'>Pricing</a> page or contact us at <a href="mailto:support@datachannel.co">DataChannel Support</a> for a custom plan.</p>
      </div>
    </div>
  )
}

export default SavingsCard