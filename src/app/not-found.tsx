'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function NotFound() {
  const [countdown, setCountdown] = useState(15);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          window.location.href = '/';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/90 via-blue-100/80 to-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center pt-20">
        <div className="text-center max-w-2xl mx-auto px-6">
          {/* 404 Icon */}
          <div className="mb-8">
            <div className="mx-auto w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-6">
              <span className="text-6xl font-bold text-white">404</span>
            </div>
          </div>

          {/* Main Message */}
          <h1 className="text-4xl md:text-5xl font-medium text-gray-900 mb-4 font-reading">
            Page Not Found
          </h1>
          <p className="text-xl text-gray-600 mb-8 font-body text-readable">
            Oops! The page you're looking for doesn't exist.
          </p>

          {/* Countdown */}
          <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 mb-8">
            <p className="text-lg text-gray-700 mb-3 font-body">
              Redirecting to home page in:
            </p>
            <div className="text-4xl font-bold text-blue-600 mb-4">
              {countdown} seconds
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-1000 ease-linear"
                style={{ width: `${((15 - countdown) / 15) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 transition-colors"
            >
              Go Home Now
            </Link>
            <Link 
              href="/tools"
              className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
            >
              Browse Tools
            </Link>
          </div>

          {/* Helpful Links */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="font-medium text-gray-900 mb-2">QR Code Generator</h3>
              <Link href="/qr-code" className="text-blue-600 hover:text-blue-700 text-sm">
                Create QR codes
              </Link>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Cheque Converter</h3>
              <Link href="/cheque-converter" className="text-blue-600 hover:text-blue-700 text-sm">
                Convert numbers to text
              </Link>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="font-medium text-gray-900 mb-2">AI Chatbot</h3>
              <Link href="/chatbot" className="text-blue-600 hover:text-blue-700 text-sm">
                Get AI assistance
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 