"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

const navItems = [
  { label: "Beranda", href: "/" },
  { label: "Profil", href: "/profil" },
  {
    label: "Penelitian",
    children: [
      { label: "Internal", href: "/penelitian/internal" },
      { label: "Eksternal", href: "/penelitian/eksternal" },
      { label: "Unggulan", href: "/penelitian/unggulan" },
    ],
  },
  {
    label: "PKM",
    children: [
      { label: "Internal", href: "/pkm/internal" },
      { label: "Eksternal", href: "/pkm/eksternal" },
      { label: "Unggulan", href: "/pkm/unggulan" },
    ],
  },
  {
    label: "Informasi",
    children: [
      { label: "Pengumuman", href: "/informasi/pengumuman" },
      { label: "Kegiatan", href: "/informasi/kegiatan" },
      { label: "Luaran", href: "/informasi/luaran" },
    ],
  },
  { label: "Repository", href: "/repository" },
  { label: "Hubungi Kami", href: "/hubungi" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="fixed top-0 w-full z-50 bg-white border-b border-blue-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo-p3m.png" alt="Logo PNM" width={40} height={40} className="rounded-full" />
            <div className="leading-tight">
              <p className="text-xs text-blue-500 font-medium tracking-widest uppercase">Politeknik Negeri Madiun</p>
              <p className="text-sm font-bold text-blue-900">P3M</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.label} className="relative group">
                  <button className="flex items-center gap-1 px-3 py-2 text-sm text-slate-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors">
                    {item.label}
                    <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform duration-200" />
                  </button>
                  <div className="absolute top-full left-0 mt-1 w-44 bg-white rounded-xl shadow-lg border border-blue-100 py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-slate-600 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href!}
                  className="px-3 py-2 text-sm text-slate-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-md text-blue-900 hover:bg-blue-50 transition-colors"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-blue-100 shadow-lg">
          <div className="px-4 py-3 flex flex-col gap-1">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <button
                    onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                  >
                    {item.label}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openDropdown === item.label ? "rotate-180" : ""}`} />
                  </button>
                  {openDropdown === item.label && (
                    <div className="pl-4 flex flex-col gap-1 mt-1 mb-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => { setMobileOpen(false); setOpenDropdown(null); }}
                          className="block px-3 py-2 text-sm text-slate-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href!}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 text-sm font-medium text-slate-700 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
                >
                  {item.label}
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </header>
  );
}