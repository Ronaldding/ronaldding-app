'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import toolsData from "@/data/tools.json";
import gamesData from "@/data/games.json";
import articlesData from "@/data/articles.json";

interface PanelProps { children: React.ReactNode; }
interface FeatureCardProps { to: string; title: string; subtitle: string; iconEmoji: string; }
interface DeviceCardProps { label: string; description: string; iconSrc: string; }
interface Tool { id: string; to: string; title: string; subtitle: string; iconEmoji: string; category: string; description: string; }
interface Game { id: string; to: string; title: string; subtitle: string; iconEmoji: string; category: string; description: string; }
interface Article { id: number; title: string; publishedAt: string; excerpt?: string; category?: string; }

const allArticles: Article[] = (articlesData as any[])
  .filter((a: any) => typeof a?.id === "number" && typeof a?.title === "string" && typeof a?.publishedAt === "string")
  .sort((a: any, b: any) => (a.publishedAt > b.publishedAt ? -1 : 1));
const latestArticles = allArticles.slice(0, 3);
const latestTools = (toolsData as any[]).slice(0, 3);
const latestGames = (gamesData as any[]).slice(0, 3);

export default function Home() {
	const [count, setCount] = useState(0);
	const [name, setName] = useState("Click to fetch!");
	const [isLoading, setIsLoading] = useState(false);
	const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

	const fetchName = async () => {
		setIsLoading(true);
		try {
			const url = "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en";
			const res = await fetch(url);
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			const data: any = await res.json();
			const tempList = data?.temperature?.data ?? [];
			const hko = tempList.find((d: any) => d?.place === "Hong Kong Observatory") ?? tempList[0];
			const temp = hko?.value; const tempUnit = hko?.unit ?? "C";
			const rh = data?.humidity?.data?.[0]?.value;
			const t = data?.temperature?.recordTime ?? data?.updateTime ?? "";
			const time = typeof t === "string" ? t.replace(/.*T(\d{2}:\d{2}).*/, "$1") : "";
			const summary = [temp != null ? `${temp}°${tempUnit}` : null, rh != null ? `RH ${rh}%` : null, time ? `at ${time}` : null].filter(Boolean).join(" · ");
			setName(summary || "No data");
		} catch (err) { setName("Failed to fetch weather"); } finally { setIsLoading(false); }
	};

	useEffect(() => {
		const handleResize = () => setWindowWidth(window.innerWidth);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<div className="min-h-screen flex flex-col bg-[#fbfbfd] text-gray-900 antialiased">
			<Navbar />
			<main className="flex-grow">
				<section className="mx-auto max-w-7xl px-6 sm:px-8 pt-16 pb-12 lg:pt-24 lg:pb-16">
					<div className="text-center">
						<h1 className="text-[clamp(2.25rem,7vw,4.5rem)] font-semibold tracking-tight leading-[1.05]">
							<span className="block">Ronald Ding</span>
							<span className="block text-gray-700">Tools that feel effortless.</span>
						</h1>
						<p className="mt-6 text-[clamp(1rem,2vw,1.25rem)] text-gray-600 max-w-2xl mx-auto">
							A focused set of utilities designed with clarity and care. No fluff—just what you need, beautifully engineered.
						</p>
					</div>
				</section>

				<section className="W-full min-h-[80vh] flex items-center">
					<div className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-blue-100/30 to-white px-6 sm:px-8 w-full min-h-[80vh] flex items-center">
						<div className="mx-auto max-w-7xl text-center w-full">
							<h2 className="text-4xl lg:text-6xl font-semibold tracking-tight mb-8 text-gray-900">Build Something Amazing</h2>
							<p className="text-xl lg:text-3xl text-gray-600 max-w-4xl mx-auto mb-12">Every tool here is crafted with precision. From simple calculators to complex 3D games, experience the power of thoughtful design.</p>
							<div className="flex flex-wrap justify-center gap-6">
								<div className="bg-white/60 backdrop-blur-sm rounded-full px-8 py-4 text-base font-medium text-gray-700 border border-gray-200/50">🚀 Fast Performance</div>
								<div className="bg-white/60 backdrop-blur-sm rounded-full px-8 py-4 text-base font-medium text-gray-700 border border-gray-200/50">🎨 Beautiful Design</div>
								<div className="bg-white/60 backdrop-blur-sm rounded-full px-8 py-4 text-base font-medium text-gray-700 border border-gray-200/50">📱 Mobile First</div>
							</div>
						</div>
						<div className="pointer-events-none absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-100/20 to-transparent rounded-full blur-3xl"></div>
						<div className="pointer-events-none absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-100/20 to-transparent rounded-full blur-3xl"></div>
					</div>
				</section>

				<section className="mx-auto max-w-7xl px-6 sm:px-8 py-16">
					<div className="flex justify-between items-center mb-8">
						<Link href="/tools" className="group">
							<h2 className="text-3xl font-semibold tracking-tight flex items-center group-hover:text-blue-600 transition-colors">Tools <span className="ml-2 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">→</span></h2>
						</Link>
						<Link href="/tools" className="text-blue-600 hover:text-blue-700 text-sm font-medium">View all tools</Link>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
						{latestTools.map((tool: any) => (<FeatureCard key={tool.id} {...tool} />))}
					</div>
				</section>

				<section className="mx-auto max-w-7xl px-6 sm:px-8 py-16 border-t border-gray-200">
					<div className="flex justify-between items-center mb-8">
						<Link href="/games" className="group">
							<h2 className="text-3xl font-semibold tracking-tight flex items-center group-hover:text-blue-600 transition-colors">Games <span className="ml-2 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">→</span></h2>
						</Link>
						<Link href="/games" className="text-blue-600 hover:text-blue-700 text-sm font-medium">View all games</Link>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
						{latestGames.map((game: any) => (<FeatureCard key={game.id} {...game} />))}
					</div>
				</section>

				<section className="mx-auto max-w-7xl px-6 sm:px-8 py-16 border-t border-gray-200">
					<div className="flex justify-between items-center mb-8">
						<Link href="/articles" className="group">
							<h2 className="text-3xl font-semibold tracking-tight flex items-center group-hover:text-blue-600 transition-colors">Articles <span className="ml-2 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">→</span></h2>
						</Link>
						<Link href="/articles" className="text-blue-600 hover:text-blue-700 text-sm font-medium">View all articles</Link>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
						{latestArticles.map((article: any) => (<ArticleTeaser key={article.id} id={article.id} title={article.title} excerpt={(article as any).excerpt} />))}
					</div>
				</section>
			</main>
			<Footer />
		</div>
	);
}

function Panel({ children }: PanelProps) { return (<div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8">{children}</div>); }
function FeatureCard({ to, title, subtitle, iconEmoji }: FeatureCardProps) { return (<Link href={to} className="group block focus:outline-none"><div className="rounded-2xl border border-gray-200 bg-white p-8 h-full flex flex-col items-center justify-between transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md"><div className="text-5xl h-16 flex items-center justify-center mb-6" dangerouslySetInnerHTML={{__html: iconEmoji}} /><div className="text-center flex-grow flex flex-col justify-center"><h3 className="text-xl font-semibold tracking-tight mb-3 min-h-[60px] flex items-center justify-center">{title}</h3><p className="text-base text-gray-600 min-h-[100px]">{subtitle}</p></div><div className="mt-6 text-sm text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">Learn more →</div></div></Link>); }
function ArticleTeaser({ id, title, excerpt }: { id: number; title: string; excerpt?: string }) { return (<Link href={`/article/id/${id}`} className="group block focus:outline-none"><div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 h-full text-gray-900 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md"><div className="relative z-10 flex flex-col h-full"><div className="h-12 w-12 rounded-xl bg-gray-100 grid place-items-center shadow-sm mb-6"><div className="text-xl">📰</div></div><div className="flex-grow"><h3 className="text-xl font-semibold tracking-tight mb-3">{title}</h3>{excerpt && (<p className="text-base text-gray-600 line-clamp-3">{excerpt}</p>)}</div><div className="mt-6 text-sm text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">Read article →</div></div></div></Link>); }
