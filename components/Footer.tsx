import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-blue-950 text-blue-200 py-16 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div>
            <p className="font-bold text-white text-lg mb-2">P3M</p>
            <p className="text-sm text-blue-400 leading-relaxed">
              Pusat Penelitian dan Pengabdian kepada Masyarakat Politeknik Negeri Madiun
            </p>
          </div>
          <div>
            <p className="font-semibold text-white text-sm mb-3">Navigasi</p>
            <ul className="space-y-2 text-sm text-blue-400">
              <li><Link href="/penelitian/internal" className="hover:text-white transition-colors">Penelitian Internal</Link></li>
              <li><Link href="/penelitian/eksternal" className="hover:text-white transition-colors">Penelitian Eksternal</Link></li>
              <li><Link href="/pkm/internal" className="hover:text-white transition-colors">PKM Internal</Link></li>
              <li><Link href="/repository" className="hover:text-white transition-colors">Repository</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-white text-sm mb-3">Kontak</p>
            <ul className="space-y-2 text-sm text-blue-400">
              <li>p3m@pnm.ac.id</li>
              <li>(0351) 452970</li>
              <li>Jl. Serayu No.84, Madiun</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-blue-800 pt-6 text-center">
          <p className="text-xs text-blue-600">© {new Date().getFullYear()} P3M Politeknik Negeri Madiun. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}