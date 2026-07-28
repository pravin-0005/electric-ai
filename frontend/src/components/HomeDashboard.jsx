import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Zap, Home, BarChart3, FileText, Clock, User,
  TrendingUp, TrendingDown, IndianRupee, Activity
} from 'lucide-react'
import { useTranslation, useUnit } from '../utils/translate'

function BottomNav({ active }) {
  const { t } = useTranslation()
  const items = [
    { icon: Home, label: t('home'), rawLabel: 'Home', path: '/' },
    { icon: Clock, label: t('history'), rawLabel: 'History', path: '/history' },
    { icon: BarChart3, label: t('analysis'), rawLabel: 'Analysis', path: '/analysis' },
    { icon: FileText, label: t('bill'), rawLabel: 'Bill', path: '/bill' },
    { icon: User, label: t('profile'), rawLabel: 'Profile', path: '/profile' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 glass border-t border-dark-500/50 z-50">
      <div className="max-w-[420px] mx-auto flex items-center justify-around py-2">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = active === item.rawLabel
          return (
            <Link
              key={item.rawLabel}
              to={item.path}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg transition-all duration-300 ${
                isActive
                  ? 'text-electric'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <Icon size={20} fill={isActive ? 'currentColor' : 'none'} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default function HomeDashboard() {
  const { t } = useTranslation()
  const { unit } = useUnit()

  return (
    <div className="min-h-screen bg-dark-900 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 glass px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap size={22} className="text-electric" fill="currentColor" />
          <span className="text-lg font-bold text-white">{t('wattwatcher')}</span>
        </div>
        <button className="w-8 h-8 rounded-full bg-dark-600 flex items-center justify-center">
          <User size={16} className="text-gray-400" />
        </button>
      </header>

      {/* Content */}
      <div className="px-4 py-6 space-y-5 max-w-[420px] mx-auto animate-fade-in">
        {/* Usage Circle */}
        <div className="glass rounded-2xl p-6 text-center">
          <Link to="/analysis" className="relative w-40 h-40 mx-auto mb-4 block cursor-pointer group">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" fill="none" stroke="#1e2640" strokeWidth="8" />
              <circle
                cx="60" cy="60" r="52" fill="none"
                stroke="#3b82f6" strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 52 * 0.75} ${2 * Math.PI * 52}`}
                className="transition-all duration-1000 group-hover:stroke-[#60a5fa]"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-extrabold text-white group-hover:text-electric transition-colors">
                {unit === 'MWh' ? '0.375' : '375'}
              </span>
              <span className="text-xs text-gray-400">{unit}</span>
            </div>
          </Link>
          <div className="flex justify-center gap-4">
            <div className="glass-light rounded-lg px-4 py-2">
              <p className="text-xs text-gray-400">{t('dailyAvg')}</p>
              <p className="text-sm font-semibold text-white">
                {unit === 'MWh' ? '0.012' : '12.4'} <span className="text-xs text-gray-400">{unit}</span>
              </p>
            </div>
            <div className="glass-light rounded-lg px-4 py-2">
              <p className="text-xs text-gray-400">{t('monthlyLimit')}</p>
              <p className="text-sm font-semibold text-white">
                {unit === 'MWh' ? '0.500' : '500'} <span className="text-xs text-gray-400">{unit}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Peak/Off-Peak Chart Placeholder */}
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white">{t('todaysUsage')}</h3>
            <Activity size={16} className="text-electric" />
          </div>
          <div className="h-24 flex items-end gap-1">
            {[40, 65, 35, 80, 55, 70, 45, 90, 60, 50, 75, 30].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t bg-gradient-to-t from-electric/40 to-electric transition-all duration-500 hover:from-electric/60 hover:to-electric-light"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-[10px] text-gray-500">
            <span>6AM</span><span>12PM</span><span>6PM</span><span>12AM</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="glass rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <IndianRupee size={16} className="text-electric" />
              <span className="text-xs text-gray-400">{t('estBill')}</span>
            </div>
            <p className="text-xl font-bold text-white">₹84.20</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingDown size={12} className="text-green-400" />
              <span className="text-[10px] text-green-400">-5.2%</span>
            </div>
          </div>
          <div className="glass rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap size={16} className="text-yellow-400" />
              <span className="text-xs text-gray-400">{t('carbon')}</span>
            </div>
            <p className="text-xl font-bold text-white">120 <span className="text-xs font-normal text-gray-400">kg</span></p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp size={12} className="text-red-400" />
              <span className="text-[10px] text-red-400">+2.1%</span>
            </div>
          </div>
        </div>
      </div>

      <BottomNav active="Home" />
    </div>
  )
}

export { BottomNav }
