import React, { useState } from 'react'
import './App.css'
import Slider from './components/Slider'
import Checkbox from './components/Checkbox'
import SavingsCard from './components/SavingsCard'

function App() {
  const [connectors, setConnectors] = useState(10)
  const [monthlyRows, setMonthlyRows] = useState(50)
  const [reverseConnections, setReverseConnections] = useState(2)
  // Pricing calculations
  const calculateFivetranCost = () => {
    // Fivetran tiered pricing by connectors and monthly rows (in millions)
    const table = {
      5:  { 5: 2570, 10: 3420, 20: 5120, 30: 5410, 50: 6860, 100: 10000 },
      10: { 5: 2570, 10: 5070, 20: 6770, 30: 8470, 50: 10750, 100: 13650 },
      20: { 5: 2570, 10: 5070, 20: 10070, 30: 11770, 50: 15170, 100: 21430 },
      30: { 5: 2570, 10: 5070, 20: 9970, 30: 15070, 50: 18130, 100: 26970 },
    }

    const price = table[connectors]?.[monthlyRows]
    return typeof price === 'number' ? price * 0.2 : 0
  }

  const calculateDataChannelCost = () => {
    // DataChannel tiered pricing by monthly rows (in millions)
    const tiers = { 5: 399, 10: 524, 20: 774, 30: 899, 50: 1199, 100: 1949 }
    let baseCost = tiers[monthlyRows] ?? 399

    // If reverse connections affect pricing, add logic here (e.g., baseCost += reverseConnections * 200)

    return Math.round(baseCost)
  }

  // Census pricing: up to 2 connections = $350 total; each extra = $200
  const calculateCensusCost = (rc) => {
    if (rc <= 0) return 0
    if (rc <= 2) return 350
    return 350 + (rc - 2) * 200
  }

  const fivetranBaseCost = calculateFivetranCost()
  const dataChannelCost = calculateDataChannelCost()
  const censusCost = calculateCensusCost(reverseConnections)
  const fivetranCost = fivetranBaseCost

  const monthlySavings = fivetranCost + censusCost - dataChannelCost
  const annualSavings = monthlySavings * 12
  const savingsPercentage = fivetranCost > 0 ? ((monthlySavings / (fivetranCost + censusCost)) * 100).toFixed(2) : 0
  return (
    <div className="app">
      <div className="calculator-container">
        {/* Left Panel - Input Parameters */}
        <div className="input-panel">
          
          <div className="input-section">
            <label>No. of Connectors</label>
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
                { label: '10M', value: 10 },
                { label: '20M', value: 20 },
                { label: '30M', value: 30 },
                { label: '50M', value: 50 },
                { label: '100+ M', value: 100 },
              ]}
            />
          </div>

          <div className="input-section">
            <label>Reverse Connections</label>
            <Slider
              value={reverseConnections}
              onChange={setReverseConnections}
              formatValue={(value) => `${value} Reverse Connections`}
              options={[0, 2, 4, 6, 8].map(n => ({ label: String(n), value: n }))}
            />
          </div>

            <a href="https://www.datachannel.co/pricing" target="_blank" style={{color : '#216FED'}}>
              View Detailed Pricing →
            </a>
        </div>

        {/* Right Panel - Estimated Savings */}
        <div className="savings-panel">
          <SavingsCard
            fivetranCost={fivetranCost}
            dataChannelCost={dataChannelCost}
            annualSavings={annualSavings}
            savingsPercentage={savingsPercentage}
            reverseConnections={reverseConnections}
            censusCost={censusCost}
          />
        </div>
      </div>
    </div>
  )
}

export default App