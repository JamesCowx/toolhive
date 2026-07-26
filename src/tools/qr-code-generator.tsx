'use client';

import { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode';
import { copyToClipboard } from '@/lib/utils';

export default function QRCodeGenerator() {
  const [text, setText] = useState('https://example.com');
  const [qrDataUrl, setQrDataUrl] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (text.trim()) {
      QRCode.toDataURL(text.trim(), { width: 400, margin: 2, color: { dark: '#0f172a', light: '#ffffff' } })
        .then(setQrDataUrl)
        .catch(() => setQrDataUrl(''));
    } else {
      setQrDataUrl('');
    }
  }, [text]);

  async function handleCopy() {
    if (qrDataUrl) await copyToClipboard(text);
  }

  async function downloadQR() {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `qrcode-${Date.now()}.png`;
    a.click();
  }

  return (
    <div className="tool-section">
      <div>
        <label className="label-text">Enter text or URL</label>
        <textarea
          className="input-field min-h-[80px] resize-y"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Enter text or URL to encode..."
        />
      </div>

      <div className="flex flex-col items-center gap-4">
        {qrDataUrl ? (
          <>
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <img src={qrDataUrl} alt="QR Code" className="h-48 w-48" />
            </div>
            <div className="flex gap-2">
              <button onClick={downloadQR} className="btn-primary">Download PNG</button>
              <button onClick={handleCopy} className="btn-secondary">Copy Text</button>
            </div>
          </>
        ) : (
          <div className="flex h-48 w-48 items-center justify-center rounded-xl border-2 border-dashed border-gray-300">
            <p className="text-sm text-gray-400">Enter text to generate</p>
          </div>
        )}
      </div>
    </div>
  );
}
