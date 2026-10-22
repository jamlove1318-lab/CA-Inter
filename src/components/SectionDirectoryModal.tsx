import React from 'react';
import { Search, X, BookOpen, Layers } from 'lucide-react';
import { SECTIONS_AND_STANDARDS, StatutoryItem } from '../data/sectionsAndStandardsData';

interface SectionDirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SectionDirectoryModal: React.FC<SectionDirectoryModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('All');

  if (!isOpen) return null;

  const categories = ['All', 'Company Law', 'Income Tax', 'GST', 'Standards on Auditing (SA)', 'Accounting Standards (AS)'];

  const filteredItems = SECTIONS_AND_STANDARDS.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = 
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.keyRule.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-950 border border-blue-800 flex items-center justify-center text-blue-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-lg">ICAI Statutory Directory & Quick Lookup</h3>
              <p className="text-xs text-slate-400">Search Sections, SAs, and AS instantly while solving papers</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar & Filter Pills */}
        <div className="p-4 bg-slate-900 border-b border-slate-700/80 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by section number, SA name, topic (e.g. 135, 115BAC, 500, Buyback, ITC)..."
              className="w-full bg-slate-800 text-slate-100 text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-blue-500 font-sans"
              autoFocus
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results List */}
        <div className="p-4 overflow-y-auto space-y-3 divide-y divide-slate-700/60">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div key={item.id} className="pt-3 first:pt-0 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-white text-sm font-mono text-amber-400">
                      {item.code}
                    </span>
                    <span className="font-bold text-slate-200 text-sm">
                      {item.title}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900 text-slate-400 border border-slate-700">
                    {item.category}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans bg-slate-900/50 p-2.5 rounded-lg border border-slate-800">
                  {item.keyRule}
                </p>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-slate-400 text-xs">
              No sections or standards found matching "{searchTerm}".
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-900 border-t border-slate-700 text-right">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700"
          >
            Close Directory
          </button>
        </div>
      </div>
    </div>
  );
};
