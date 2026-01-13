
export enum DocType {
  NOTA_DINAS = 'NOTA_DINAS',
  SURAT_TUGAS = 'SURAT_TUGAS'
}

export interface NotaDinasData {
  nomor: string;
  kepada: string;
  dari: string;
  hal: string;
  tanggal: string;
  lampiran: string;
  isi: string;
  tembusan: string;
}

export interface SuratTugasData {
  nomor: string;
  menimbang: string[];
  dasar: string[];
  petugas: {
    nama: string;
    nip: string;
    jabatan: string;
  }[];
  untuk: string;
  tanggal: string;
  tempat: string;
  penandatangan: {
    nama: string;
    nip: string;
    jabatan: string;
  };
}
