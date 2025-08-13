'use client';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function NotFound() {
	return (
		<div className="min-h-screen flex flex-col bg-white text-gray-900">
			<Navbar />
			<main className="flex-1 flex items-center justify-center px-6">
				<div className="w-full max-w-2xl text-center">
					<div className="text-[88px] md:text-[112px] leading-none font-medium tracking-tight">404</div>
					<h1 className="mt-6 text-3xl md:text-4xl font-medium tracking-tight">
						The page you’re looking for can’t be found.
					</h1>
					<p className="mt-3 text-base md:text-lg text-gray-600">
						It might have been moved, or the link you clicked may be broken.
					</p>
					<div className="mt-8 flex items-center justify-center">
						<Link href="/" className="rounded-full bg-gray-900 text-white px-5 py-2.5 text-sm md:text-base hover:bg-black transition-colors">
							Go to Home
						</Link>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
} 