'use client';

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import toolsData from "@/data/tools.json";

interface Tool { id: string; to: string; title: string; subtitle: string; iconEmoji: string; category: string; description: string; }
interface FeatureCardProps { to: string; title: string; subtitle: string; iconEmoji: string; }

export default function Page() {
	const tools: any[] = toolsData as any;
	return (
		<div className="min-h-screen bg-[#fbfbfd] text-gray-900">
			<Navbar />
			<main className="flex-1">
				<section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white">
					<div className="mx-auto max-w-7xl px-6 sm:px-8 py-20">
						<div className="text-center">
							<h1 className="text-[clamp(2.5rem,8vw,4rem)] font-semibold tracking-tight text-gray-900">Tools</h1>
							<p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">Professional utilities designed for productivity and efficiency.</p>
						</div>
					</div>
				</section>
				<section className="mx-auto max-w-7xl px-6 sm:px-8 py-16">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{tools.map((tool, index) => (<FeatureCard key={index} {...tool} />))}
					</div>
				</section>
			</main>
			<Footer />
		</div>
	);
}

function FeatureCard({ to, title, subtitle, iconEmoji }: FeatureCardProps) {
	return (
		<Link href={to} className="group block focus:outline-none">
			<div className="rounded-2xl border border-gray-200 bg-white p-8 h-full transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
				<div className="flex justify-center mb-6 text-5xl" dangerouslySetInnerHTML={{ __html: iconEmoji }} />
				<h3 className="text-xl font-semibold text-center tracking-tight mb-3">{title}</h3>
				<p className="text-gray-600 text-center leading-relaxed">{subtitle}</p>
			</div>
		</Link>
	);
} 