import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Dumbbell, Users2, Target, HeartHandshake, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button.tsx';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-24">
      {/* Editorial Header */}
      <div className="max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B7FF3C] block mb-3">
          ABOUT BODY HUB
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-[#F4F6F3] font-display tracking-tight leading-tight">
          BUILT AROUND PROGRESS.
        </h1>
        <p className="text-base sm:text-lg text-[#9CA39D] mt-4 leading-relaxed">
          Body Hub was founded on a simple realization: modern fitness spaces had lost touch with serious training discipline. We set out to build an authentic training sanctuary where science, equipment quality, and community coexist.
        </p>
      </div>

      {/* Story & Visual Hero Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[#B7FF3C]">
            OUR STORY
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#F4F6F3] font-display">
            From Blueprint to Reality.
          </h2>
          <p className="text-sm sm:text-base text-[#9CA39D] leading-relaxed">
            What started as a frustration with overcrowded commercial gyms filled with broken cable stacks and disinterested floor trainers became Body Hub.
          </p>
          <p className="text-sm sm:text-base text-[#9CA39D] leading-relaxed">
            We handpicked Olympic barbells with precise knurling, calibrated weight plates, premium selectorized pin-loaded resistance machines, and a specialized turf sprint track. The result is an arena where both beginners learning their first deadlift and competitive strength athletes feel at home.
          </p>
          <div className="pt-2">
            <Link to="/membership">
              <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                JOIN OUR COMMITTED COMMUNITY
              </Button>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1470&auto=format&fit=crop"
              alt="Body Hub Facility"
              className="w-full h-full object-cover filter contrast-110 brightness-90"
            />
          </div>
        </div>
      </div>

      {/* Philosophy Pillars */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B7FF3C] block mb-2">
            CORE PILLARS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F4F6F3] font-display">
            WHAT WE STAND FOR.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#111414] border border-white/10 rounded-2xl p-8 space-y-4 hover:border-white/20 transition-colors">
            <div className="p-3 w-fit rounded-xl bg-[#181C1C] border border-white/5 text-[#B7FF3C]">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#F4F6F3] font-display">
              Relentless Consistency
            </h3>
            <p className="text-xs text-[#9CA39D] leading-relaxed">
              Progress is not found in sporadic motivation. It is forged through showing up, adhering to the program, and progressively overloading your capacity week by week.
            </p>
          </div>

          <div className="bg-[#111414] border border-white/10 rounded-2xl p-8 space-y-4 hover:border-white/20 transition-colors">
            <div className="p-3 w-fit rounded-xl bg-[#181C1C] border border-white/5 text-[#B7FF3C]">
              <Dumbbell className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#F4F6F3] font-display">
              Zero Compromise on Quality
            </h3>
            <p className="text-xs text-[#9CA39D] leading-relaxed">
              Every bench, dumbbell rack, and cable pulley is calibrated and maintained daily. Clean chalk stands, sanitized locker rooms, and respectful etiquette are mandatory.
            </p>
          </div>

          <div className="bg-[#111414] border border-white/10 rounded-2xl p-8 space-y-4 hover:border-white/20 transition-colors">
            <div className="p-3 w-fit rounded-xl bg-[#181C1C] border border-white/5 text-[#B7FF3C]">
              <Users2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#F4F6F3] font-display">
              Unpretentious Community
            </h3>
            <p className="text-xs text-[#9CA39D] leading-relaxed">
              Ego stays outside the door. Whether you are pressing 10kg or 150kg, the entire community rallies behind anyone putting in honest effort and commitment.
            </p>
          </div>
        </div>
      </div>

      {/* Community Quote / Standards Section */}
      <div className="bg-[#181C1C] border border-white/10 rounded-3xl p-8 sm:p-14 text-center max-w-4xl mx-auto space-y-6">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B7FF3C]">
          THE BODY HUB CREED
        </span>
        <blockquote className="text-2xl sm:text-3xl font-extrabold text-[#F4F6F3] font-display leading-snug">
          "We do not sell quick fixes or gimmick diets. We provide the equipment, the scientific coaching, and the culture. You bring the consistency."
        </blockquote>
        <p className="text-xs text-[#9CA39D] uppercase tracking-wider font-semibold">
          — Body Hub Coaching Directorate
        </p>
      </div>
    </div>
  );
};
