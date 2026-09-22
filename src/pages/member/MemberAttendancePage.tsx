import React, { useState } from 'react';
import { Calendar, CheckCircle2, Clock, MapPin, Award, Flame } from 'lucide-react';
import { Button } from '../../components/ui/Button.tsx';
import { useToast } from '../../components/ui/Toast.tsx';

export const MemberAttendancePage: React.FC = () => {
  const [checkedInToday, setCheckedInToday] = useState(false);
  const { showToast } = useToast();

  const handleManualCheckIn = () => {
    setCheckedInToday(true);
    showToast('Check-In Recorded', 'Front desk scanner validated your check-in at 06:45 AM.', 'success');
  };

  // Mock attendance history for member
  const checkins = [
    { date: 'Today, Oct 14', time: '06:45 AM', zone: 'Olympic Lifting Arena', coach: 'Rajesh Varma' },
    { date: 'Yesterday, Oct 13', time: '07:10 AM', zone: 'Cardio & HIIT Deck', coach: 'Kavita Rao' },
    { date: 'Oct 11, 2026', time: '06:50 AM', zone: 'Selectorized Resistance', coach: 'Praveen Kumar' },
    { date: 'Oct 10, 2026', time: '06:40 AM', zone: 'Olympic Lifting Arena', coach: 'Rajesh Varma' },
    { date: 'Oct 08, 2026', time: '07:15 AM', zone: 'Turf Sprint Track', coach: 'Ananya Roy' },
    { date: 'Oct 07, 2026', time: '06:55 AM', zone: 'Olympic Lifting Arena', coach: 'Rajesh Varma' },
    { date: 'Oct 05, 2026', time: '07:00 AM', zone: 'Cardio & Recovery Lounge', coach: 'Floor Team' },
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F4F6F3] font-display">
            ATTENDANCE & CHECK-IN LOG
          </h1>
          <p className="text-xs sm:text-sm text-[#9CA39D] mt-1">
            Tracking your monthly workout consistency and streak metrics.
          </p>
        </div>

        <Button
          variant={checkedInToday ? 'outline' : 'primary'}
          size="sm"
          onClick={handleManualCheckIn}
          leftIcon={<CheckCircle2 className="w-4 h-4" />}
          disabled={checkedInToday}
        >
          {checkedInToday ? '✓ CHECKED IN TODAY' : 'CHECK-IN SCAN (DEMO)'}
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-[#111414] border border-white/10 rounded-2xl p-6">
          <span className="text-xs font-bold text-[#9CA39D] uppercase tracking-wider">MONTHLY SESSIONS</span>
          <p className="text-3xl font-extrabold text-[#F4F6F3] font-display mt-2">16 / 20</p>
          <span className="text-xs text-[#B7FF3C] mt-1 block">80% on track towards goal</span>
        </div>

        <div className="bg-[#111414] border border-white/10 rounded-2xl p-6">
          <span className="text-xs font-bold text-[#9CA39D] uppercase tracking-wider">CURRENT STREAK</span>
          <p className="text-3xl font-extrabold text-amber-400 font-display mt-2">4 Days</p>
          <span className="text-xs text-[#9CA39D] mt-1 block">Personal record: 12 days</span>
        </div>

        <div className="bg-[#111414] border border-white/10 rounded-2xl p-6">
          <span className="text-xs font-bold text-[#9CA39D] uppercase tracking-wider">FAVORITE TIME SLOT</span>
          <p className="text-3xl font-extrabold text-[#F4F6F3] font-display mt-2">06:30 AM</p>
          <span className="text-xs text-[#9CA39D] mt-1 block">Morning athlete squad</span>
        </div>
      </div>

      {/* History Log */}
      <div className="bg-[#111414] border border-white/10 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-white/10">
          <h3 className="text-base font-bold text-[#F4F6F3] font-display">Recent Check-In Timestamps</h3>
          <p className="text-xs text-[#9CA39D]">Logged via digital turnstile and reception scanner</p>
        </div>

        <div className="divide-y divide-white/5">
          {checkins.map((entry, idx) => (
            <div key={idx} className="p-4 sm:px-6 flex items-center justify-between text-xs hover:bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#181C1C] text-[#B7FF3C] flex items-center justify-center border border-white/10">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-[#F4F6F3]">{entry.date}</p>
                  <p className="text-[#9CA39D] flex items-center gap-1.5 mt-0.5">
                    <Clock className="w-3 h-3 text-[#B7FF3C]" />
                    {entry.time} • Zone: {entry.zone}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[#9CA39D]">Floor Lead:</span>
                <p className="text-[#F4F6F3] font-semibold">{entry.coach}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
