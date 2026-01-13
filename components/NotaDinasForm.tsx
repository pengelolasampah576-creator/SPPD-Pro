
import React, { useState } from 'react';
import { NotaDinasData } from '../types';
import { generateNotaContent } from '../services/geminiService';

const NotaDinasForm: React.FC = () => {
  const [data, setData] = useState<NotaDinasData>({
    nomor: '800/ND/001/2024',
    kepada: 'Semua Kepala Bagian',
    dari: 'Kepala Dinas',
    hal: 'Rapat Koordinasi Mingguan',
    tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
    lampiran: '-',
    isi: '',
    tembusan: 'Arsip'
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!data.hal) return alert('Silakan isi Perihal terlebih dahulu');
    setIsLoading(true);
    try {
      const content = await generateNotaContent(data.hal);
      setData(prev => ({ ...prev, isi: content }));
    } catch (error) {
      console.error(error);
      alert('Gagal mengambil draft AI');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* Editor Section */}
      <div className="no-print bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
        <h2 className="text-xl font-bold text-slate-800 mb-4 border-b pb-2">Draft Nota Dinas</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 uppercase">Nomor</label>
            <input 
              type="text" 
              className="w-full border-slate-200 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              value={data.nomor}
              onChange={e => setData({...data, nomor: e.target.value})}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 uppercase">Tanggal</label>
            <input 
              type="text" 
              className="w-full border-slate-200 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              value={data.tanggal}
              onChange={e => setData({...data, tanggal: e.target.value})}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 uppercase">Kepada</label>
            <input 
              type="text" 
              className="w-full border-slate-200 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              value={data.kepada}
              onChange={e => setData({...data, kepada: e.target.value})}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 uppercase">Dari</label>
            <input 
              type="text" 
              className="w-full border-slate-200 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              value={data.dari}
              onChange={e => setData({...data, dari: e.target.value})}
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-500 uppercase">Perihal</label>
          <div className="flex gap-2">
            <input 
              type="text" 
              className="flex-1 border-slate-200 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              value={data.hal}
              onChange={e => setData({...data, hal: e.target.value})}
            />
            <button 
              onClick={handleGenerate}
              disabled={isLoading}
              className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-100 flex items-center gap-2 transition-colors"
            >
              {isLoading ? '...' : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  Draft AI
                </>
              )}
            </button>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-500 uppercase">Isi Nota</label>
          <textarea 
            rows={8}
            className="w-full border-slate-200 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            value={data.isi}
            onChange={e => setData({...data, isi: e.target.value})}
            placeholder="Tuliskan isi pesan atau gunakan Draft AI..."
          />
        </div>

        <button 
          onClick={handlePrint}
          className="w-full bg-slate-800 text-white py-3 rounded-lg font-bold hover:bg-slate-900 transition-all flex items-center justify-center gap-3"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Cetak Nota Dinas
        </button>
      </div>

      {/* Preview Section */}
      <div className="print-area bg-white rounded shadow-lg border border-slate-200 p-[2cm] min-h-[29.7cm] flex flex-col font-serif-formal text-[12pt] leading-relaxed">
        {/* Kop Surat Placeholder */}
        <div className="text-center border-b-4 border-double border-black pb-4 mb-8">
          <h1 className="text-2xl font-bold uppercase">Pemerintah Provinsi Jawa Barat</h1>
          <h2 className="text-xl font-bold uppercase">Dinas Komunikasi dan Informatika</h2>
          <p className="text-sm">Jl. Ir. H. Juanda No. 28, Bandung, 40115</p>
          <p className="text-sm">Telepon: (022) 4203310 | Website: diskominfo.jabarprov.go.id</p>
        </div>

        <h3 className="text-center font-bold text-xl underline mb-8">NOTA DINAS</h3>

        <div className="grid grid-cols-[100px_10px_1fr] gap-y-2 mb-8">
          <span className="font-bold">Kepada</span> <span>:</span> <span>{data.kepada}</span>
          <span className="font-bold">Dari</span> <span>:</span> <span>{data.dari}</span>
          <span className="font-bold">Tanggal</span> <span>:</span> <span>{data.tanggal}</span>
          <span className="font-bold">Nomor</span> <span>:</span> <span>{data.nomor}</span>
          <span className="font-bold">Sifat</span> <span>:</span> <span>Biasa</span>
          <span className="font-bold">Lampiran</span> <span>:</span> <span>{data.lampiran}</span>
          <span className="font-bold">Hal</span> <span>:</span> <span className="font-bold uppercase underline">{data.hal}</span>
        </div>

        <div className="border-t border-black mb-6"></div>

        <div className="flex-1 whitespace-pre-wrap text-justify">
          {data.isi || <span className="text-slate-300 italic">[Isi Nota akan tampil di sini]</span>}
        </div>

        <div className="mt-12 flex justify-end">
          <div className="text-center min-w-[200px]">
            <p className="mb-20">{data.dari},</p>
            <p className="font-bold underline text-lg">NAMA KEPALA DINAS</p>
            <p>NIP. 19750812 200003 1 002</p>
          </div>
        </div>

        <div className="mt-12 text-sm italic">
          <p>Tembusan:</p>
          <p>{data.tembusan}</p>
        </div>
      </div>
    </div>
  );
};

export default NotaDinasForm;
