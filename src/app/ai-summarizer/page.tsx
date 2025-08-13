'use client';

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface SummaryResponse {
  success: boolean;
  summary: string;
  originalLength: number;
  summaryLength: number;
  error?: string;
}

export default function Page() {
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [maxLength, setMaxLength] = useState(150);
  const [useFastModel, setUseFastModel] = useState(false);

  const handleSummarize = async () => {
    if (!inputText.trim()) {
      setError("Please enter some text to summarize");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSummary("");

    try {
      const endpoint = useFastModel ? "/api/summarize-fast" : "/api/summarize";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText.trim(), maxLength })
      });
      const data: SummaryResponse = await response.json();
      if (data.success) setSummary(data.summary);
      else setError(data.error || "Failed to generate summary");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => { setInputText(""); setSummary(""); setError(null); };
  const handleCopySummary = async () => { if (summary) { try { await navigator.clipboard.writeText(summary); } catch {} } };
  const wordCount = inputText.trim().split(/\s+/).filter(w => w.length > 0).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/90 via-blue-100/80 to-gray-50">
      <Navbar />
      <main className="flex-1 pt-20">
        <div className="mx-auto max-w-4xl px-6 sm:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">AI Text Summarizer</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Get instant AI-powered summaries of any text. Extract key points and main ideas quickly and efficiently.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label htmlFor="input-text" className="block text-sm font-medium text-gray-700 mb-2">Enter your text to summarize</label>
                <textarea id="input-text" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Paste or type your text here..." className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none" disabled={isLoading} />
                <div className="mt-2 flex justify-between text-sm text-gray-500"><span>{wordCount} words</span><span>{inputText.length} characters</span></div>
              </div>
              <div className="space-y-4">
                <div>
                  <label htmlFor="max-length" className="block text-sm font-medium text-gray-700 mb-2">Maximum summary length (words)</label>
                  <input id="max-length" type="range" min="50" max="300" value={maxLength} onChange={(e) => setMaxLength(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                  <div className="flex justify-between text-sm text-gray-500 mt-1"><span>50</span><span className="font-medium">{maxLength}</span><span>300</span></div>
                </div>
                <div className="flex items-center">
                  <input id="fast-model" type="checkbox" checked={useFastModel} onChange={(e) => setUseFastModel(e.target.checked)} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                  <label htmlFor="fast-model" className="ml-2 block text-sm text-gray-700">Use faster model (Mistral)</label>
                </div>
              </div>
              <div className="flex gap-4">
                <button onClick={handleSummarize} disabled={isLoading || !inputText.trim()} className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg transition-colors">{isLoading ? 'Generating...' : 'Generate Summary'}</button>
                <button onClick={handleClear} disabled={isLoading} className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">Clear</button>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">AI Generated Summary</label>
                <div className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg bg-white shadow-sm overflow-y-auto">
                  {summary ? (<div className="whitespace-pre-wrap text-gray-900">{summary}</div>) : (<div className="text-gray-500 italic">{isLoading ? 'Generating summary...' : 'Your summary will appear here...'}</div>)}
                </div>
                {summary && (<div className="mt-2 flex justify-between text-sm text-gray-500"><span>{summary.split(/\s+/).filter(w => w.length > 0).length} words</span><span>{summary.length} characters</span></div>)}
              </div>
              {summary && (<button onClick={handleCopySummary} className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">Copy Summary</button>)}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex">
                    <div className="flex-shrink-0"><svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg></div>
                    <div className="ml-3"><h3 className="text-sm font-medium text-red-800">Error</h3><div className="mt-2 text-sm text-red-700">{error}</div></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 