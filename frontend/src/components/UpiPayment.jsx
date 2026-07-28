import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Zap, CheckCircle, XCircle, Shield } from 'lucide-react'
import { useTranslation, useUnit } from '../utils/translate'

export default function UpiPayment() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { unit } = useUnit()
  const [paymentStatus, setPaymentStatus] = useState('idle') // idle | loading | success | failure
  const [transactionId, setTransactionId] = useState('')

  // Mock data
  const billAmount = '₹84.20'
  const currentUnits = unit === 'MWh' ? `0.324 ${unit}` : `324 ${unit}`
  const monthlyLimit = unit === 'MWh' ? `0.500 ${unit}` : `500 ${unit}`

  const handlePayment = () => {
    setPaymentStatus('loading')

    setTimeout(() => {
      const txnId = 'TXN' + Math.random().toString(36).substring(2, 10).toUpperCase()
      setTransactionId(txnId)

      if (Math.random() > 0.3) {
        setPaymentStatus('success')
      } else {
        setPaymentStatus('failure')
      }
    }, 2500)
  }

  const resetPayment = () => {
    setPaymentStatus('idle')
    setTransactionId('')
  }

  // ─── LOADING STATE ────────────────────────────────────────────────────
  if (paymentStatus === 'loading') {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center p-4">
        <div className="text-center animate-fade-in">
          <div className="spinner mx-auto"></div>
          <p className="text-lg text-gray-300 mt-6 animate-pulse font-medium">
            Processing payment...
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Please do not close this page
          </p>
        </div>
      </div>
    )
  }

  // ─── SUCCESS STATE ────────────────────────────────────────────────────
  if (paymentStatus === 'success') {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center p-4">
        <div className="max-w-[420px] w-full glass rounded-2xl p-8 text-center animate-scale-in">
          {/* Green check icon */}
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-400" strokeWidth={2} />
          </div>

          <h2 className="text-2xl font-bold text-white mb-2">Payment Successful ✅</h2>
          <p className="text-3xl font-extrabold text-green-400 mb-6">{billAmount}</p>

          {/* Transaction Details */}
          <div className="glass-light rounded-xl p-4 space-y-3 text-left mb-6">
            <div>
              <p className="text-xs text-gray-500">Transaction ID</p>
              <p className="text-sm text-white font-mono">{transactionId}</p>
            </div>
            <div className="h-px bg-dark-500/50"></div>
            <div>
              <p className="text-xs text-gray-500">Date</p>
              <p className="text-sm text-white">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
            <div className="h-px bg-dark-500/50"></div>
            <div>
              <p className="text-xs text-gray-500">Status</p>
              <p className="text-sm text-green-400 font-medium">Completed</p>
            </div>
          </div>

          <button
            onClick={() => navigate('/bill')}
            className="w-full bg-electric hover:bg-electric-dark text-white font-semibold py-3.5 rounded-xl transition-all duration-300 hover:shadow-glow flex items-center justify-center gap-2"
          >
            Back to Bill
            <Zap size={18} />
          </button>
        </div>
      </div>
    )
  }

  // ─── FAILURE STATE ────────────────────────────────────────────────────
  if (paymentStatus === 'failure') {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center p-4">
        <div className="max-w-[420px] w-full glass rounded-2xl p-8 text-center animate-scale-in">
          {/* Red X icon */}
          <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6">
            <XCircle size={40} className="text-red-400" />
          </div>

          <h2 className="text-2xl font-bold text-white mb-2">Payment Failed ❌</h2>
          <p className="text-sm text-gray-400 mb-6">
            Transaction timed out. Please try again.
          </p>

          <button
            onClick={resetPayment}
            className="w-full bg-electric hover:bg-electric-dark text-white font-semibold py-3.5 rounded-xl transition-all duration-300 hover:shadow-glow flex items-center justify-center gap-2"
          >
            Try Again
            <Zap size={18} />
          </button>

          <button
            onClick={() => navigate('/bill')}
            className="w-full mt-3 bg-transparent border border-dark-500 hover:border-electric/30 text-gray-300 font-medium py-3.5 rounded-xl transition-all duration-300"
          >
            Back to Bill
          </button>
        </div>
      </div>
    )
  }

  // ─── IDLE STATE (MAIN PAYMENT FORM) ───────────────────────────────────
  return (
    <div className="min-h-screen bg-dark-900">
      {/* Header */}
      <header className="sticky top-0 z-10 glass px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-300 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-semibold text-white">Pay Bill</h1>
        <Zap size={20} className="text-electric ml-auto" />
      </header>

      {/* Content */}
      <div className="px-4 py-6 space-y-5 max-w-[420px] mx-auto pb-8 animate-fade-in">
        {/* Amount Summary Card */}
        <div className="glass rounded-2xl p-6 text-center">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Total Amount Due</p>
          <p className="text-4xl font-extrabold text-white mb-4">
            <span className="text-electric">{billAmount}</span>
          </p>
          <div className="flex gap-3 justify-center">
            <div className="glass-light rounded-lg px-4 py-2">
              <p className="text-xs text-gray-400">Current Units</p>
              <p className="text-sm font-semibold text-white">{currentUnits}</p>
            </div>
            <div className="glass-light rounded-lg px-4 py-2">
              <p className="text-xs text-gray-400">Monthly Limit</p>
              <p className="text-sm font-semibold text-white">{monthlyLimit}</p>
            </div>
          </div>
        </div>

        {/* Choose Payment App */}
        <div className="glass rounded-2xl p-6">
          <p className="text-sm font-medium text-gray-300 mb-2">Pay using</p>
          <p className="text-xs text-gray-500 mb-5">Tap an app to pay {billAmount} instantly</p>

          <div className="space-y-3">
            {/* GPay */}
            <button
              onClick={() => { window.location.href = 'tez://upi/pay?pa=wattwatcher@okaxis&pn=WattWatcher&am=84.20&cu=INR'; handlePayment() }}
              className="w-full glass-light rounded-xl p-4 flex items-center gap-4 hover:border-electric/20 transition-all duration-300 active:scale-[0.98] group"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <span className="text-white text-lg font-bold">G</span>
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold text-white">Google Pay</p>
                <p className="text-xs text-gray-500">UPI powered by Google</p>
              </div>
              <span className="text-xs text-electric font-medium">Open →</span>
            </button>

            {/* PhonePe */}
            <button
              onClick={() => { window.location.href = 'phonepe://pay?pa=wattwatcher@ybl&pn=WattWatcher&am=84.20&cu=INR'; handlePayment() }}
              className="w-full glass-light rounded-xl p-4 flex items-center gap-4 hover:border-electric/20 transition-all duration-300 active:scale-[0.98] group"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <span className="text-white text-lg font-bold">P</span>
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold text-white">PhonePe</p>
                <p className="text-xs text-gray-500">India's trusted UPI app</p>
              </div>
              <span className="text-xs text-electric font-medium">Open →</span>
            </button>

            {/* Paytm */}
            <button
              onClick={() => { window.location.href = 'paytmmp://pay?pa=wattwatcher@paytm&pn=WattWatcher&am=84.20&cu=INR'; handlePayment() }}
              className="w-full glass-light rounded-xl p-4 flex items-center gap-4 hover:border-electric/20 transition-all duration-300 active:scale-[0.98] group"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <span className="text-white text-lg font-bold">₹</span>
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold text-white">Paytm</p>
                <p className="text-xs text-gray-500">Pay securely with Paytm</p>
              </div>
              <span className="text-xs text-electric font-medium">Open →</span>
            </button>
          </div>
        </div>

        {/* Security Note */}
        <div className="flex items-center justify-center gap-2 text-xs text-gray-600 mt-2">
          <Shield size={14} />
          <span>Secured by 256-bit encryption</span>
        </div>
      </div>
    </div>
  )
}
