import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Zap, ArrowLeft, Calculator, IndianRupee,
  TrendingUp, TrendingDown, Gauge
} from 'lucide-react'
import { useTranslation, useUnit } from '../utils/translate'
import { BottomNav } from './HomeDashboard'

export default function BillEstimation() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { unit } = useUnit()
  const [units, setUnits] = useState('324')
  const [ratePerUnit] = useState('0.26')

  const estimatedBill = (parseFloat(units || 0) * parseFloat(ratePerUnit)).toFixed(2)
  const displayUnits = unit === 'MWh' ? (parseFloat(units) / 1000).toFixed(3) : units
  const displayRate = unit === 'MWh' ? (parseFloat(ratePerUnit) * 1000).toFixed(2) : ratePerUnit

  return (
    <div className="min-h-screen bg-dark-900 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 glass px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-gray-300 hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-semibold text-white">Bill Estimation</h1>
        <Zap size={20} className="text-electric ml-auto" />
      </header>

      {/* Content */}
      <div className="px-4 py-6 space-y-5 max-w-[420px] mx-auto animate-fade-in">
        {/* Current Usage Card */}
        <div className="glass rounded-2xl p-6 text-center">
          <div className="w-14 h-14 rounded-full bg-electric/10 flex items-center justify-center mx-auto mb-4">
            <Gauge size={28} className="text-electric" />
          </div>
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Current Consumption</p>
          <p className="text-4xl font-extrabold text-white mb-1">{displayUnits} <span className="text-lg font-normal text-gray-400">{unit}</span></p>
          <p className="text-xs text-gray-500">Billing Period: Jul 1 - Jul 31, 2026</p>
        </div>

        {/* Rate Card */}
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white">Rate Breakdown</h3>
            <Calculator size={16} className="text-electric" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-dark-500/50">
              <span className="text-sm text-gray-400">Unit Rate</span>
              <span className="text-sm font-medium text-white">₹{displayRate}/{unit}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-dark-500/50">
              <span className="text-sm text-gray-400">Units Consumed</span>
              <span className="text-sm font-medium text-white">{displayUnits} {unit}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-dark-500/50">
              <span className="text-sm text-gray-400">Fixed Charges</span>
              <span className="text-sm font-medium text-white">₹5.00</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm font-semibold text-white">Estimated Total</span>
              <span className="text-lg font-bold text-electric">₹{(parseFloat(estimatedBill) + 5).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Estimated Bill Display */}
        <div className="glass rounded-2xl p-6 text-center border border-electric/20">
          <IndianRupee size={24} className="text-electric mx-auto mb-2" />
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Estimated Bill</p>
          <p className="text-5xl font-extrabold text-white mb-2">
            ₹<span className="text-electric">{(parseFloat(estimatedBill) + 5).toFixed(2)}</span>
          </p>
          <div className="flex items-center justify-center gap-1 text-green-400">
            <TrendingDown size={14} />
            <span className="text-xs">5.2% less than last month</span>
          </div>
        </div>

        {/* Pay Now Button */}
        <button
          onClick={() => navigate('/payment')}
          className="w-full bg-electric hover:bg-electric-dark text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-glow active:scale-[0.98]"
        >
          Pay Now
          <Zap size={18} />
        </button>
      </div>

      <BottomNav active="Bill" />
    </div>
  )
}
