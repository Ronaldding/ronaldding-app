'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function NotFound() {
	const router = useRouter();
	const TOTAL_SECONDS = 15;
	const [countdown, setCountdown] = useState(TOTAL_SECONDS);
	const [isRedirecting, setIsRedirecting] = useState(false);

	useEffect(() => {
		const timer = setInterval(() => {
			setCountdown((prev) => {
				if (prev <= 1) {
					clearInterval(timer);
					router.replace('/');
					return 0;
				}
				return prev - 1;
			});
		}, 1000);
		return () => clearInterval(timer);
	}, [router]);

	const progressPercent = ((TOTAL_SECONDS - countdown) / TOTAL_SECONDS) * 100;

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

					<div className="mt-8 text-sm md:text-base text-gray-700">
						Taking you home in <span className="tabular-nums font-medium">{countdown}</span>…
					</div>
					<div className="mt-3 h-[2px] w-full bg-gray-200 overflow-hidden rounded-full">
						<div
							className="h-full bg-gray-900 transition-all duration-1000 ease-linear"
							style={{ width: `${progressPercent}%` }}
						/>
					</div>

					<div className="mt-8 flex items-center justify-center gap-3">
						<Link
							href="/"
							className="rounded-full bg-gray-900 text-white px-5 py-2.5 text-sm md:text-base hover:bg-black transition-colors"
						>
							Go to Home
						</Link>
						<button
							type="button"
							disabled={isRedirecting}
							onClick={() => {
								if (isRedirecting) return;
								setIsRedirecting(true);
								if (typeof window !== 'undefined') {
									window.location.replace('/');
								} else {
									router.replace('/');
								}
							}}
							className="rounded-full border border-gray-300 bg-white text-gray-900 px-5 py-2.5 text-sm md:text-base hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
						>
							Skip
						</button>
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
} 