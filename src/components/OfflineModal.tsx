import React from 'react';
import { Download, X, Smartphone, Monitor, WifiOff, HardDrive, CheckCircle2 } from 'lucide-react';

interface OfflineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OfflineModal: React.FC<OfflineModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleDownloadStandalone = () => {
    // Fetch or construct download of the standalone offline HTML
    const link = document.createElement('a');
    link.href = './ca-inter-offline.html';
    link.download = 'ca-inter-offline.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleTriggerInstall = async () => {
    const promptEvent = (window as any).deferredInstallPrompt;
    if (promptEvent) {
      try {
        promptEvent.prompt();
        const choice = await promptEvent.userChoice;
        console.log('Install prompt result:', choice);
        (window as any).deferredInstallPrompt = null;
      } catch (err) {
        console.error('Install prompt failed:', err);
      }
    } else {
      alert("📱 How to install on your phone:\n\n• On iPhone / iPad (Safari): Tap the Share button (square with upward arrow) ➔ tap 'Add to Home Screen'.\n\n• On Android (Chrome / Brave): Tap the 3 dots menu (⋮) at top right ➔ tap 'Install app' or 'Add to Home screen'.\n\n• On Laptop / PC (Chrome / Edge): Click the install icon (⊕) inside your browser address bar.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400">
              <WifiOff className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base sm:text-lg">Run 100% Offline (No Server Needed)</h3>
              <p className="text-xs text-slate-400">How to use CA Inter Pro without internet or running server</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2 Methods Card */}
        <div className="space-y-4">
          
          {/* Method 1: Single-file Standalone HTML */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-700/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <HardDrive className="w-4 h-4" />
                <span>Method 1: Standalone Single-File (.html)</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800">
                Double-Click & Run
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              All styles, scripts, questions, and evaluation logic are bundled into a <strong>single ~400 KB HTML file</strong>. You can save it to your computer, phone, or flash drive. Just double-click or tap to open in Chrome, Safari, Edge, or Firefox—<strong>no server or internet needed!</strong>
            </p>

            <button
              onClick={handleDownloadStandalone}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold rounded-xl shadow-md transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download Standalone Offline HTML File</span>
            </button>
          </div>

          {/* Method 2: Mobile / Desktop App (PWA) */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-700/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                <Smartphone className="w-4 h-4" />
                <span>Method 2: Install as Phone / Desktop App (PWA)</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-950 text-blue-300 border border-blue-800">
                1-Tap Install
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Open the web link on any phone (Android / iOS) or computer. Tap your browser menu (<kbd className="px-1 bg-slate-800 rounded text-slate-300">⋮</kbd> or <kbd className="px-1 bg-slate-800 rounded text-slate-300">Share</kbd>) and select <strong>"Add to Home Screen"</strong> or <strong>"Install App"</strong>. The app installs locally and works completely offline forever!
            </p>

            <button
              onClick={handleTriggerInstall}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl shadow-md transition-all"
            >
              <Smartphone className="w-4 h-4" />
              <span>Tap Here to Trigger App Installation</span>
            </button>

            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Offline cache is automatically managed by the built-in Service Worker.</span>
            </div>

            <button
              onClick={async () => {
                if ('serviceWorker' in navigator) {
                  const regs = await navigator.serviceWorker.getRegistrations();
                  for (const r of regs) await r.unregister();
                }
                if ('caches' in window) {
                  const keys = await caches.keys();
                  for (const k of keys) await caches.delete(k);
                }
                window.location.href = window.location.href.split('?')[0] + '?reload=' + Date.now();
              }}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-semibold rounded-xl border border-slate-700 transition-all text-center"
            >
              🔄 Seeing Old Version? Tap here to Force Reload to Latest
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700"
          >
            Got it, Close
          </button>
        </div>
      </div>
    </div>
  );
};
