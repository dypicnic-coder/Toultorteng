import React from 'react';
import { SchoolInfo } from '../types';
import { 
  FileSpreadsheet, 
  Trophy, 
  Award, 
  FileText, 
  CalendarCheck, 
  Users, 
  Database, 
  Printer, 
  RefreshCw 
} from 'lucide-react';

interface HeaderProps {
  schoolInfo: SchoolInfo;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  onPrint: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  schoolInfo,
  activeTab,
  setActiveTab,
  onRefresh,
  isRefreshing,
  onPrint
}) => {
  const tabs = [
    { id: 'scoresheet', label: 'តារាងស្រង់ពិន្ទុ', icon: FileSpreadsheet, page: 'ទំព័រ ២' },
    { id: 'rankings', label: 'តារាងចំណាត់ថ្នាក់', icon: Trophy, page: 'ទំព័រ ៤' },
    { id: 'honor', label: 'តារាងកិត្តិយស', icon: Award, page: 'ទំព័រ ៥' },
    { id: 'bulletin', label: 'ព្រឹត្តិបត្រពិន្ទុ', icon: FileText, page: 'ទំព័រ ៧' },
    { id: 'attendance', label: 'ស្រង់វត្តមាន', icon: CalendarCheck, page: 'ទំព័រ ៣' },
    { id: 'students', label: 'ព័ត៌មានសិស្ស & សាលា', icon: Users, page: 'ទំព័រ ១' },
    { id: 'console', label: 'Python & SQL Console', icon: Database, page: 'Backend' },
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs no-print">
      {/* Top Ministry Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-400/20 border border-amber-300/40 flex items-center justify-center font-moul text-amber-300 text-sm">
              អ
            </div>
            <div>
              <div className="font-moul tracking-wide text-amber-300 text-[13px]">
                {schoolInfo.school_name || 'អនុវិទ្យាល័យទួលទទឹង'}
              </div>
              <div className="text-slate-300 text-[11px]">
                {schoolInfo.province} • {schoolInfo.district} • {schoolInfo.academic_year}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-950 text-emerald-300 border border-emerald-700/50">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Python 3.10 + SQLite 3 (Ready)
            </span>
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs transition disabled:opacity-50"
              title="គណនាឡើងវិញតាមរយៈ Python"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>គណនាឡើងវិញ</span>
            </button>
            <button
              onClick={onPrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold text-xs transition shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>បោះពុម្ព</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 overflow-x-auto scrollbar-none">
        <nav className="flex space-x-1 py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs md:text-sm font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                    isActive ? 'bg-blue-700 text-blue-100' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {tab.page}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
