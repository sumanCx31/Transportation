'use client';

import { use, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSearchStore } from '@/store/useSearchStore';
import BusResultCard from '@/components/result.card';

export default function ResultsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const searchParams = useSearchParams();
  
  const storeResults = useSearchStore((state) => state.results);
  const [buses, setBuses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const date = searchParams.get('date');

  useEffect(() => {
    if (storeResults.length > 0) {
      setBuses(storeResults);
    } else {
      const saved = sessionStorage.getItem('bus_results');
      if (saved) {
        setBuses(JSON.parse(saved));
      }
    }
    setLoading(false);
  }, [storeResults]);

  if (loading) {
    return <div className="p-20 text-center text-gray-500 animate-pulse">Loading available routes...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      {/* Search Header */}
      <div className="mb-10 border-b border-gray-100 pb-8">
        <h1 className="text-3xl font-black text-slate-900 capitalize tracking-tight">
          {slug.replace(/-/g, ' ')}
        </h1>
        <p className="text-gray-500 mt-2 font-medium">
          Travel Date: {date || 'N/A'} • {buses.length} buses found
        </p>
      </div>

      {/* Results List */}
      <div className="grid gap-6">
        {buses.length > 0 ? (
          buses.map((bus: any) => (
            <BusResultCard key={bus._id} bus={bus} />
          ))
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-300">
            <h2 className="text-xl font-bold text-gray-700">No buses available</h2>
            <p className="text-gray-500 mt-2">Please try a different date or route.</p>
          </div>
        )}
      </div>
    </div>
  );
}