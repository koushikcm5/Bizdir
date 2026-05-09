// src/components/common/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

const Footer = () => (
  <footer className="bg-surface-900 text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <Building2 size={16} className="text-white" />
            </div>
            <span className="font-display text-xl font-bold">
              Biz<span className="text-primary-400">Dir</span>
            </span>
          </div>
          <p className="text-surface-300 text-sm font-body leading-relaxed max-w-sm">
            India's smartest local business directory. Find trusted businesses near you, from restaurants to hospitals — all in one place.
          </p>
          <div className="flex gap-3 mt-5">
            {[Twitter, Instagram, Linkedin].map((Icon, i) => (
              <button key={i} className="w-9 h-9 bg-surface-800 hover:bg-primary-500 rounded-lg flex items-center justify-center transition-colors">
                <Icon size={15} />
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold text-sm mb-4 text-surface-200">Quick Links</h4>
          <ul className="space-y-2">
            {[['Home', '/'], ['Search', '/search'], ['Login', '/login'], ['Register', '/register']].map(([label, to]) => (
              <li key={to}>
                <Link to={to} className="text-sm font-body text-surface-400 hover:text-white transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-sm mb-4 text-surface-200">Contact</h4>
          <div className="flex items-center gap-2 text-sm font-body text-surface-400">
            <Mail size={14} />
            <span>support@bizdir.in</span>
          </div>
          <p className="text-sm font-body text-surface-400 mt-2">Mon–Sat, 9am–6pm IST</p>
        </div>
      </div>

      <div className="border-t border-surface-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs font-body text-surface-500">© {new Date().getFullYear()} BizDir. All rights reserved.</p>
        <div className="flex gap-4">
          {['Privacy Policy', 'Terms of Service'].map(t => (
            <button key={t} className="text-xs font-body text-surface-500 hover:text-surface-300 transition-colors">{t}</button>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
