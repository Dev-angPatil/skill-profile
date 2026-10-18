'use client';

import React, { useState, useEffect } from 'react';
import { X, ScanLine, Brain, CheckCircle2, Award } from 'lucide-react';

interface CertificateUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (skillIds: string[]) => void;
}

type Step = 'upload' | 'scanning' | 'extracting' | 'complete';

const DEMO_EXTRACTED_SKILLS = [
  { name: 'Python', delta: '+12', id: 'python' },
  { name: 'Cloud & DevOps', delta: '+8', id: 'cloud-aws' },
  { name: 'Machine Learning', delta: '+5', id: 'machine-learning' },
];

export const CertificateUploadModal: React.FC<CertificateUploadModalProps> = ({
  isOpen,
  onClose,
  onComplete,
}) => {
  const [step, setStep] = useState<Step>('upload');
  const [visibleSkills, setVisibleSkills] = useState<number>(0);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep('upload');
      setVisibleSkills(0);
    }
  }, [isOpen]);

  // Auto-advance through demo steps
  useEffect(() => {
    if (!isOpen) return;

    if (step === 'scanning') {
      const t = setTimeout(() => setStep('extracting'), 2000);
      return () => clearTimeout(t);
    }
    if (step === 'extracting') {
      // Reveal skills one by one
      const interval = setInterval(() => {
        setVisibleSkills((prev) => {
          if (prev >= DEMO_EXTRACTED_SKILLS.length) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 600);

      const complete = setTimeout(() => {
        setStep('complete');
      }, DEMO_EXTRACTED_SKILLS.length * 600 + 800);

      return () => {
        clearInterval(interval);
        clearTimeout(complete);
      };
    }
  }, [step, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-lg rounded-3xl glass-card border border-white/60 dark:border-white/10 shadow-2xl p-6 sm:p-8 z-10">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Step: Upload (initial state) */}
        {step === 'upload' && (
          <div className="text-center space-y-5">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
              <Award className="w-7 h-7 text-[var(--foreground)]" />
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight text-[var(--foreground)]">Add Certificate</h3>
              <p className="text-sm text-[var(--foreground-muted)] mt-1">Upload a certificate to automatically extract and verify skills.</p>
            </div>

            {/* Fake upload zone with demo certificate */}
            <div
              onClick={() => setStep('scanning')}
              className="cursor-pointer border-2 border-dashed border-zinc-300 dark:border-zinc-600 rounded-2xl p-4 hover:border-zinc-500 dark:hover:border-zinc-400 transition-colors group"
            >
              <div className="w-full h-40 rounded-xl overflow-hidden bg-zinc-50 dark:bg-zinc-800/50 relative">
                <img
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c476?auto=format&fit=crop&q=80&w=600"
                  alt="Demo certificate"
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-90 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="px-4 py-2 rounded-xl bg-white/90 dark:bg-zinc-900/90 text-sm font-medium text-[var(--foreground)] shadow-md backdrop-blur-sm">
                    Click to scan this certificate
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step: Scanning */}
        {step === 'scanning' && (
          <div className="text-center space-y-5">
            <div className="w-full h-44 rounded-2xl overflow-hidden bg-zinc-50 dark:bg-zinc-800/50 relative">
              <img
                src="https://images.unsplash.com/photo-1523050854058-8df90110c476?auto=format&fit=crop&q=80&w=600"
                alt="Scanning certificate"
                className="w-full h-full object-cover"
              />
              {/* Animated scan line */}
              <div className="absolute inset-0">
                <div
                  className="absolute left-0 right-0 h-0.5 bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]"
                  style={{
                    animation: 'scan 1.5s ease-in-out infinite',
                  }}
                />
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-[var(--foreground)]">
              <ScanLine className="w-4 h-4 animate-pulse text-emerald-500" />
              <span className="font-medium">Scanning certificate...</span>
            </div>
          </div>
        )}

        {/* Step: Extracting */}
        {step === 'extracting' && (
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-[var(--foreground)]" />
              <h3 className="text-lg font-bold tracking-tight text-[var(--foreground)]">Skills Detected</h3>
            </div>

            <div className="space-y-2.5">
              {DEMO_EXTRACTED_SKILLS.map((s, i) => (
                <div
                  key={s.id}
                  className={`flex items-center justify-between p-3.5 rounded-xl glass-card transition-all duration-500 ${
                    i < visibleSkills
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-3'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="font-medium text-sm text-[var(--foreground)]">{s.name}</span>
                  </div>
                  <span className="font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400">
                    {s.delta}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step: Complete */}
        {step === 'complete' && (
          <div className="text-center space-y-5">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight text-[var(--foreground)]">Skills Updated</h3>
              <p className="text-sm text-[var(--foreground-muted)] mt-1">3 skills scored from your certificate.</p>
            </div>

            <div className="space-y-2">
              {DEMO_EXTRACTED_SKILLS.map((s) => (
                <div key={s.id} className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
                  <span className="text-sm font-medium text-[var(--foreground)]">{s.name}</span>
                  <span className="font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400">{s.delta}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                onComplete(DEMO_EXTRACTED_SKILLS.map((s) => s.id));
                onClose();
              }}
              className="w-full py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-medium text-sm hover:opacity-90 active:scale-[0.98] transition-all shadow-md"
            >
              Done
            </button>
          </div>
        )}
      </div>

      {/* Scan animation keyframe */}
      <style jsx>{`
        @keyframes scan {
          0% { top: 0%; }
          50% { top: 100%; }
          100% { top: 0%; }
        }
      `}</style>
    </div>
  );
};
