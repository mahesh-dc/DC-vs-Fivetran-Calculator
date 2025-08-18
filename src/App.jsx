import React, { useState, useEffect } from 'react'
import './App.css'
import Slider from './components/Slider'
import Checkbox from './components/Checkbox'
import SavingsCard from './components/SavingsCard'

function App() {
  const [connectors, setConnectors] = useState(5)
  const [monthlyRows, setMonthlyRows] = useState(5)
  const [additionalNeeds, setAdditionalNeeds] = useState({
    managedDataWarehouse: false
  })

  // Pricing calculations
  const calculateFivetranCost = () => {
    // Fivetran tiered pricing by connectors and monthly rows (in millions)
    const table = {
      5:  { 5: 2500, 10: 3420, 20: 5120, 30: 5410, 50: 6860, 100: 8994 },
      10: { 5: 2570, 10: 5000, 20: 6770, 30: 8470, 50: 10750, 100: 13650 },
      20: { 5: 2570, 10: 5070, 20: 10070, 30: 11770, 50: 15170, 100: 21430 },
      30: { 5: 2470, 10: 5020, 20: 9970, 30: 15070, 50: 18130, 100: 26970 },
    }

    const price = table[connectors]?.[monthlyRows]
    return typeof price === 'number' ? price : 0
  }

  const calculateDataChannelCost = () => {
    // DataChannel tiered pricing by monthly rows (in millions)
    const tiers = { 5: 399, 10: 524, 20: 774, 30: 899, 50: 1199, 100: 1949 }
    let baseCost = tiers[monthlyRows] ?? 399

    // Add-ons pricing
    if (additionalNeeds.managedDataWarehouse) baseCost += 200

    return Math.round(baseCost)
  }

  const fivetranCost = calculateFivetranCost()
  const dataChannelCost = calculateDataChannelCost()
  const monthlySavings = fivetranCost - dataChannelCost
  const annualSavings = monthlySavings * 12
  const savingsPercentage = ((monthlySavings / fivetranCost) * 100).toFixed(2)

  const handleCheckboxChange = (key) => {
    setAdditionalNeeds(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  return (
    <div className="app">
      <div className="calculator-container">
        {/* Left Panel - Input Parameters */}
        <div className="input-panel">
          <h2>Input Parameters</h2>
          
          <div className="input-section">
            <label>No of Connectors</label>
            <Slider
              value={connectors}
              onChange={setConnectors}
              formatValue={(value) => `${value} Connectors`}
              options={[
                { label: '5', value: 5 },
                { label: '10', value: 10 },
                { label: '20', value: 20 },
                { label: '30', value: 30 },
              ]}
            />
          </div>

          <div className="input-section">
            <label>Monthly Rows (Million)</label>
            <Slider
              value={monthlyRows}
              onChange={setMonthlyRows}
              formatValue={(value) => `${value} M/Month`}
              options={[
                { label: '5M', value: 5 },
                { label: '10M', value: 10 },
                { label: '20M', value: 20 },
                { label: '30M', value: 30 },
                { label: '50M', value: 50 },
                { label: '100+ M', value: 100 },
              ]}
            />
          </div>

          <div className="input-section ">
            <label >Additional Needs</label>
              <Checkbox
                label="Managed Data Warehouse"
                checked={additionalNeeds.managedDataWarehouse}
                onChange={() => handleCheckboxChange('managedDataWarehouse')}
                ariaLabel="Managed Data Warehouse"
              />
          </div>

          <div className="detailed-pricing-link">
            <a href="https://www.datachannel.co/pricing" target="_blank">
              View Detailed Pricing →
            </a>
          </div>
        </div>

        {/* Right Panel - Estimated Savings */}
        <div className="savings-panel">
          <SavingsCard
            fivetranCost={fivetranCost}
            dataChannelCost={dataChannelCost}
            annualSavings={annualSavings}
            savingsPercentage={savingsPercentage}
            additionalNeeds={additionalNeeds}
          />
        </div>
      </div>
    </div>
  )
}

export default App