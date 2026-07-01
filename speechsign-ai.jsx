import { useState, useEffect, useRef } from "react";

// ─── Icons ────────────────────────────────────────────────────────────────────
const Icon = ({ path, size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d={path} />
  </svg>
);

const icons = {
  mic: "M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3zM19 10v2a7 7 0 0 1-14 0v-2M12 19v3M8 22h8",
  upload: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12",
  hand: "M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8l1 1a4 4 0 0 0 4 2h2a4 4 0 0 0 4-4v-1a2 2 0 0 0-2-2h-3z",
  chat: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  book: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z",
  dashboard: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22V12h6v10",
  users: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  settings: "M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  sun: "M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M12 6a6 6 0 0 0 0 12A6 6 0 0 0 12 6z",
  moon: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z",
  play: "M5 3l14 9-14 9V3z",
  pause: "M6 4h4v16H6zM14 4h4v16h-4z",
  stop: "M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z",
  volume: "M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07",
  download: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3",
  search: "M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0",
  bell: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0",
  activity: "M22 12h-4l-3 9L9 3l-3 9H2",
  zap: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  camera: "M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  globe: "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  check: "M20 6L9 17l-5-5",
  x: "M18 6L6 18M6 6l12 12",
  chevronRight: "M9 18l6-6-6-6",
  chevronLeft: "M15 18l-6-6 6-6",
  menu: "M3 12h18M3 6h18M3 18h18",
  arrow: "M5 12h14M12 5l7 7-7 7",
  transcript: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8",
  brain: "M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.16M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.16",
  quote: "M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1zM15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z",
  log: "M9 12h6M9 16h6M17 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM9 8h6",
};

// ─── Design Tokens ────────────────────────────────────────────────────────────
const COLORS = {
  primary: "#6C63FF",
  primaryLight: "#8B84FF",
  primaryDark: "#4F46E5",
  accent: "#00D4AA",
  accentLight: "#34EFC8",
  warn: "#FF6B6B",
  gold: "#FFB347",
};

// ─── Mock Data ────────────────────────────────────────────────────────────────
const mockTranscripts = [
  { id: 1, title: "Rapat Tim Marketing Q4", duration: "45:23", date: "2025-06-15", speakers: 3, language: "Indonesia", sentiment: "positive", words: 2840 },
  { id: 2, title: "Interview Kandidat Senior Dev", duration: "32:10", date: "2025-06-14", speakers: 2, language: "Inggris", sentiment: "neutral", words: 1920 },
  { id: 3, title: "Presentasi Produk Klien", duration: "58:47", date: "2025-06-12", speakers: 4, language: "Indonesia", sentiment: "positive", words: 3210 },
  { id: 4, title: "Sesi Sign Language Belajar #12", duration: "20:05", date: "2025-06-10", speakers: 1, language: "Indonesia", sentiment: "positive", words: 1100 },
];

const mockStats = [
  { label: "Total Rekaman", value: "248", delta: "+12 minggu ini", icon: "mic", color: COLORS.primary },
  { label: "Transkripsi", value: "1,842", delta: "+89 bulan ini", icon: "transcript", color: COLORS.accent },
  { label: "Pengguna Aktif", value: "3,409", delta: "+231 bulan ini", icon: "users", color: COLORS.gold },
  { label: "Waktu Dihemat", value: "9,210j", delta: "estimasi jam kerja", icon: "zap", color: COLORS.warn },
];

const mockMessages = [
  { id: 1, sender: "A", type: "speech", text: "Halo, selamat pagi! Apa kabar hari ini?", time: "09:01", lang: "ID" },
  { id: 2, sender: "B", type: "sign", text: "Kabar saya baik, terima kasih sudah bertanya.", time: "09:01", lang: "ID" },
  { id: 3, sender: "A", type: "speech", text: "Apakah kita bisa memulai presentasinya sekarang?", time: "09:02", lang: "ID" },
  { id: 4, sender: "B", type: "sign", text: "Tentu, saya sudah siap.", time: "09:02", lang: "ID" },
];

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "dashboard" },
  { id: "recording", label: "Rekam Suara", icon: "mic" },
  { id: "upload", label: "Upload File", icon: "upload" },
  { id: "sign", label: "Bahasa Isyarat", icon: "hand" },
  { id: "conversation", label: "Percakapan", icon: "chat" },
  { id: "learning", label: "Pusat Belajar", icon: "book" },
  { id: "transcripts", label: "Transkripsi", icon: "transcript" },
  { id: "admin", label: "Admin", icon: "shield" },
  { id: "profile", label: "Profil", icon: "settings" },
];

// ─── Waveform Visualizer ──────────────────────────────────────────────────────
function WaveformBars({ active, color = COLORS.primary }) {
  const [bars, setBars] = useState(Array(20).fill(4));
  useEffect(() => {
    if (!active) { setBars(Array(20).fill(4)); return; }
    const id = setInterval(() => setBars(Array(20).fill(0).map(() => Math.random() * 40 + 4)), 120);
    return () => clearInterval(id);
  }, [active]);
  return (
    <div className="flex items-end gap-0.5 h-12">
      {bars.map((h, i) => (
        <div key={i} style={{ height: `${h}px`, background: color, borderRadius: 2, width: 4, transition: "height 0.1s ease" }} />
      ))}
    </div>
  );
}

// ─── Sentiment Badge ──────────────────────────────────────────────────────────
function SentimentBadge({ sentiment }) {
  const map = { positive: { label: "Positif", bg: "bg-emerald-500/20", text: "text-emerald-400" }, neutral: { label: "Netral", bg: "bg-yellow-500/20", text: "text-yellow-400" }, negative: { label: "Negatif", bg: "bg-red-500/20", text: "text-red-400" } };
  const s = map[sentiment] || map.neutral;
  return <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.bg} ${s.text}`}>{s.label}</span>;
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ toasts }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map(t => (
        <div key={t.id} className="flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl text-sm font-medium pointer-events-auto"
          style={{ background: t.type === "success" ? "#10b981" : t.type === "error" ? "#ef4444" : COLORS.primary, color: "#fff", maxWidth: 320 }}>
          <Icon path={t.type === "success" ? icons.check : t.type === "error" ? icons.x : icons.bell} size={16} />
          {t.message}
        </div>
      ))}
    </div>
  );
}

// ─── Landing Page ─────────────────────────────────────────────────────────────
function LandingPage({ onEnter, dark }) {
  const features = [
    { icon: "mic", title: "Speech to Text Real-time", desc: "Transkripsi suara menjadi teks secara langsung dengan akurasi tinggi menggunakan AI Whisper." },
    { icon: "hand", title: "Sign Language AI", desc: "Kamera mendeteksi bahasa isyarat dan mengubahnya menjadi teks atau suara secara real-time." },
    { icon: "chat", title: "Percakapan Dua Arah", desc: "Suara dan isyarat saling diterjemahkan sehingga komunikasi berjalan alami antara semua orang." },
    { icon: "globe", title: "Multi Bahasa", desc: "Dukung Indonesia, Inggris, Jepang, Korea, dan Arab dengan deteksi bahasa otomatis." },
    { icon: "brain", title: "AI Summary & Analisis", desc: "Ringkasan otomatis, poin penting, sentimen, dan daftar tugas dari setiap sesi." },
    { icon: "book", title: "Pusat Belajar Isyarat", desc: "AI evaluasi gerakan Anda dan memberikan skor akurasi untuk pembelajaran bahasa isyarat." },
  ];
  const testimonials = [
    { name: "Dr. Sari Wulandari", role: "Kepala SLB Harapan Bangsa", quote: "SpeechSign AI mengubah cara kami berkomunikasi dengan siswa tunarungu. Inklusivitas yang sesungguhnya.", avatar: "SW" },
    { name: "Budi Santoso", role: "HR Manager, PT Mandiri Sejahtera", quote: "Rapat perusahaan kini dapat diikuti semua karyawan tanpa terkecuali. Platform yang luar biasa.", avatar: "BS" },
    { name: "Prof. Rina Haryati", role: "Dekan Fakultas Pendidikan UI", quote: "Penelitian kami tentang inklusi pendidikan sangat terbantu dengan teknologi yang ada di sini.", avatar: "RH" },
  ];
  const pricing = [
    { name: "Gratis", price: "Rp 0", period: "/bulan", features: ["5 rekaman/bulan", "100 menit transkripsi", "Bahasa Indonesia", "Export TXT"], cta: "Mulai Gratis", highlight: false },
    { name: "Pro", price: "Rp 99.000", period: "/bulan", features: ["Rekaman tak terbatas", "1000 menit transkripsi", "5 bahasa", "AI Summary & Meeting Notes", "Export PDF, DOCX, SRT", "Sign Language Translator"], cta: "Coba 14 Hari", highlight: true },
    { name: "Enterprise", price: "Custom", period: "", features: ["Semua fitur Pro", "API access", "Admin dashboard", "SLA 99.9%", "On-premise option", "Dedicated support"], cta: "Hubungi Kami", highlight: false },
  ];

  return (
    <div className={`min-h-screen ${dark ? "bg-[#0E0C1A] text-white" : "bg-white text-gray-900"}`}>
      {/* Nav */}
      <nav className={`fixed top-0 w-full z-40 backdrop-blur-xl border-b ${dark ? "bg-[#0E0C1A]/80 border-white/10" : "bg-white/80 border-gray-200"}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.accent})` }}>
              <Icon path={icons.hand} size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">SpeechSign <span style={{ color: COLORS.primary }}>AI</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            {["Fitur", "Cara Kerja", "Harga", "FAQ"].map(l => (
              <a key={l} href="#" className={`hover:text-purple-400 transition-colors ${dark ? "text-gray-400" : "text-gray-600"}`}>{l}</a>
            ))}
          </div>
          <button onClick={onEnter} className="px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90 hover:scale-105"
            style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.accent})` }}>
            Masuk ke App →
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: COLORS.primary }} />
          <div className="absolute top-40 right-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl" style={{ background: COLORS.accent }} />
        </div>
        <div className="max-w-4xl mx-auto relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 border"
            style={{ borderColor: `${COLORS.primary}40`, background: `${COLORS.primary}10`, color: COLORS.primaryLight }}>
            <Icon path={icons.zap} size={14} />
            Platform Inklusif Berbasis AI — Pertama di Indonesia
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight">
            Suara & Isyarat,<br />
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.accent})` }}>
              Satu Percakapan
            </span>
          </h1>
          <p className={`text-xl leading-relaxed mb-10 max-w-2xl mx-auto ${dark ? "text-gray-400" : "text-gray-600"}`}>
            SpeechSign AI menghubungkan pengguna normal dan penyandang tunarungu melalui teknologi Speech-to-Text, Text-to-Speech, dan Sign Language Recognition secara real-time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={onEnter} className="px-8 py-4 rounded-2xl text-white font-bold text-lg transition-all hover:scale-105 shadow-2xl"
              style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.accent})`, boxShadow: `0 0 40px ${COLORS.primary}40` }}>
              Mulai Gratis Sekarang
            </button>
            <button className={`px-8 py-4 rounded-2xl font-bold text-lg border transition-all hover:scale-105 ${dark ? "border-white/20 text-white hover:bg-white/5" : "border-gray-300 text-gray-700 hover:bg-gray-50"}`}>
              ▶ Lihat Demo
            </button>
          </div>
          <div className={`mt-12 flex justify-center gap-8 text-sm ${dark ? "text-gray-500" : "text-gray-500"}`}>
            {["3.400+ pengguna aktif", "98.7% akurasi AI", "20+ bahasa didukung"].map(s => (
              <div key={s} className="flex items-center gap-1.5">
                <Icon path={icons.check} size={14} className="text-emerald-400" />
                {s}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: COLORS.accent }}>Teknologi Canggih</p>
            <h2 className="text-4xl font-black tracking-tight">Semua yang Anda Butuhkan</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className={`p-6 rounded-2xl border transition-all hover:scale-105 group ${dark ? "bg-white/5 border-white/10 hover:border-purple-500/40" : "bg-gray-50 border-gray-200 hover:border-purple-300"}`}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                  style={{ background: `${COLORS.primary}20` }}>
                  <Icon path={icons[f.icon]} size={22} style={{ stroke: COLORS.primaryLight }} />
                </div>
                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                <p className={`text-sm leading-relaxed ${dark ? "text-gray-400" : "text-gray-600"}`}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Two-way demo visual */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className={`rounded-3xl p-8 md:p-12 border ${dark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"}`}>
            <div className="text-center mb-10">
              <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: COLORS.accent }}>Komunikasi Dua Arah</p>
              <h2 className="text-3xl font-black">Lihat Cara Kerjanya</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className={`p-6 rounded-2xl ${dark ? "bg-[#0E0C1A]" : "bg-white"} shadow-xl`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm" style={{ background: COLORS.primary }}>A</div>
                  <div>
                    <div className="font-semibold text-sm">Pengguna Normal</div>
                    <div className={`text-xs flex items-center gap-1 ${dark ? "text-gray-500" : "text-gray-400"}`}><span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />Merekam suara...</div>
                  </div>
                </div>
                <div className={`p-3 rounded-xl text-sm mb-3 ${dark ? "bg-white/5" : "bg-gray-50"}`}>
                  "Halo, selamat pagi! Bagaimana persiapan presentasinya?"
                </div>
                <WaveformBars active={true} color={COLORS.primary} />
              </div>
              <div className={`p-6 rounded-2xl ${dark ? "bg-[#0E0C1A]" : "bg-white"} shadow-xl`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm" style={{ background: COLORS.accent }}>B</div>
                  <div>
                    <div className="font-semibold text-sm">Pengguna Tunarungu</div>
                    <div className={`text-xs flex items-center gap-1 ${dark ? "text-gray-500" : "text-gray-400"}`}><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />Mendeteksi isyarat...</div>
                  </div>
                </div>
                <div className={`p-3 rounded-xl text-sm mb-3 ${dark ? "bg-white/5" : "bg-gray-50"}`}>
                  "Sudah siap! Saya sudah menyiapkan semua materialnya dari kemarin."
                </div>
                <div className="flex items-center gap-2">
                  <Icon path={icons.hand} size={16} style={{ stroke: COLORS.accent }} />
                  <span className="text-xs" style={{ color: COLORS.accent }}>Bahasa Isyarat → Teks → Suara</span>
                </div>
              </div>
            </div>
            <div className="text-center mt-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium" style={{ background: `${COLORS.accent}20`, color: COLORS.accentLight }}>
                <Icon path={icons.zap} size={14} />
                Terjemahan berlangsung otomatis &lt; 200ms
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: COLORS.accent }}>Testimoni</p>
            <h2 className="text-3xl font-black">Dipercaya Ribuan Pengguna</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className={`p-6 rounded-2xl border ${dark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"}`}>
                <Icon path={icons.quote} size={24} className="mb-4" style={{ stroke: `${COLORS.primary}60` }} />
                <p className={`text-sm leading-relaxed mb-4 ${dark ? "text-gray-300" : "text-gray-700"}`}>"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm" style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.accent})` }}>{t.avatar}</div>
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className={`text-xs ${dark ? "text-gray-500" : "text-gray-400"}`}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: COLORS.accent }}>Harga</p>
            <h2 className="text-3xl font-black">Pilih Paket Terbaik Anda</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {pricing.map((p, i) => (
              <div key={i} className={`p-6 rounded-2xl border relative ${p.highlight ? "border-purple-500/60" : dark ? "border-white/10 bg-white/5" : "border-gray-200 bg-gray-50"}`}
                style={p.highlight ? { background: `linear-gradient(135deg, ${COLORS.primary}15, ${COLORS.accent}10)`, borderColor: COLORS.primary } : {}}>
                {p.highlight && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white" style={{ background: COLORS.primary }}>PALING POPULER</div>}
                <div className="mb-4">
                  <div className="font-bold text-lg mb-1">{p.name}</div>
                  <div className="flex items-end gap-1">
                    <span className="text-3xl font-black">{p.price}</span>
                    <span className={`text-sm mb-1 ${dark ? "text-gray-400" : "text-gray-500"}`}>{p.period}</span>
                  </div>
                </div>
                <ul className="space-y-2 mb-6">
                  {p.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm">
                      <Icon path={icons.check} size={14} className="text-emerald-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button onClick={onEnter} className={`w-full py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105 ${p.highlight ? "text-white" : dark ? "bg-white/10 text-white hover:bg-white/20" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}
                  style={p.highlight ? { background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.accent})` } : {}}>
                  {p.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto p-12 rounded-3xl relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${COLORS.primary}20, ${COLORS.accent}10)`, border: `1px solid ${COLORS.primary}30` }}>
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-20 blur-2xl" style={{ background: COLORS.accent }} />
          <h2 className="text-4xl font-black mb-4 relative">Mulai Komunikasi Inklusif<br />Hari Ini</h2>
          <p className={`mb-8 relative ${dark ? "text-gray-400" : "text-gray-600"}`}>Bergabung dengan 3.400+ pengguna yang sudah merasakan manfaat SpeechSign AI.</p>
          <button onClick={onEnter} className="px-10 py-4 rounded-2xl text-white font-bold text-lg transition-all hover:scale-105 shadow-2xl"
            style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.accent})`, boxShadow: `0 0 60px ${COLORS.primary}40` }}>
            Mulai Gratis — Tanpa Kartu Kredit
          </button>
        </div>
      </section>

      <footer className={`py-8 text-center text-sm border-t ${dark ? "border-white/10 text-gray-600" : "border-gray-200 text-gray-400"}`}>
        © 2025 SpeechSign AI · Platform Komunikasi Inklusif Berbasis AI
      </footer>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({ page, setPage, dark, collapsed, onToggle }) {
  return (
    <aside className={`fixed left-0 top-0 h-full z-30 flex flex-col border-r transition-all duration-300 ${collapsed ? "w-16" : "w-60"} ${dark ? "bg-[#100E1F] border-white/10" : "bg-white border-gray-200"}`}>
      <div className="p-4 flex items-center justify-between border-b" style={{ borderColor: dark ? "rgba(255,255,255,0.08)" : "#e5e7eb" }}>
        {!collapsed && (
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.accent})` }}>
              <Icon path={icons.hand} size={16} className="text-white" />
            </div>
            <span className="font-bold text-sm tracking-tight">SpeechSign <span style={{ color: COLORS.primary }}>AI</span></span>
          </div>
        )}
        <button onClick={onToggle} className={`p-1.5 rounded-lg transition-colors ${dark ? "hover:bg-white/10" : "hover:bg-gray-100"}`}>
          <Icon path={collapsed ? icons.chevronRight : icons.chevronLeft} size={16} className={dark ? "stroke-gray-400" : "stroke-gray-600"} />
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto p-2 space-y-0.5">
        {navItems.map(item => {
          const active = page === item.id;
          return (
            <button key={item.id} onClick={() => setPage(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${active ? "text-white" : dark ? "text-gray-400 hover:text-white hover:bg-white/8" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`}
              style={active ? { background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDark})` } : {}}>
              <Icon path={icons[item.icon]} size={17} className={active ? "stroke-white" : ""} />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>
      {!collapsed && (
        <div className="p-4 border-t" style={{ borderColor: dark ? "rgba(255,255,255,0.08)" : "#e5e7eb" }}>
          <div className={`flex items-center gap-3 p-3 rounded-xl ${dark ? "bg-white/5" : "bg-gray-50"}`}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-xs" style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.accent})` }}>AK</div>
            <div>
              <div className="text-sm font-semibold">Ahmad Khalid</div>
              <div className={`text-xs ${dark ? "text-gray-500" : "text-gray-400"}`}>Pro Plan</div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────
function Header({ title, dark, toggleDark, collapsed }) {
  return (
    <header className={`fixed top-0 right-0 z-20 flex items-center justify-between px-6 py-4 border-b transition-all duration-300 ${dark ? "bg-[#0E0C1A]/90 border-white/10" : "bg-white/90 border-gray-200"} backdrop-blur-xl`}
      style={{ left: collapsed ? 64 : 240 }}>
      <h1 className="text-lg font-bold">{title}</h1>
      <div className="flex items-center gap-3">
        <button className={`p-2 rounded-xl transition-colors ${dark ? "hover:bg-white/10" : "hover:bg-gray-100"}`}>
          <Icon path={icons.bell} size={18} className={dark ? "stroke-gray-400" : "stroke-gray-600"} />
        </button>
        <button className={`p-2 rounded-xl transition-colors ${dark ? "hover:bg-white/10" : "hover:bg-gray-100"}`}>
          <Icon path={icons.search} size={18} className={dark ? "stroke-gray-400" : "stroke-gray-600"} />
        </button>
        <button onClick={toggleDark} className={`p-2 rounded-xl transition-colors ${dark ? "hover:bg-white/10" : "hover:bg-gray-100"}`}>
          <Icon path={dark ? icons.sun : icons.moon} size={18} className={dark ? "stroke-gray-400" : "stroke-gray-600"} />
        </button>
      </div>
    </header>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ stat, dark }) {
  return (
    <div className={`p-5 rounded-2xl border ${dark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-sm"}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${stat.color}20` }}>
          <Icon path={icons[stat.icon]} size={18} style={{ stroke: stat.color }} />
        </div>
        <span className="text-xs font-medium px-2 py-1 rounded-full" style={{ background: `${stat.color}15`, color: stat.color }}>+8.2%</span>
      </div>
      <div className="text-2xl font-black mb-1">{stat.value}</div>
      <div className={`text-sm font-medium ${dark ? "text-gray-300" : "text-gray-700"}`}>{stat.label}</div>
      <div className={`text-xs mt-1 ${dark ? "text-gray-600" : "text-gray-400"}`}>{stat.delta}</div>
    </div>
  );
}

// ─── Dashboard Page ───────────────────────────────────────────────────────────
function DashboardPage({ dark, addToast, setPage }) {
  const quickActions = [
    { label: "Rekam Sekarang", icon: "mic", page: "recording", color: COLORS.primary },
    { label: "Upload File", icon: "upload", page: "upload", color: COLORS.accent },
    { label: "Isyarat ke Teks", icon: "hand", page: "sign", color: COLORS.gold },
    { label: "Percakapan 2 Arah", icon: "chat", page: "conversation", color: COLORS.warn },
  ];
  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="p-6 rounded-2xl relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${COLORS.primary}20, ${COLORS.accent}10)`, border: `1px solid ${COLORS.primary}25` }}>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 w-24 h-24 rounded-full opacity-10 blur-xl" style={{ background: COLORS.accent }} />
        <h2 className="text-2xl font-black mb-1">Selamat datang, Ahmad 👋</h2>
        <p className={`text-sm ${dark ? "text-gray-400" : "text-gray-600"}`}>Anda telah menghemat ~47 jam minggu ini. Terus buat komunikasi lebih inklusif.</p>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {mockStats.map((s, i) => <StatCard key={i} stat={s} dark={dark} />)}
      </div>
      {/* Quick Actions */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.35)" }}>Aksi Cepat</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map(a => (
            <button key={a.label} onClick={() => setPage(a.page)} className={`p-5 rounded-2xl border text-left transition-all hover:scale-105 ${dark ? "bg-white/5 border-white/10 hover:border-purple-500/40" : "bg-white border-gray-200 hover:border-purple-300 shadow-sm"}`}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${a.color}20` }}>
                <Icon path={icons[a.icon]} size={18} style={{ stroke: a.color }} />
              </div>
              <div className="text-sm font-semibold">{a.label}</div>
            </button>
          ))}
        </div>
      </div>
      {/* Recent Transcripts */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider" style={{ color: dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.35)" }}>Transkripsi Terbaru</h3>
          <button onClick={() => setPage("transcripts")} className="text-xs font-medium" style={{ color: COLORS.primaryLight }}>Lihat semua →</button>
        </div>
        <div className="space-y-3">
          {mockTranscripts.map(t => (
            <div key={t.id} className={`flex items-center gap-4 p-4 rounded-xl border transition-all hover:scale-[1.01] cursor-pointer ${dark ? "bg-white/4 border-white/8 hover:border-purple-500/30" : "bg-white border-gray-200 hover:border-purple-300 shadow-sm"}`}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${COLORS.primary}15` }}>
                <Icon path={icons.transcript} size={18} style={{ stroke: COLORS.primaryLight }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate">{t.title}</div>
                <div className={`text-xs ${dark ? "text-gray-500" : "text-gray-400"}`}>{t.date} · {t.duration} · {t.speakers} pembicara</div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <SentimentBadge sentiment={t.sentiment} />
                <span className={`text-xs ${dark ? "text-gray-500" : "text-gray-400"}`}>{t.language}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Recording Page ───────────────────────────────────────────────────────────
function RecordingPage({ dark, addToast }) {
  const [state, setState] = useState("idle"); // idle | recording | paused
  const [seconds, setSeconds] = useState(0);
  const [lang, setLang] = useState("ID");
  const [transcript, setTranscript] = useState([]);
  const mockLines = [
    { speaker: 1, time: "[00:03]", text: "Halo semua, kita mulai rapat hari ini ya." },
    { speaker: 2, time: "[00:07]", text: "Baik, saya sudah siap dengan laporannya." },
    { speaker: 1, time: "[00:12]", text: "Bagus. Mari kita bahas dulu progres proyek utama." },
    { speaker: 3, time: "[00:18]", text: "Untuk proyek A, sudah selesai 80% dan on track." },
  ];

  useEffect(() => {
    let tid;
    if (state === "recording") {
      tid = setInterval(() => {
        setSeconds(s => s + 1);
        if (transcript.length < mockLines.length) {
          setTranscript(prev => [...prev, mockLines[prev.length]]);
        }
      }, 2500);
    }
    return () => clearInterval(tid);
  }, [state, transcript.length]);

  const fmt = s => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const startRec = () => { setState("recording"); addToast("Rekaman dimulai", "success"); };
  const pauseRec = () => { setState("paused"); addToast("Rekaman dijeda", "info"); };
  const stopRec = () => { setState("idle"); setSeconds(0); setTranscript([]); addToast("Rekaman disimpan otomatis", "success"); };
  const colors = [COLORS.primary, COLORS.accent, COLORS.gold, COLORS.warn];

  return (
    <div className="space-y-6">
      {/* Controls card */}
      <div className={`p-8 rounded-2xl border ${dark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-sm"}`}>
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {state === "recording" && <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />}
                {state === "paused" && <span className="w-3 h-3 rounded-full bg-yellow-500" />}
                {state === "idle" && <span className="w-3 h-3 rounded-full bg-gray-400" />}
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: state === "recording" ? "#ef4444" : state === "paused" ? "#f59e0b" : (dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)") }}>
                  {state === "recording" ? "Merekam" : state === "paused" ? "Dijeda" : "Siap"}
                </span>
              </div>
              <span className="font-mono text-3xl font-black">{fmt(seconds)}</span>
            </div>
            <WaveformBars active={state === "recording"} color={COLORS.primary} />
            <div className="flex items-center gap-3">
              <label className={`text-xs font-medium ${dark ? "text-gray-400" : "text-gray-600"}`}>Bahasa:</label>
              {["ID", "EN", "JP", "KR", "AR"].map(l => (
                <button key={l} onClick={() => setLang(l)} className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all ${lang === l ? "text-white" : dark ? "text-gray-400 hover:bg-white/10" : "text-gray-600 hover:bg-gray-100"}`}
                  style={lang === l ? { background: COLORS.primary } : {}}>{l}</button>
              ))}
            </div>
          </div>
          <div className="flex flex-row md:flex-col gap-3">
            {state === "idle" && (
              <button onClick={startRec} className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:scale-105"
                style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDark})` }}>
                <Icon path={icons.mic} size={16} /> Mulai Rekam
              </button>
            )}
            {state === "recording" && (<>
              <button onClick={pauseRec} className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all hover:scale-105 ${dark ? "bg-yellow-500/20 text-yellow-400" : "bg-yellow-50 text-yellow-600"}`}>
                <Icon path={icons.pause} size={16} /> Jeda
              </button>
              <button onClick={stopRec} className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold bg-red-500/20 text-red-400 transition-all hover:scale-105">
                <Icon path={icons.stop} size={16} /> Stop
              </button>
            </>)}
            {state === "paused" && (<>
              <button onClick={() => setState("recording")} className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-white transition-all hover:scale-105"
                style={{ background: COLORS.primary }}>
                <Icon path={icons.play} size={16} /> Lanjut
              </button>
              <button onClick={stopRec} className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold bg-red-500/20 text-red-400 transition-all hover:scale-105">
                <Icon path={icons.stop} size={16} /> Stop
              </button>
            </>)}
          </div>
        </div>
      </div>

      {/* Live transcript */}
      <div className={`rounded-2xl border ${dark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-sm"}`}>
        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: dark ? "rgba(255,255,255,0.08)" : "#e5e7eb" }}>
          <div className="flex items-center gap-2">
            <Icon path={icons.transcript} size={16} style={{ stroke: COLORS.primaryLight }} />
            <span className="font-semibold text-sm">Transkripsi Live</span>
          </div>
          {transcript.length > 0 && (
            <div className="flex gap-2">
              {["PDF", "DOCX", "TXT"].map(f => (
                <button key={f} onClick={() => addToast(`Mengexport ${f}...`, "success")} className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all ${dark ? "bg-white/10 text-gray-300 hover:bg-white/20" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                  {f}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="p-4 min-h-48 max-h-80 overflow-y-auto space-y-3">
          {transcript.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-36 text-center">
              <Icon path={icons.mic} size={32} className={dark ? "stroke-gray-700" : "stroke-gray-300"} />
              <p className={`mt-3 text-sm ${dark ? "text-gray-600" : "text-gray-400"}`}>Transkripsi akan muncul di sini saat rekaman dimulai</p>
            </div>
          ) : (
            transcript.map((line, i) => (
              <div key={i} className="flex gap-3">
                <div className="shrink-0 flex flex-col items-center gap-1">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: colors[(line.speaker - 1) % colors.length] }}>
                    {line.speaker}
                  </div>
                  <span className={`text-xs font-mono ${dark ? "text-gray-600" : "text-gray-400"}`}>{line.time}</span>
                </div>
                <p className={`text-sm leading-relaxed pt-1 ${dark ? "text-gray-300" : "text-gray-700"}`}>{line.text}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Upload Page ──────────────────────────────────────────────────────────────
function UploadPage({ dark, addToast }) {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [processing, setProcessing] = useState({});

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const dropped = Array.from(e.dataTransfer?.files || []);
    if (dropped.length) processFiles(dropped);
  };

  const processFiles = (newFiles) => {
    const items = newFiles.map(f => ({ name: f.name || `file_${Date.now()}`, size: "~2.4 MB", status: "processing", progress: 0 }));
    setFiles(prev => [...prev, ...items]);
    items.forEach((item, idx) => {
      let p = 0;
      const id = setInterval(() => {
        p += Math.random() * 15 + 5;
        if (p >= 100) {
          p = 100;
          clearInterval(id);
          setFiles(prev => prev.map(f => f.name === item.name ? { ...f, progress: 100, status: "done" } : f));
          addToast(`${item.name} berhasil ditranskripsi!`, "success");
        } else {
          setFiles(prev => prev.map(f => f.name === item.name ? { ...f, progress: Math.floor(p) } : f));
        }
      }, 300);
    });
  };

  const formats = ["MP3", "WAV", "M4A", "MP4", "MKV", "WEBM"];

  return (
    <div className="space-y-6">
      <div className={`rounded-2xl border-2 border-dashed p-12 text-center transition-all ${dragging ? "border-purple-500 bg-purple-500/5" : dark ? "border-white/15 hover:border-white/30" : "border-gray-300 hover:border-purple-300"}`}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}>
        <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: `${COLORS.primary}15` }}>
          <Icon path={icons.upload} size={28} style={{ stroke: COLORS.primaryLight }} />
        </div>
        <h3 className="text-lg font-bold mb-2">Seret & lepas file di sini</h3>
        <p className={`text-sm mb-4 ${dark ? "text-gray-500" : "text-gray-400"}`}>atau klik untuk memilih file dari komputer</p>
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {formats.map(f => (
            <span key={f} className={`text-xs px-2.5 py-1 rounded-full font-medium ${dark ? "bg-white/10 text-gray-400" : "bg-gray-100 text-gray-600"}`}>{f}</span>
          ))}
        </div>
        <button onClick={() => { processFiles([{ name: `rekaman_${Date.now()}.mp3` }]); addToast("File diunggah!", "success"); }}
          className="px-6 py-3 rounded-xl font-semibold text-white transition-all hover:scale-105" style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.accent})` }}>
          Pilih File
        </button>
      </div>

      {files.length > 0 && (
        <div className={`rounded-2xl border overflow-hidden ${dark ? "border-white/10" : "border-gray-200 shadow-sm"}`}>
          <div className="p-4 border-b flex items-center gap-2" style={{ borderColor: dark ? "rgba(255,255,255,0.08)" : "#e5e7eb" }}>
            <Icon path={icons.activity} size={16} style={{ stroke: COLORS.primaryLight }} />
            <span className="font-semibold text-sm">Proses Transkripsi</span>
          </div>
          {files.map((f, i) => (
            <div key={i} className={`p-4 border-b last:border-0 ${dark ? "border-white/8" : "border-gray-100"}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${COLORS.primary}20` }}>
                    <Icon path={icons.transcript} size={14} style={{ stroke: COLORS.primaryLight }} />
                  </div>
                  <div>
                    <div className="text-sm font-medium">{f.name}</div>
                    <div className={`text-xs ${dark ? "text-gray-500" : "text-gray-400"}`}>{f.size}</div>
                  </div>
                </div>
                {f.status === "done" ? (
                  <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-emerald-500/20 text-emerald-400">Selesai</span>
                ) : (
                  <span className="text-xs font-mono" style={{ color: COLORS.primaryLight }}>{f.progress}%</span>
                )}
              </div>
              <div className={`h-1.5 rounded-full overflow-hidden ${dark ? "bg-white/10" : "bg-gray-100"}`}>
                <div className="h-full rounded-full transition-all duration-300" style={{ width: `${f.progress}%`, background: f.status === "done" ? COLORS.accent : `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.accent})` }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Sign Language Page ───────────────────────────────────────────────────────
function SignPage({ dark, addToast }) {
  const [active, setActive] = useState(false);
  const [words, setWords] = useState([]);
  const [mode, setMode] = useState("translate"); // translate | tts
  const mockWords = ["Halo", "saya", "ingin", "bertanya", "tentang", "jadwal", "rapat", "besok", "terima", "kasih"];
  const [wIdx, setWIdx] = useState(0);
  const [confidence, setConfidence] = useState(0);

  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => {
      setWords(prev => [...prev, mockWords[wIdx % mockWords.length]]);
      setWIdx(w => w + 1);
      setConfidence(Math.floor(Math.random() * 8 + 90));
    }, 1400);
    return () => clearInterval(id);
  }, [active, wIdx]);

  const points = [{ x: 120, y: 180 }, { x: 140, y: 160 }, { x: 155, y: 140 }, { x: 170, y: 155 }, { x: 185, y: 140 }, { x: 200, y: 155 }, { x: 120, y: 180 }, { x: 110, y: 200 }, { x: 105, y: 230 }];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Camera feed */}
      <div className={`p-6 rounded-2xl border ${dark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-sm"}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Icon path={icons.camera} size={16} style={{ stroke: COLORS.primaryLight }} />
            <span className="font-semibold text-sm">Kamera Isyarat</span>
          </div>
          {active && <div className="flex items-center gap-1.5 text-xs" style={{ color: COLORS.accent }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: COLORS.accent }} />
            Mendeteksi...
          </div>}
        </div>
        {/* Camera placeholder */}
        <div className={`relative rounded-xl overflow-hidden mb-4 ${dark ? "bg-gray-900" : "bg-gray-100"}`} style={{ aspectRatio: "4/3" }}>
          {active ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg width="300" height="240" className="opacity-70">
                {/* Hand skeleton */}
                {points.map((p, i) => i < points.length - 1 && (
                  <line key={i} x1={p.x} y1={p.y} x2={points[i + 1].x} y2={points[i + 1].y} stroke={COLORS.accent} strokeWidth="2" />
                ))}
                {points.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="4" fill={COLORS.accent} />)}
                <text x="10" y="20" fill={COLORS.accent} fontSize="10" fontFamily="monospace">Tangan Kanan Terdeteksi</text>
                <text x="10" y="35" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="monospace">Akurasi: {confidence}%</text>
              </svg>
            </div>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <Icon path={icons.camera} size={40} className={dark ? "stroke-gray-700" : "stroke-gray-300"} />
              <p className={`mt-3 text-sm ${dark ? "text-gray-600" : "text-gray-400"}`}>Kamera belum aktif</p>
            </div>
          )}
          {/* Detection frame */}
          {active && <div className="absolute inset-4 rounded-lg border-2 border-dashed pointer-events-none" style={{ borderColor: `${COLORS.accent}60` }} />}
        </div>

        <div className="flex gap-3 mb-4">
          <button onClick={() => { setActive(!active); if (!active) { setWords([]); setWIdx(0); } addToast(active ? "Kamera dimatikan" : "Kamera diaktifkan", "info"); }}
            className="flex-1 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105 text-white"
            style={{ background: active ? `${COLORS.warn}` : `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.accent})` }}>
            {active ? "Matikan Kamera" : "Aktifkan Kamera"}
          </button>
        </div>
        <div className="flex gap-2">
          {[["translate", "Teks"], ["tts", "Suara"]].map(([m, l]) => (
            <button key={m} onClick={() => setMode(m)} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${mode === m ? "text-white" : dark ? "text-gray-400" : "text-gray-600"}`}
              style={mode === m ? { background: COLORS.primary } : { background: dark ? "rgba(255,255,255,0.08)" : "#f3f4f6" }}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Translation output */}
      <div className="space-y-4">
        <div className={`p-5 rounded-2xl border min-h-40 ${dark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-sm"}`}>
          <div className="flex items-center gap-2 mb-3">
            <Icon path={icons.transcript} size={16} style={{ stroke: COLORS.primaryLight }} />
            <span className="font-semibold text-sm">Hasil Terjemahan</span>
          </div>
          {words.length === 0 ? (
            <p className={`text-sm ${dark ? "text-gray-600" : "text-gray-400"}`}>Aktifkan kamera dan mulai gerakan tangan untuk melihat hasil terjemahan.</p>
          ) : (
            <p className={`text-lg leading-relaxed font-medium ${dark ? "text-gray-200" : "text-gray-800"}`}>{words.join(" ")}</p>
          )}
        </div>
        {words.length > 0 && (
          <div className={`p-4 rounded-2xl border ${dark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-sm"}`}>
            <div className="flex items-center gap-2 mb-3">
              <Icon path={icons.volume} size={16} style={{ stroke: COLORS.accent }} />
              <span className="font-semibold text-sm">Text-to-Speech</span>
            </div>
            <div className="flex gap-2 mb-3">
              {["Suara Wanita", "Suara Pria"].map(v => (
                <button key={v} className={`flex-1 py-2 rounded-lg text-xs font-medium ${dark ? "bg-white/10 text-gray-300" : "bg-gray-100 text-gray-600"}`}>{v}</button>
              ))}
            </div>
            <button onClick={() => addToast("Membacakan teks...", "info")} className="w-full py-3 rounded-xl font-semibold text-white text-sm transition-all hover:scale-105"
              style={{ background: `linear-gradient(135deg, ${COLORS.accent}, #00A891)` }}>
              <Icon path={icons.volume} size={14} className="inline mr-2" />Bacakan Teks
            </button>
          </div>
        )}
        {/* Sentiment */}
        {words.length > 3 && (
          <div className={`p-4 rounded-2xl border ${dark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-sm"}`}>
            <div className="flex items-center gap-2 mb-3">
              <Icon path={icons.activity} size={16} style={{ stroke: COLORS.gold }} />
              <span className="font-semibold text-sm">Analisis Sentimen</span>
            </div>
            <div className="flex gap-2">
              {[{ l: "Positif", v: 72, c: "#10b981" }, { l: "Netral", v: 21, c: "#f59e0b" }, { l: "Negatif", v: 7, c: "#ef4444" }].map(s => (
                <div key={s.l} className="flex-1 text-center">
                  <div className="text-xs font-medium mb-1" style={{ color: s.c }}>{s.l}</div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: dark ? "rgba(255,255,255,0.1)" : "#e5e7eb" }}>
                    <div className="h-full rounded-full" style={{ width: `${s.v}%`, background: s.c }} />
                  </div>
                  <div className="text-xs mt-1" style={{ color: s.c }}>{s.v}%</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Conversation Page ────────────────────────────────────────────────────────
function ConversationPage({ dark, addToast }) {
  const [messages, setMessages] = useState(mockMessages);
  const [input, setInput] = useState("");
  const [activeMode, setActiveMode] = useState("speech"); // speech | sign

  const sendMessage = () => {
    if (!input.trim()) return;
    const msg = { id: Date.now(), sender: "A", type: activeMode, text: input, time: new Date().toLocaleTimeString("id", { hour: "2-digit", minute: "2-digit" }), lang: "ID" };
    setMessages(prev => [...prev, msg]);
    setInput("");
    setTimeout(() => {
      const reply = { id: Date.now() + 1, sender: "B", type: "sign", text: "Terima kasih atas pesan Anda. Saya mengerti dan akan segera merespons.", time: new Date().toLocaleTimeString("id", { hour: "2-digit", minute: "2-digit" }), lang: "ID" };
      setMessages(prev => [...prev, reply]);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-160px)]">
      {/* Status bar */}
      <div className={`flex items-center gap-4 p-4 rounded-xl border mb-4 ${dark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-sm"}`}>
        {[
          { label: "Pengguna A", sublabel: "Berbicara", active: true, color: COLORS.primary },
          { label: "Pengguna B", sublabel: "Isyarat", active: true, color: COLORS.accent },
        ].map(u => (
          <div key={u.label} className="flex items-center gap-2">
            <div className="relative">
              <div className="w-8 h-8 rounded-full font-bold text-white text-xs flex items-center justify-center" style={{ background: u.color }}>{u.label[0]}</div>
              {u.active && <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2" style={{ borderColor: dark ? "#0E0C1A" : "#fff" }} />}
            </div>
            <div>
              <div className="text-xs font-semibold">{u.label}</div>
              <div className="text-xs" style={{ color: u.color }}>{u.sublabel}</div>
            </div>
          </div>
        ))}
        <div className="ml-auto flex items-center gap-1.5 text-xs" style={{ color: COLORS.accent }}>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Terhubung
        </div>
      </div>

      {/* Chat */}
      <div className={`flex-1 overflow-y-auto p-4 rounded-xl border mb-4 space-y-3 ${dark ? "border-white/10" : "border-gray-200 shadow-sm"}`}>
        {messages.map(m => (
          <div key={m.id} className={`flex gap-3 ${m.sender === "A" ? "flex-row" : "flex-row-reverse"}`}>
            <div className="w-8 h-8 rounded-full font-bold text-white text-xs flex items-center justify-center shrink-0" style={{ background: m.sender === "A" ? COLORS.primary : COLORS.accent }}>
              {m.sender}
            </div>
            <div className={`max-w-xs ${m.sender === "A" ? "" : "items-end"} flex flex-col gap-1`}>
              <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${m.sender === "A"
                ? dark ? "bg-purple-600/30 text-gray-200" : "bg-purple-50 text-gray-800"
                : dark ? "bg-emerald-600/20 text-gray-200" : "bg-emerald-50 text-gray-800"}`}>
                {m.text}
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs" style={{ color: m.type === "speech" ? COLORS.primaryLight : COLORS.accentLight }}>
                  {m.type === "speech" ? "🎤" : "🤟"} {m.type === "speech" ? "Suara" : "Isyarat"}
                </span>
                <span className={`text-xs ${dark ? "text-gray-600" : "text-gray-400"}`}>{m.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className={`p-4 rounded-xl border ${dark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-sm"}`}>
        <div className="flex gap-2 mb-3">
          {[["speech", "🎤 Suara"], ["sign", "🤟 Isyarat"]].map(([m, l]) => (
            <button key={m} onClick={() => setActiveMode(m)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${activeMode === m ? "text-white" : dark ? "text-gray-400" : "text-gray-600"}`}
              style={activeMode === m ? { background: COLORS.primary } : { background: dark ? "rgba(255,255,255,0.08)" : "#f3f4f6" }}>
              {l}
            </button>
          ))}
        </div>
        <div className="flex gap-3">
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage()}
            placeholder={activeMode === "speech" ? "Ketik pesan atau tekan untuk berbicara..." : "Teks dari deteksi isyarat akan muncul di sini..."}
            className={`flex-1 px-4 py-2.5 rounded-xl text-sm outline-none border transition-all ${dark ? "bg-white/8 border-white/15 text-white placeholder:text-gray-600 focus:border-purple-500/50" : "bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-purple-400"}`} />
          <button onClick={sendMessage} className="px-4 py-2.5 rounded-xl text-white font-semibold text-sm transition-all hover:scale-105"
            style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.accent})` }}>
            Kirim
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Transcripts Page ─────────────────────────────────────────────────────────
function TranscriptsPage({ dark, addToast }) {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const filtered = mockTranscripts.filter(t => t.title.toLowerCase().includes(search.toLowerCase()));

  if (selected) {
    return (
      <div className="space-y-6">
        <button onClick={() => setSelected(null)} className="flex items-center gap-2 text-sm font-medium" style={{ color: COLORS.primaryLight }}>
          <Icon path={icons.chevronLeft} size={14} />Kembali ke daftar
        </button>
        <div className={`p-6 rounded-2xl border ${dark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-sm"}`}>
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold mb-1">{selected.title}</h2>
              <div className="flex items-center gap-3">
                <span className={`text-sm ${dark ? "text-gray-400" : "text-gray-500"}`}>{selected.date} · {selected.duration}</span>
                <SentimentBadge sentiment={selected.sentiment} />
              </div>
            </div>
            <div className="flex gap-2">
              {["PDF", "DOCX", "SRT", "TXT"].map(f => (
                <button key={f} onClick={() => addToast(`Mengexport ${f}...`, "success")} className={`text-xs px-3 py-1.5 rounded-lg font-medium ${dark ? "bg-white/10 text-gray-300 hover:bg-white/20" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{f}</button>
              ))}
            </div>
          </div>
          {/* AI Summary */}
          <div className={`p-4 rounded-xl mb-4 ${dark ? "bg-white/5" : "bg-purple-50/50"}`} style={{ border: `1px solid ${COLORS.primary}25` }}>
            <div className="flex items-center gap-2 mb-2">
              <Icon path={icons.brain} size={16} style={{ stroke: COLORS.primaryLight }} />
              <span className="font-semibold text-sm">Ringkasan AI</span>
            </div>
            <p className={`text-sm leading-relaxed ${dark ? "text-gray-400" : "text-gray-600"}`}>Rapat membahas progress Q4 dengan fokus pada peningkatan konversi dan optimasi anggaran. Tim sepakat untuk meluncurkan kampanye baru di kuartal berikutnya dengan target ROI 2.5x.</p>
          </div>
          {/* Keywords */}
          <div className="mb-4">
            <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)" }}>Kata Kunci</div>
            <div className="flex flex-wrap gap-2">
              {["marketing Q4", "konversi", "anggaran", "kampanye", "ROI", "target", "optimasi"].map(k => (
                <span key={k} className="px-2.5 py-1 rounded-full text-xs font-medium cursor-pointer hover:opacity-80 transition-opacity" style={{ background: `${COLORS.primary}20`, color: COLORS.primaryLight }}>{k}</span>
              ))}
            </div>
          </div>
          {/* Transcript lines */}
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {[
              { s: 1, time: "[00:01]", text: "Baik, mari kita mulai rapat hari ini." },
              { s: 2, time: "[00:05]", text: "Saya sudah menyiapkan laporan Q3 untuk kita review bersama." },
              { s: 1, time: "[00:12]", text: "Bagus. Target konversi kita bulan ini bagaimana?" },
              { s: 3, time: "[00:18]", text: "Kita mencapai 78% dari target. Ada peningkatan 12% dibanding bulan lalu." },
              { s: 2, time: "[00:28]", text: "Untuk anggaran Q4, saya rekomendasikan kita fokus ke channel digital." },
            ].map((l, i) => (
              <div key={i} className="flex gap-3">
                <div className="shrink-0 flex flex-col items-center gap-1">
                  <div className="w-6 h-6 rounded-full text-xs font-bold text-white flex items-center justify-center" style={{ background: [COLORS.primary, COLORS.accent, COLORS.gold][l.s - 1] }}>{l.s}</div>
                  <span className={`text-xs font-mono ${dark ? "text-gray-600" : "text-gray-400"}`}>{l.time}</span>
                </div>
                <p className={`text-sm leading-relaxed pt-1 ${dark ? "text-gray-300" : "text-gray-700"}`}>{l.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Icon path={icons.search} size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 ${dark ? "stroke-gray-500" : "stroke-gray-400"}`} />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari transkripsi..."
          className={`w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm outline-none transition-all ${dark ? "bg-white/8 border-white/15 text-white placeholder:text-gray-600 focus:border-purple-500/50" : "bg-white border-gray-200 focus:border-purple-400"}`} />
      </div>
      {filtered.map(t => (
        <div key={t.id} onClick={() => setSelected(t)} className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all hover:scale-[1.01] ${dark ? "bg-white/4 border-white/8 hover:border-purple-500/30" : "bg-white border-gray-200 hover:border-purple-300 shadow-sm"}`}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${COLORS.primary}15` }}>
            <Icon path={icons.transcript} size={18} style={{ stroke: COLORS.primaryLight }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm mb-0.5">{t.title}</div>
            <div className={`text-xs ${dark ? "text-gray-500" : "text-gray-400"}`}>{t.date} · {t.duration} · {t.speakers} pembicara · {t.words.toLocaleString()} kata</div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <SentimentBadge sentiment={t.sentiment} />
            <Icon path={icons.chevronRight} size={16} className={dark ? "stroke-gray-600" : "stroke-gray-300"} />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Learning Page ────────────────────────────────────────────────────────────
function LearningPage({ dark, addToast }) {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [practicing, setPracticing] = useState(false);
  const [score, setScore] = useState(0);
  const lessons = [
    { id: 1, title: "Alfabet Dasar", level: "Pemula", progress: 100, total: 26, done: 26, emoji: "🔤" },
    { id: 2, title: "Salam & Perkenalan", level: "Pemula", progress: 75, total: 12, done: 9, emoji: "👋" },
    { id: 3, title: "Angka 1–100", level: "Pemula", progress: 40, total: 20, done: 8, emoji: "🔢" },
    { id: 4, title: "Ekspresi Emosi", level: "Menengah", progress: 20, total: 15, done: 3, emoji: "😊" },
    { id: 5, title: "Kalimat Sehari-hari", level: "Menengah", progress: 0, total: 30, done: 0, emoji: "💬" },
    { id: 6, title: "Percakapan Profesional", level: "Lanjut", progress: 0, total: 25, done: 0, emoji: "💼" },
  ];

  const startPractice = (lesson) => {
    setSelectedLesson(lesson);
    setPracticing(true);
    setScore(0);
    let s = 0;
    const id = setInterval(() => {
      s += Math.random() * 15 + 5;
      setScore(Math.min(Math.floor(s), 95));
      if (s >= 95) clearInterval(id);
    }, 600);
    addToast(`Memulai latihan: ${lesson.title}`, "info");
  };

  const levelColor = { "Pemula": COLORS.accent, "Menengah": COLORS.gold, "Lanjut": COLORS.warn };

  return (
    <div className="space-y-6">
      {/* Progress overview */}
      <div className={`p-5 rounded-2xl border ${dark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-sm"}`}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold">Progres Belajar</h3>
          <span className="text-sm font-semibold" style={{ color: COLORS.accent }}>Tingkat 3</span>
        </div>
        <div className={`h-3 rounded-full overflow-hidden mb-2 ${dark ? "bg-white/10" : "bg-gray-100"}`}>
          <div className="h-full rounded-full" style={{ width: "46%", background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.accent})` }} />
        </div>
        <div className="flex justify-between text-xs" style={{ color: dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.35)" }}>
          <span>46% selesai</span>
          <span>48 dari 128 materi</span>
        </div>
      </div>

      {/* Practice section */}
      {practicing && selectedLesson && (
        <div className={`p-6 rounded-2xl border ${dark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-sm"}`} style={{ borderColor: COLORS.primary + "40" }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold">{selectedLesson.emoji} Latihan: {selectedLesson.title}</h3>
              <p className={`text-sm ${dark ? "text-gray-500" : "text-gray-400"}`}>AI mengevaluasi gerakan Anda</p>
            </div>
            <button onClick={() => setPracticing(false)} className={`p-2 rounded-lg ${dark ? "hover:bg-white/10" : "hover:bg-gray-100"}`}>
              <Icon path={icons.x} size={16} />
            </button>
          </div>
          {/* Score meter */}
          <div className="flex items-center justify-center mb-4">
            <div className="relative w-28 h-28">
              <svg width="112" height="112" viewBox="0 0 112 112">
                <circle cx="56" cy="56" r="48" fill="none" stroke={dark ? "rgba(255,255,255,0.08)" : "#e5e7eb"} strokeWidth="8" />
                <circle cx="56" cy="56" r="48" fill="none" stroke={score > 70 ? COLORS.accent : score > 40 ? COLORS.gold : COLORS.warn} strokeWidth="8" strokeLinecap="round"
                  strokeDasharray={`${score * 3.016} 1000`} transform="rotate(-90 56 56)" style={{ transition: "stroke-dasharray 0.3s" }} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black">{score}%</span>
                <span className={`text-xs ${dark ? "text-gray-500" : "text-gray-400"}`}>Akurasi</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            {[["Gerakan", score > 60 ? "✓" : "⋯", COLORS.accent], ["Posisi", score > 75 ? "✓" : "⋯", COLORS.gold], ["Timing", score > 85 ? "✓" : "⋯", COLORS.warn]].map(([l, v, c]) => (
              <div key={l} className={`p-3 rounded-xl ${dark ? "bg-white/5" : "bg-gray-50"}`}>
                <div className="text-lg mb-1">{v}</div>
                <div className="text-xs" style={{ color: c }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lessons grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lessons.map(lesson => (
          <div key={lesson.id} className={`p-5 rounded-2xl border transition-all ${dark ? "bg-white/5 border-white/10 hover:border-purple-500/30" : "bg-white border-gray-200 hover:border-purple-300 shadow-sm"}`}>
            <div className="flex items-start justify-between mb-3">
              <span className="text-2xl">{lesson.emoji}</span>
              <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: `${levelColor[lesson.level]}20`, color: levelColor[lesson.level] }}>{lesson.level}</span>
            </div>
            <h4 className="font-bold mb-1 text-sm">{lesson.title}</h4>
            <p className={`text-xs mb-3 ${dark ? "text-gray-500" : "text-gray-400"}`}>{lesson.done}/{lesson.total} materi selesai</p>
            <div className={`h-1.5 rounded-full overflow-hidden mb-3 ${dark ? "bg-white/10" : "bg-gray-100"}`}>
              <div className="h-full rounded-full transition-all" style={{ width: `${lesson.progress}%`, background: lesson.progress === 100 ? COLORS.accent : `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.accent})` }} />
            </div>
            <button onClick={() => startPractice(lesson)} className={`w-full py-2 rounded-lg text-xs font-semibold transition-all hover:scale-105 ${lesson.progress === 100 ? "text-white" : "text-white"}`}
              style={{ background: lesson.progress === 100 ? COLORS.accent : `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDark})` }}>
              {lesson.progress === 100 ? "✓ Selesai — Ulangi" : lesson.progress > 0 ? "Lanjutkan" : "Mulai"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Admin Page ───────────────────────────────────────────────────────────────
function AdminPage({ dark, addToast }) {
  const users = [
    { name: "Ahmad Khalid", email: "ahmad@example.com", role: "Admin", status: "Aktif", joined: "Jan 2025", usage: "248 rekaman" },
    { name: "Dewi Pratiwi", email: "dewi@example.com", role: "Premium", status: "Aktif", joined: "Feb 2025", usage: "134 rekaman" },
    { name: "Reza Gunawan", email: "reza@example.com", role: "User", status: "Aktif", joined: "Mar 2025", usage: "45 rekaman" },
    { name: "Siti Maryam", email: "siti@example.com", role: "Premium", status: "Tidak Aktif", joined: "Apr 2025", usage: "89 rekaman" },
    { name: "Budi Santoso", email: "budi@example.com", role: "User", status: "Aktif", joined: "May 2025", usage: "12 rekaman" },
  ];
  const logs = [
    { user: "Ahmad K.", action: "Rekaman selesai", detail: "45:23 menit", time: "09:15", type: "recording" },
    { user: "Dewi P.", action: "Export PDF", detail: "Transkripsi Q4", time: "09:08", type: "export" },
    { user: "Reza G.", action: "Login", detail: "dari Chrome/Windows", time: "08:55", type: "login" },
    { user: "Siti M.", action: "Upload video", detail: "presentasi.mp4", time: "08:44", type: "upload" },
    { user: "Budi S.", action: "Login", detail: "dari Safari/macOS", time: "08:30", type: "login" },
  ];
  const roleColor = { Admin: COLORS.warn, Premium: COLORS.gold, User: COLORS.accent };

  return (
    <div className="space-y-6">
      {/* Admin stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {mockStats.map((s, i) => <StatCard key={i} stat={s} dark={dark} />)}
      </div>

      {/* User management */}
      <div className={`rounded-2xl border overflow-hidden ${dark ? "border-white/10" : "border-gray-200 shadow-sm"}`}>
        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: dark ? "rgba(255,255,255,0.08)" : "#e5e7eb" }}>
          <div className="flex items-center gap-2">
            <Icon path={icons.users} size={16} style={{ stroke: COLORS.primaryLight }} />
            <span className="font-semibold text-sm">Manajemen Pengguna</span>
          </div>
          <button onClick={() => addToast("Fitur tambah pengguna", "info")} className="text-xs px-3 py-1.5 rounded-lg font-medium text-white" style={{ background: COLORS.primary }}>+ Tambah</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className={dark ? "bg-white/3" : "bg-gray-50"}>
                {["Nama", "Email", "Role", "Status", "Bergabung", "Penggunaan", "Aksi"].map(h => (
                  <th key={h} className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${dark ? "text-gray-500" : "text-gray-400"}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={i} className={`border-t transition-colors hover:${dark ? "bg-white/4" : "bg-gray-50"} ${dark ? "border-white/8" : "border-gray-100"}`}>
                  <td className="px-4 py-3 font-medium">{u.name}</td>
                  <td className={`px-4 py-3 ${dark ? "text-gray-400" : "text-gray-600"}`}>{u.email}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: `${roleColor[u.role]}20`, color: roleColor[u.role] }}>{u.role}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium ${u.status === "Aktif" ? "text-emerald-400" : "text-gray-500"}`}>{u.status}</span>
                  </td>
                  <td className={`px-4 py-3 text-xs ${dark ? "text-gray-500" : "text-gray-400"}`}>{u.joined}</td>
                  <td className={`px-4 py-3 text-xs ${dark ? "text-gray-500" : "text-gray-400"}`}>{u.usage}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      {["Edit", "Hapus"].map(a => (
                        <button key={a} onClick={() => addToast(`${a} pengguna: ${u.name}`, a === "Hapus" ? "error" : "info")}
                          className={`text-xs px-2 py-1 rounded-md font-medium ${a === "Hapus" ? "text-red-400 hover:bg-red-500/10" : dark ? "text-gray-400 hover:bg-white/10" : "text-gray-600 hover:bg-gray-100"}`}>{a}</button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Activity Log */}
      <div className={`rounded-2xl border overflow-hidden ${dark ? "border-white/10" : "border-gray-200 shadow-sm"}`}>
        <div className="flex items-center gap-2 p-4 border-b" style={{ borderColor: dark ? "rgba(255,255,255,0.08)" : "#e5e7eb" }}>
          <Icon path={icons.log} size={16} style={{ stroke: COLORS.primaryLight }} />
          <span className="font-semibold text-sm">Log Aktivitas</span>
        </div>
        {logs.map((l, i) => (
          <div key={i} className={`flex items-center gap-4 px-4 py-3 border-b last:border-0 ${dark ? "border-white/8" : "border-gray-100"}`}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${COLORS.primary}15` }}>
              <Icon path={icons[l.type === "recording" ? "mic" : l.type === "export" ? "download" : l.type === "upload" ? "upload" : "activity"]} size={14} style={{ stroke: COLORS.primaryLight }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium">{l.user} — <span className={dark ? "text-gray-400" : "text-gray-600"}>{l.action}</span></div>
              <div className={`text-xs ${dark ? "text-gray-600" : "text-gray-400"}`}>{l.detail}</div>
            </div>
            <span className={`text-xs shrink-0 ${dark ? "text-gray-600" : "text-gray-400"}`}>{l.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Profile Page ─────────────────────────────────────────────────────────────
function ProfilePage({ dark, addToast }) {
  const [name, setName] = useState("Ahmad Khalid");
  const [email, setEmail] = useState("ahmad@example.com");
  return (
    <div className="max-w-2xl space-y-6">
      <div className={`p-6 rounded-2xl border ${dark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-sm"}`}>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl text-white" style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.accent})` }}>AK</div>
          <div>
            <div className="font-bold text-lg">{name}</div>
            <div className={`text-sm ${dark ? "text-gray-400" : "text-gray-500"}`}>{email}</div>
            <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: `${COLORS.gold}20`, color: COLORS.gold }}>Pro Plan</span>
          </div>
        </div>
        <div className="space-y-4">
          {[{ label: "Nama Lengkap", val: name, set: setName }, { label: "Email", val: email, set: setEmail }].map(f => (
            <div key={f.label}>
              <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${dark ? "text-gray-500" : "text-gray-400"}`}>{f.label}</label>
              <input value={f.val} onChange={e => f.set(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all ${dark ? "bg-white/8 border-white/15 text-white focus:border-purple-500/50" : "bg-gray-50 border-gray-200 focus:border-purple-400"}`} />
            </div>
          ))}
          <button onClick={() => addToast("Profil disimpan!", "success")} className="w-full py-3 rounded-xl font-semibold text-white transition-all hover:scale-105"
            style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.accent})` }}>
            Simpan Perubahan
          </button>
        </div>
      </div>

      {/* Usage stats */}
      <div className={`p-6 rounded-2xl border ${dark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-sm"}`}>
        <h3 className="font-bold mb-4">Penggunaan Bulan Ini</h3>
        {[{ label: "Menit Transkripsi", used: 347, total: 1000 }, { label: "Penyimpanan", used: 2.4, total: 10, suffix: " GB" }, { label: "Rekaman", used: 28, total: 999 }].map(s => (
          <div key={s.label} className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>{s.label}</span>
              <span className={dark ? "text-gray-400" : "text-gray-600"}>{s.used}{s.suffix || ""} / {s.total}{s.suffix || ""}</span>
            </div>
            <div className={`h-2 rounded-full overflow-hidden ${dark ? "bg-white/10" : "bg-gray-100"}`}>
              <div className="h-full rounded-full" style={{ width: `${(s.used / s.total) * 100}%`, background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.accent})` }} />
            </div>
          </div>
        ))}
      </div>

      {/* Settings */}
      <div className={`p-6 rounded-2xl border ${dark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-sm"}`}>
        <h3 className="font-bold mb-4">Pengaturan Aksesibilitas</h3>
        {[{ label: "Ukuran font besar (ramah tunarungu)", val: false }, { label: "Kontras tinggi", val: false }, { label: "Subtitle otomatis", val: true }, { label: "Notifikasi desktop", val: true }].map((s, i) => (
          <div key={i} className={`flex items-center justify-between py-3 border-b last:border-0 ${dark ? "border-white/8" : "border-gray-100"}`}>
            <span className="text-sm">{s.label}</span>
            <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-all ${s.val ? "" : dark ? "bg-white/15" : "bg-gray-200"}`}
              style={s.val ? { background: COLORS.accent } : {}}>
              <div className="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all" style={{ left: s.val ? "calc(100% - 18px)" : "2px" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [dark, setDark] = useState(true);
  const [page, setPage] = useState("landing");
  const [appPage, setAppPage] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "info") => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3200);
  };

  const pageTitle = navItems.find(n => n.id === appPage)?.label || "Dashboard";

  if (page === "landing") {
    return (
      <>
        <LandingPage onEnter={() => setPage("app")} dark={dark} />
        <button onClick={() => setDark(!dark)} className="fixed bottom-6 left-6 p-3 rounded-2xl text-white shadow-2xl z-50"
          style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.accent})` }}>
          <Icon path={dark ? icons.sun : icons.moon} size={18} />
        </button>
        <Toast toasts={toasts} />
      </>
    );
  }

  const renderAppPage = () => {
    const props = { dark, addToast, setPage: setAppPage };
    switch (appPage) {
      case "dashboard": return <DashboardPage {...props} />;
      case "recording": return <RecordingPage {...props} />;
      case "upload": return <UploadPage {...props} />;
      case "sign": return <SignPage {...props} />;
      case "conversation": return <ConversationPage {...props} />;
      case "learning": return <LearningPage {...props} />;
      case "transcripts": return <TranscriptsPage {...props} />;
      case "admin": return <AdminPage {...props} />;
      case "profile": return <ProfilePage {...props} />;
      default: return <DashboardPage {...props} />;
    }
  };

  return (
    <div className={`min-h-screen ${dark ? "bg-[#0E0C1A] text-white" : "bg-gray-50 text-gray-900"}`}>
      <Sidebar page={appPage} setPage={setAppPage} dark={dark} collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <Header title={pageTitle} dark={dark} toggleDark={() => setDark(!dark)} collapsed={sidebarCollapsed} />
      <main className="transition-all duration-300 pt-20 p-6" style={{ marginLeft: sidebarCollapsed ? 64 : 240 }}>
        <div className="max-w-6xl mx-auto py-4">
          {appPage !== "dashboard" && (
            <button onClick={() => setPage("landing")} className={`text-xs mb-6 flex items-center gap-1 transition-colors ${dark ? "text-gray-600 hover:text-gray-400" : "text-gray-400 hover:text-gray-600"}`}>
              ← Kembali ke Landing Page
            </button>
          )}
          {renderAppPage()}
        </div>
      </main>
      <Toast toasts={toasts} />
    </div>
  );
}
