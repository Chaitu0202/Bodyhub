import React, { useState } from 'react';
import { Dumbbell, CheckCircle2, Flame, Award, Clock, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button.tsx';
import { useToast } from '../../components/ui/Toast.tsx';

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rpe: string;
  notes: string;
  completed?: boolean;
}

export const MemberWorkoutsPage: React.FC = () => {
  const [activeDay, setActiveDay] = useState<'Mon' | 'Tue' | 'Wed' | 'Fri' | 'Sat'>('Mon');
  const [exercises, setExercises] = useState<Record<string, Exercise[]>>({
    Mon: [
      { name: 'Barbell Flat Bench Press', sets: 4, reps: '6-8 reps', rpe: 'RPE 8', notes: 'Maintain leg drive and retracted scapula' },
      { name: 'Incline Dumbbell Press', sets: 3, reps: '8-10 reps', rpe: 'RPE 8.5', notes: '30 degree bench angle, deep stretch' },
      { name: 'Cable Flyes (Mid-Height)', sets: 3, reps: '12-15 reps', rpe: 'RPE 9', notes: '2 second squeeze at contraction peak' },
      { name: 'Standing Overhead Barbell Press', sets: 4, reps: '6-8 reps', rpe: 'RPE 8', notes: 'Braced core, glutes engaged throughout' },
      { name: 'Rope Triceps Pushdowns', sets: 4, reps: '12-15 reps', rpe: 'RPE 9', notes: 'Flare rope outward at full extension' }
    ],
    Tue: [
      { name: 'Conventional Barbell Deadlift', sets: 4, reps: '5 reps', rpe: 'RPE 8', notes: 'Pull slack out of bar before breaking floor' },
      { name: 'Chest-Supported T-Bar Row', sets: 4, reps: '8-10 reps', rpe: 'RPE 8.5', notes: 'Drive elbows back, avoid momentum' },
      { name: 'Neutral-Grip Lat Pulldown', sets: 3, reps: '10-12 reps', rpe: 'RPE 8', notes: 'Full lat stretch at overhead ascent' },
      { name: 'Face Pulls with External Rotation', sets: 3, reps: '15-20 reps', rpe: 'RPE 8', notes: 'Rear delt and rotator cuff focus' },
      { name: 'Incline Dumbbell Biceps Curls', sets: 3, reps: '10-12 reps', rpe: 'RPE 9', notes: 'Supinate wrists fully at peak' }
    ],
    Wed: [
      { name: 'Barbell Back Squat', sets: 4, reps: '6-8 reps', rpe: 'RPE 8', notes: 'Hit parallel or deeper with knees tracking toes' },
      { name: 'Romanian Deadlift (RDL)', sets: 3, reps: '8-10 reps', rpe: 'RPE 8', notes: 'Hinge back into hips until hamstring stretch' },
      { name: 'Leg Press (45 Degree)', sets: 3, reps: '12-15 reps', rpe: 'RPE 8.5', notes: 'Keep lower back pinned firmly to pad' },
      { name: 'Standing Calf Raises', sets: 4, reps: '15-20 reps', rpe: 'RPE 9', notes: 'Pause 2 seconds at deep stretch' }
    ],
    Fri: [
      { name: 'Weighted Dips / Pushups', sets: 3, reps: '8-10 reps', rpe: 'RPE 8.5', notes: 'Chest forward lean for pectoral focus' },
      { name: 'Barbell Bent-Over Row', sets: 4, reps: '8 reps', rpe: 'RPE 8', notes: 'Torso angled 45 degrees, pull to sternum' },
      { name: 'Seated Dumbbell Shoulder Press', sets: 3, reps: '10-12 reps', rpe: 'RPE 8.5', notes: 'Controlled tempo on eccentric descent' },
      { name: 'Hammer Curls & Skullcrushers Superset', sets: 3, reps: '12 reps each', rpe: 'RPE 9', notes: 'Minimal rest between arm supersets' }
    ],
    Sat: [
      { name: 'Walking Dumbbell Lunges', sets: 3, reps: '20 paces', rpe: 'RPE 8.5', notes: 'Upright torso, knee gentle floor kiss' },
      { name: 'Hamstring Lying Leg Curl', sets: 4, reps: '10-12 reps', rpe: 'RPE 9', notes: 'Control slow 3-second negative' },
      { name: 'Hanging Leg Raises', sets: 3, reps: '15 reps', rpe: 'RPE 8.5', notes: 'Posterior pelvic tilt without swinging' },
      { name: 'Conditioning Turf Sled Pushes', sets: 5, reps: '30m sprints', rpe: 'Max Effort', notes: '60s rest between rounds' }
    ]
  });

  const [completedMap, setCompletedMap] = useState<Record<string, boolean>>({});
  const { showToast } = useToast();

  const toggleExercise = (name: string) => {
    setCompletedMap(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const handleFinishWorkout = () => {
    showToast('Workout Logged!', 'Great session! Your consistency points and streak have been updated.', 'success');
  };

  const currentExercises = exercises[activeDay] || [];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F4F6F3] font-display">
            MY TRAINING REGIME
          </h1>
          <p className="text-xs sm:text-sm text-[#9CA39D] mt-1">
            Periodized strength program assigned by Body Hub floor coaching team.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={handleFinishWorkout} leftIcon={<Award className="w-4 h-4" />}>
          FINISH & LOG SESSION
        </Button>
      </div>

      {/* Weekday Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10">
        {[
          { key: 'Mon', title: 'Day 1: Upper Push' },
          { key: 'Tue', title: 'Day 2: Upper Pull' },
          { key: 'Wed', title: 'Day 3: Lower Strength' },
          { key: 'Fri', title: 'Day 4: Upper Volume' },
          { key: 'Sat', title: 'Day 5: Legs & Turf' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveDay(tab.key as any)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeDay === tab.key
                ? 'bg-[#B7FF3C] text-[#080A0A] shadow-md'
                : 'bg-[#111414] text-[#9CA39D] hover:text-[#F4F6F3] border border-white/5'
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Exercises Table / List */}
      <div className="bg-[#111414] border border-white/10 rounded-2xl overflow-hidden space-y-2 p-6">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <h3 className="text-lg font-bold text-[#F4F6F3] font-display">
              {activeDay === 'Mon' && 'Upper Push (Chest, Shoulders & Triceps)'}
              {activeDay === 'Tue' && 'Upper Pull (Back, Rear Delts & Biceps)'}
              {activeDay === 'Wed' && 'Lower Strength (Squat & Hamstring Hinge)'}
              {activeDay === 'Fri' && 'Upper Hypertrophy (Density & Volume)'}
              {activeDay === 'Sat' && 'Legs & Turf Conditioning Track'}
            </h3>
            <p className="text-xs text-[#9CA39D]">Complete all sets with 90-120 seconds rest interval.</p>
          </div>
          <span className="text-xs font-mono text-[#B7FF3C] font-semibold">
            {Object.values(completedMap).filter(Boolean).length} / {currentExercises.length} Logged
          </span>
        </div>

        <div className="space-y-3 pt-2">
          {currentExercises.map((ex, idx) => {
            const isDone = !!completedMap[ex.name];

            return (
              <div
                key={idx}
                onClick={() => toggleExercise(ex.name)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isDone
                    ? 'bg-[#181C1C]/60 border-emerald-500/40 opacity-75'
                    : 'bg-[#181C1C] border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isDone ? 'bg-emerald-500 border-emerald-400 text-white' : 'border-white/20 bg-[#111414]'
                  }`}>
                    {isDone && <CheckCircle2 className="w-4 h-4" />}
                  </div>

                  <div>
                    <h4 className={`text-sm font-bold transition-colors ${isDone ? 'line-through text-[#9CA39D]' : 'text-[#F4F6F3]'}`}>
                      {ex.name}
                    </h4>
                    <p className="text-xs text-[#9CA39D] mt-0.5">{ex.notes}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-semibold shrink-0 pl-9 sm:pl-0">
                  <span className="px-2.5 py-1 rounded bg-[#111414] text-[#F4F6F3] border border-white/5">
                    {ex.sets} Sets × {ex.reps}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-[#B7FF3C]/10 text-[#B7FF3C] border border-[#B7FF3C]/20">
                    {ex.rpe}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
