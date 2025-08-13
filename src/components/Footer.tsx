'use client';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 py-8 text-center text-gray-600 bg-white/60 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <p>© {new Date().getFullYear()} Ronald Ding</p>
      </div>
    </footer>
  );
} 