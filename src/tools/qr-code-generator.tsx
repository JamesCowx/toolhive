'use client';

import { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode';
import CopyButton from '@/components/CopyButton';

export default function QRCodeGenerator() {
  const [text, setText] = useState('https://example.com');
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (text.trim()) {
      setError(false);
      QRCode.toDataURL(text.trim(), { width: 400, margin: 2, color: { dark: '#0f172a', light: '#ffffff' } })
        .then(setQrDataUrl)
        .catch(() => { setError(true); setQrDataUrl(''); });
    } else {
      setQrDataUrl('');
    }
  }, [text]);

  function downloadQR() {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `qrcode-${Date.now()}.png`;
    a.click();
  }

  return (
    <div className="tool-section">
      <div>
        <label className="label-premium">Enter text or URL</label>
        <textarea
          className="input-premium min-h-[80px] resize-y"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Enter text or URL to encode..."
        />
      </div>

      <div className="flex flex-col items-center gap-6">
        {error ? (
          <div className="flex h-56 w-56 items-center justify-center rounded-2xl border-2 border-dashed border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/10">
            <p className="text-sm text-red-500 dark:text-red-400">Text too long for QR code</p>
          </div>
        ) : qrDataUrl ? (
          <>
            <div className="rounded-2xl bg-white p-4 shadow-lg animate-scale-in">
              <img src={qrDataUrl} alt="QR Code" className="h-52 w-52" />
            </div>
            <div className="flex gap-3">
              <button onClick={downloadQR} className="btn-premium">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download PNG
              </button>
              <CopyButton text={text} label="Copy Text" />
            </div>
          </>
        ) : (
          <div className="flex h-56 w-56 items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600">
            <div className="text-center">
              <svg className="h-10 w-10 mx-auto text-gray-300 dark:text-gray-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
              <p className="text-sm text-gray-400">Enter text to generate QR code</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
