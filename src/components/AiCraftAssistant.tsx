import React, { useState } from 'react';
import { generateAiReflection } from '../services/gemini';
import { Sparkles, BookOpen, Coffee, Compass, Heart, Loader2 } from 'lucide-react';

export const AiCraftAssistant: React.FC = () => {
  const [promptType, setPromptType] = useState('Morning Journal Prompt');
  const [userContext, setUserContext] = useState('');
  const [aiOutput, setAiOutput] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const predefinedPrompts = [
    { title: 'Morning Journal Prompt', desc: 'Deep contemplative prompt for mindful mornings', icon: <BookOpen className="w-4 h-4" /> },
    { title: 'Weekly Reflection & Reset', desc: 'Summarize growth and clear mental clutter', icon: <Compass className="w-4 h-4" /> },
    { title: 'Cozy Comfort Recipe', desc: 'Inspirational wholesome recipe for quiet evenings', icon: <Coffee className="w-4 h-4" /> },
    { title: 'Botanical & Craft Idea', desc: 'Creative DIY project for stationery lovers', icon: <Sparkles className="w-4 h-4" /> },
  ];

  const handleGenerate = async (type: string) => {
    setPromptType(type);
    setIsLoading(true);
    setAiOutput('');
    try {
      const result = await generateAiReflection(type, userContext || 'Seeking calm and inspiration');
      setAiOutput(result);
    } catch (err: any) {
      setAiOutput(`Error generating reflection: ${err.message || 'Please check your Gemini API key.'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-dot-grid min-h-[calc(100vh-5rem)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="relative paper-card p-6 sm:p-8 rounded-2xl">
          <div className="washi-tape-top"></div>
          <div className="flex items-center space-x-3 mb-2">
            <span className="px-3 py-1 bg-[#F7D6D0] text-[#783527] rounded-full text-xs font-heading font-bold uppercase tracking-wider flex items-center space-x-1">
              <Sparkles className="w-3 h-3" />
              <span>AI Craft Companion</span>
            </span>
            <span className="text-xs text-[#717972] font-medium">• Powered by Gemini</span>
          </div>
          <h2 className="font-heading text-3xl font-bold text-[#1F1B14] tracking-tight">
            Your Mindful Stationery Assistant
          </h2>
          <p className="text-[#414943] text-sm mt-1">
            Receive personalized journaling prompts, creative recipe ideas, and weekly reflections tailored to your mood.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {predefinedPrompts.map((p) => (
            <div
              key={p.title}
              onClick={() => handleGenerate(p.title)}
              className="paper-card p-5 rounded-2xl cursor-pointer hover:border-[#3B6E52] transition-all group flex items-start space-x-4"
            >
              <div className="w-10 h-10 rounded-xl bg-[#E8F2EC] flex items-center justify-center text-[#3B6E52] shrink-0 group-hover:scale-110 transition-transform">
                {p.icon}
              </div>
              <div>
                <h3 className="font-heading font-bold text-[#1F1B14] group-hover:text-[#3B6E52] transition-colors">
                  {p.title}
                </h3>
                <p className="text-xs text-[#717972] mt-0.5">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Context Input */}
        <div className="paper-card p-6 rounded-2xl space-y-4">
          <h3 className="font-heading text-lg font-bold text-[#1F1B14]">Share your current focus or mood (Optional)</h3>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. Feeling a bit restless today, looking for slow living inspiration..."
              value={userContext}
              onChange={(e) => setUserContext(e.target.value)}
              className="flex-1 bg-[#F5EFEB] border border-[#EDE4D8] rounded-xl px-4 py-3 text-sm text-[#1F1B14] placeholder-[#717972] focus:outline-none focus:border-[#3B6E52]"
            />
            <button
              onClick={() => handleGenerate(promptType)}
              disabled={isLoading}
              className="btn-primary-craft px-6 py-3 rounded-xl text-sm flex items-center space-x-2 disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>Generate</span>
            </button>
          </div>
        </div>

        {/* AI Output Result Box */}
        {(isLoading || aiOutput) && (
          <div className="paper-card p-6 sm:p-8 rounded-2xl relative">
            <div className="washi-tape-corner"></div>
            <div className="flex items-center space-x-2 mb-4 border-b border-[#EDE4D8] pb-3">
              <Heart className="w-5 h-5 text-[#E08775]" />
              <h3 className="font-heading text-lg font-bold text-[#1F1B14]">Craft Companion Response ({promptType})</h3>
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-3">
                <Loader2 className="w-8 h-8 animate-spin text-[#3B6E52]" />
                <p className="text-sm text-[#717972] italic font-heading">Brewing your custom reflection...</p>
              </div>
            ) : (
              <div className="prose prose-sm max-w-none text-[#1F1B14] leading-relaxed whitespace-pre-line font-normal bg-[#FAF4EB] p-6 rounded-xl border border-[#EDE4D8]">
                {aiOutput}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
