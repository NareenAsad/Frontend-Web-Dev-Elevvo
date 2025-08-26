import React from 'react';
import { Mail, MapPin, Phone, Twitter, Linkedin, Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-emerald-600 to-amber-500 p-2 rounded-lg mr-3">
                <div className="w-6 h-6 bg-white rounded-sm"></div>
              </div>
              <span className="text-2xl font-bold text-white">TaskFlow</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              The modern task management tool that helps teams organize, prioritize, and achieve more together.
            </p>
            
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/in/nareen-asad/" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-colors duration-200">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://github.com/NareenAsad/Frontend-Web-Dev-Elevvo/" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-colors duration-200">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {['Features', 'Pricing', 'About Us', 'Help Center'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-emerald-400" />
                <a href="mailto:hello@taskflow.com" className="text-gray-400 hover:text-white transition-colors duration-200">
                  hello@taskflow.com
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-emerald-400" />
                <a href="tel:+1-555-123-4567" className="text-gray-400 hover:text-white transition-colors duration-200">
                  +92 310 4209936
                </a>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-3 text-emerald-400" />
                <span className="text-gray-400">
                  Lahore, Pakistan
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          <p>&copy; 2025 TaskFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}