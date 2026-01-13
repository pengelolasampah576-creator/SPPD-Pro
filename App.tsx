
import React, { useState } from 'react';
import Layout from './components/Layout';
import NotaDinasForm from './components/NotaDinasForm';
import SuratTugasForm from './components/SuratTugasForm';

const Dashboard: React.FC = () => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
        </div>
        <h3 className="text-3xl font-bold">128</h3>
        <p className="text-slate-500 text-sm">Nota Dinas Bulan Ini</p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
        </div>
        <h3 className="text-3xl font-bold">45</h3>
        <p className="text-slate-500 text-sm">Surat Tugas Diterbitkan</p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h3 className="text-3xl font-bold">92%</h3>
        <p className="text-slate-500 text-sm">Efisiensi AI Generated</p>
      </div>
    </div>

    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
        <h3 className="font-bold text-slate-800">Dokumen Terbaru</h3>
        <button className="text-blue-600 text-sm font-semibold hover:underline">Lihat Semua</button>
      </div>
      <table className="w-full text-left">
        <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
          <tr>
            <th className="px-6 py-4">Nomor Dokumen</th>
            <th className="px-6 py-4">Jenis</th>
            <th className="px-6 py-4">Perihal/Tujuan</th>
            <th className="px-6 py-4">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-sm">
          <tr>
            <td className="px-6 py-4 font-medium">800/ND/012/2024</td>
            <td className="px-6 py-4">Nota Dinas</td>
            <td className="px-6 py-4">Undangan Rapat Evaluasi</td>
            <td className="px-6 py-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">Selesai</span></td>
          </tr>
          <tr>
            <td className="px-6 py-4 font-medium">094/ST/044/2024</td>
            <td className="px-6 py-4">Surat Tugas</td>
            <td className="px-6 py-4">Workshop Implementasi AI</td>
            <td className="px-6 py-4"><span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs">Draft</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

const App: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <Dashboard />;
      case 'nota-dinas':
        return <NotaDinasForm />;
      case 'surat-tugas':
        return <SuratTugasForm />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeMenu={activeMenu} onMenuChange={setActiveMenu}>
      {renderContent()}
    </Layout>
  );
};

export default App;
