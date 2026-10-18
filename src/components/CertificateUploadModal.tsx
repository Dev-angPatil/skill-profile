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

  useEffect(() => {
    if (isOpen) {
      setStep('upload');
      setVisibleSkills(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    if (step === 'scanning') {
      const t = setTimeout(() => setStep('extracting'), 1800);
      return () => clearTimeout(t);
    }
    if (step === 'extracting') {
      const interval = setInterval(() => {
        setVisibleSkills((prev) => {
          if (prev >= DEMO_EXTRACTED_SKILLS.length) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 500);

      const complete = setTimeout(() => {
        setStep('complete');
      }, DEMO_EXTRACTED_SKILLS.length * 500 + 700);

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
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg rounded-3xl glass-card border border-white/60 dark:border-white/10 shadow-2xl p-6 sm:p-8 z-10 bg-white/95 dark:bg-zinc-900/95 text-[var(--foreground)]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
          title="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Step 1: Upload preview */}
        {step === 'upload' && (
          <div className="text-center space-y-5">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-[var(--foreground)] shadow-xs">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight text-[var(--foreground)]">
                Add Certificate
              </h3>
              <p className="text-sm text-[var(--foreground-muted)] mt-1">
                Upload a certificate to automatically extract and verify skills.
              </p>
            </div>

            {/* Interactive demo certificate card */}
            <div
              onClick={() => setStep('scanning')}
              className="cursor-pointer border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-2xl p-3 hover:border-zinc-500 dark:hover:border-zinc-500 transition-all group"
            >
              <div className="w-full h-44 rounded-xl overflow-hidden bg-zinc-950 relative border border-zinc-800">
                <img
                  src="/assets/certificate-template.svg"
                  alt="Demo Certificate"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 flex items-center justify-center transition-colors">
                  <span className="px-4 py-2 rounded-xl bg-white dark:bg-zinc-900 text-xs font-semibold text-zinc-900 dark:text-white shadow-lg border border-zinc-200 dark:border-zinc-700">
                    Click to scan this certificate
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Scanning */}
        {step === 'scanning' && (
          <div className="text-center space-y-5">
            <div className="w-full h-44 rounded-2xl overflow-hidden bg-zinc-950 relative border border-zinc-800 shadow-md">
              <img
                src="/assets/certificate-template.svg"
                alt="Scanning Certificate"
                className="w-full h-full object-cover"
              />
              {/* High-visibility Laser Scan Line */}
              <div className="absolute inset-0 pointer-events-none">
                <div
                  className="absolute left-0 right-0 h-1 bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,1)]"
                  style={{
                    animation: 'certScan 1.6s ease-in-out infinite',
                  }}
                />
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-[var(--foreground)]">
              <ScanLine className="w-4 h-4 animate-pulse text-emerald-500" />
              <span className="font-semibold tracking-tight">AI Analyzer Scanning Certificate...</span>
            </div>
          </div>
        )}

        {/* Step 3: Extracting */}
        {step === 'extracting' && (
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-emerald-500" />
              <h3 className="text-lg font-bold tracking-tight text-[var(--foreground)]">
                Skills Extracted
              </h3>
            </div>

            <div className="space-y-2.5">
              {DEMO_EXTRACTED_SKILLS.map((s, i) => (
                <div
                  key={s.id}
                  className={`flex items-center justify-between p-3.5 rounded-xl border border-[var(--border-glass)] bg-[var(--surface-subtle)] transition-all duration-300 ${
                    i < visibleSkills
                      ? 'opacity-100 translate-y-0 scale-100'
                      : 'opacity-0 translate-y-2 scale-98'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="font-medium text-sm text-[var(--foreground)]">
                      {s.name}
                    </span>
                  </div>
                  <span className="font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400">
                    {s.delta} pts
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Complete */}
        {step === 'complete' && (
          <div className="text-center space-y-5">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight text-[var(--foreground)]">
                Skills Updated
              </h3>
              <p className="text-sm text-[var(--foreground-muted)] mt-1">
                3 skill points extracted and verified from certificate.
              </p>
            </div>

            <div className="space-y-2">
              {DEMO_EXTRACTED_SKILLS.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border-glass)]"
                >
                  <span className="text-sm font-medium text-[var(--foreground)]">
                    {s.name}
                  </span>
                  <span className="font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400">
                    {s.delta}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                onComplete(DEMO_EXTRACTED_SKILLS.map((s) => s.id));
                onClose();
              }}
              className="w-full py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-semibold text-sm hover:opacity-90 active:scale-[0.98] transition-all shadow-md"
            >
              Done
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes certScan {
          0% { top: 4%; }
          50% { top: 92%; }
          100% { top: 4%; }
        }
      `}</style>
    </div>
  );
};
