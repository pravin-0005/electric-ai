import { ArrowLeft, Zap, Calendar, TrendingUp, TrendingDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { BottomNav } from './HomeDashboard'
import { useTranslation, useUnit } from '../utils/translate'

export default function History() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { format } = useUnit()

  const records = [
    { date: 'July 26, 2026', value: 12.4, cost: '₹3.22', trend: 'down' },
    { date: 'July 25, 2026', value: 14.1, cost: '₹3.67', trend: 'up' },
    { date: 'July 24, 2026', value: 11.8, cost: '₹3.07', trend: 'down' },
    { date: 'July 23, 2026', value: 13.5, cost: '₹3.51', trend: 'up' },
    { date: 'July 22, 2026', value: 10.2, cost: '₹2.65', trend: 'down' },
    { date: 'July 21, 2026', value: 15.0, cost: '₹3.90', trend: 'up' },
  ]

  return (
    <div className="min-h-screen bg-dark-900 pb-20">
      <header className="sticky top-0 z-10 glass px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-gray-300 hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-semibold text-white">{t('history')}</h1>
        <Calendar size={20} className="text-electric ml-auto" />
      </header>

      <div className="px-4 py-6 space-y-4 max-w-[420px] mx-auto animate-fade-in">
        <h3 className="text-sm font-semibold text-gray-300 px-1">{t('dailyRecords')}</h3>
        {records.map((record, i) => (
          <div key={i} className="glass rounded-2xl p-4 flex items-center justify-between hover:border-electric/20 transition-all duration-300">
            <div>
              <p className="text-sm font-medium text-white">{record.date}</p>
              <p className="text-xs text-gray-400 mt-1">{format(record.value)}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-white">{record.cost}</p>
              <div className="flex items-center justify-end gap-1 mt-1">
                {record.trend === 'down' ? (
                  <>
                    <TrendingDown size={12} className="text-green-400" />
                    <span className="text-[10px] text-green-400">{t('lower')}</span>
                  </>
                ) : (
                  <>
                    <TrendingUp size={12} className="text-red-400" />
                    <span className="text-[10px] text-red-400">{t('higher')}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <BottomNav active="History" />
    </div>
  )
}
