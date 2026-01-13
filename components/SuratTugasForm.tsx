
import React, { useState } from 'react';
import { SuratTugasData } from '../types';
import { generateSuratTugasDetails } from '../services/geminiService';

const SuratTugasForm: React.FC = () => {
  const [data, setData] = useState<SuratTugasData>({
    nomor: '094/ST/005/2024',
    menimbang: [
      'Bahwa dalam rangka peningkatan kompetensi pegawai...',
      'Bahwa sehubungan dengan undangan dari...'
    ],
    dasar: [
      'Undang-Undang Nomor 5 Tahun 2014 tentang Aparatur Sipil Negara',
      'Peraturan Pemerintah Nomor 11 Tahun 2017...'
    ],
    petugas: [
      { nama: 'Ahmad Subardjo, S.Kom.', nip: '19880101 201501 1 001', jabatan: 'Pranata Komputer Ahli Muda' }
    ],
    untuk: 'Mengikuti Pelatihan Keamanan Siber yang diselenggarakan oleh BSSN di Jakarta pada tanggal 20-22 Mei 2024.',
    tanggal: '15 Mei 2024',
    tempat: 'Bandung',
    penandatangan: {
      nama: 'Dr. Ir. H. Setiaji, S.T., M.Si.',
      nip: '19710405 199703 1 004',
      jabatan: 'Kepala Dinas'
    }
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSuggest = async () => {
    if (!data.untuk) return alert('Silakan isi tujuan penugasan terlebih dahulu');
    setIsLoading(true);
    try {
      const suggestions = await generateSuratTugasDetails(data.untuk);
      setData(prev => ({
        ...prev,
        menimbang: suggestions.menimbang.length > 0 ? suggestions.menimbang : prev.menimbang,
        dasar: suggestions.dasar.length > 0 ? suggestions.dasar : prev.dasar
      }));
    } catch (error) {
      console.error(error);
      alert('Gagal mengambil saran AI');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* Editor Section */}
      <div className="no-print bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
        <h2 className="text-xl font-bold text-slate-800 mb-4 border-b pb-2">Draft Surat Tugas</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 uppercase">Nomor Surat</label>
            <input 
              type="text" 
              className="w-full border-slate-200 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              value={data.nomor}
              onChange={e => setData({...data, nomor: e.target.value})}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 uppercase">Tujuan Penugasan</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                className="flex-1 border-slate-200 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                value={data.untuk}
                onChange={e => setData({...data, untuk: e.target.value})}
              />
              <button 
                onClick={handleSuggest}
                disabled={isLoading}
                className="bg-purple-50 text-purple-600 px-3 py-2 rounded-lg text-sm font-semibold hover:bg-purple-100 transition-colors"
                title="Saran Menimbang & Dasar"
              >
                {isLoading ? '...' : 'Auto'}
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-700">Petugas yang Ditunjuk:</h3>
          {data.petugas.map((p, idx) => (
            <div key={idx} className="p-3 border rounded-lg bg-slate-50 space-y-2 relative">
               <button 
                onClick={() => setData({...data, petugas: data.petugas.filter((_, i) => i !== idx)})}
                className="absolute top-2 right-2 text-red-500"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
              </button>
              <input 
                placeholder="Nama" 
                className="w-full text-xs p-1 border rounded" 
                value={p.nama}
                onChange={e => {
                  const newPetugas = [...data.petugas];
                  newPetugas[idx].nama = e.target.value;
                  setData({...data, petugas: newPetugas});
                }}
              />
              <input 
                placeholder="NIP" 
                className="w-full text-xs p-1 border rounded" 
                value={p.nip}
                onChange={e => {
                  const newPetugas = [...data.petugas];
                  newPetugas[idx].nip = e.target.value;
                  setData({...data, petugas: newPetugas});
                }}
              />
              <input 
                placeholder="Jabatan" 
                className="w-full text-xs p-1 border rounded" 
                value={p.jabatan}
                onChange={e => {
                  const newPetugas = [...data.petugas];
                  newPetugas[idx].jabatan = e.target.value;
                  setData({...data, petugas: newPetugas});
                }}
              />
            </div>
          ))}
          <button 
            onClick={() => setData({...data, petugas: [...data.petugas, {nama: '', nip: '', jabatan: ''}]})}
            className="text-xs text-blue-600 font-bold hover:underline"
          >
            + Tambah Petugas
          </button>
        </div>

        <button 
          onClick={() => window.print()}
          className="w-full bg-slate-800 text-white py-3 rounded-lg font-bold hover:bg-slate-900 transition-all flex items-center justify-center gap-3"
        >
          Cetak Surat Tugas
        </button>
      </div>

      {/* Preview Section */}
      <div className="print-area bg-white rounded shadow-lg border border-slate-200 p-[2cm] min-h-[29.7cm] flex flex-col font-serif-formal text-[12pt] leading-snug">
         <div className="text-center border-b-4 border-double border-black pb-4 mb-8">
          <h1 className="text-2xl font-bold uppercase">Pemerintah Provinsi Jawa Barat</h1>
          <h2 className="text-xl font-bold uppercase">Dinas Komunikasi dan Informatika</h2>
          <p className="text-sm">Jl. Ir. H. Juanda No. 28, Bandung, 40115</p>
        </div>

        <h3 className="text-center font-bold text-xl underline mb-1">SURAT TUGAS</h3>
        <p className="text-center mb-8">Nomor: {data.nomor}</p>

        <div className="space-y-4">
          <div className="grid grid-cols-[120px_10px_1fr] gap-x-2">
            <span className="font-bold">Menimbang</span>
            <span>:</span>
            <div className="space-y-1">
              {data.menimbang.map((m, i) => (
                <div key={i} className="flex gap-2">
                  <span>{String.fromCharCode(97 + i)}.</span>
                  <p className="text-justify">{m}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-[120px_10px_1fr] gap-x-2">
            <span className="font-bold">Dasar</span>
            <span>:</span>
            <div className="space-y-1">
              {data.dasar.map((d, i) => (
                <div key={i} className="flex gap-2">
                  <span>{i + 1}.</span>
                  <p className="text-justify">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <h4 className="text-center font-bold mt-8 mb-6 uppercase tracking-widest">MEMERINTAHKAN:</h4>

        <div className="grid grid-cols-[120px_10px_1fr] gap-x-2 mb-4">
          <span className="font-bold">Kepada</span>
          <span>:</span>
          <div className="space-y-4">
            {data.petugas.map((p, i) => (
              <div key={i} className="grid grid-cols-[80px_10px_1fr] gap-y-1">
                <span>Nama</span> <span>:</span> <span className="font-bold">{p.nama}</span>
                <span>NIP</span> <span>:</span> <span>{p.nip}</span>
                <span>Jabatan</span> <span>:</span> <span>{p.jabatan}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-[120px_10px_1fr] gap-x-2 mt-4">
          <span className="font-bold">Untuk</span>
          <span>:</span>
          <p className="text-justify">{data.untuk}</p>
        </div>

        <div className="mt-auto pt-12 flex justify-end">
          <div className="text-center min-w-[250px]">
            <p className="mb-1">{data.tempat}, {data.tanggal}</p>
            <p className="font-bold uppercase mb-20">{data.penandatangan.jabatan},</p>
            <p className="font-bold underline text-lg">{data.penandatangan.nama}</p>
            <p>NIP. {data.penandatangan.nip}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuratTugasForm;
