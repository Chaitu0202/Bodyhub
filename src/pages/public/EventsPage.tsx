import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button.tsx';
import { Modal } from '../../components/ui/Modal.tsx';
import { useToast } from '../../components/ui/Toast.tsx';
import { eventService, authService } from '../../services/store.ts';
import { GymEvent, EventCategory } from '../../types.ts';

export const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<GymEvent[]>(eventService.getPublished());
  const [selectedFilter, setSelectedFilter] = useState<EventCategory>('All');
  const [activeEvent, setActiveEvent] = useState<GymEvent | null>(null);
  const [registerModal, setRegisterModal] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const currentUser = authService.getCurrentUser();

  useEffect(() => {
    const handleUpdate = () => {
      setEvents(eventService.getPublished());
    };
    window.addEventListener('bodyhub_storage_updated', handleUpdate);
    return () => window.removeEventListener('bodyhub_storage_updated', handleUpdate);
  }, []);

  const categories: EventCategory[] = ['All', 'Fitness', 'Community', 'Workshops', 'Challenges'];

  const filteredEvents = selectedFilter === 'All'
    ? events
    : events.filter(e => e.category === selectedFilter);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeEvent) return;
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      // If user is logged in, register them in event
      if (currentUser) {
        eventService.toggleRegister(activeEvent.id, currentUser.id);
      }
      setRegisterModal(false);
      showToast('Registration Confirmed', `You are registered for "${activeEvent.title}"!`, 'success');
      setForm({ name: '', phone: '', email: '' });
    }, 500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-16">
      {/* Header */}
      <div className="max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B7FF3C] block mb-3">
          COMMUNITY HAPPENINGS
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-[#F4F6F3] font-display tracking-tight leading-tight">
          EVENTS & WORKSHOPS.
        </h1>
        <p className="text-base sm:text-lg text-[#9CA39D] mt-4 leading-relaxed">
          From Olympic deadlift clinics and kettlebell seminars to beach conditioning runs. Expand your lifting knowledge and bond with fellow Body Hub athletes.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 pt-2 border-b border-white/10 pb-6">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedFilter(cat)}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              selectedFilter === cat
                ? 'bg-[#B7FF3C] text-[#080A0A] shadow-sm'
                : 'bg-[#181C1C] text-[#9CA39D] hover:text-[#F4F6F3] border border-white/10'
            }`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <div className="bg-[#111414] border border-white/10 rounded-3xl p-12 text-center">
          <p className="text-sm font-semibold text-[#F4F6F3]">No events found in this category.</p>
          <p className="text-xs text-[#9CA39D] mt-1">Check back soon or choose another category filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map(event => {
            const isUserRegistered = currentUser ? event.registeredMembers.includes(currentUser.id) : false;

            return (
              <div
                key={event.id}
                className="bg-[#111414] border border-white/10 rounded-3xl overflow-hidden flex flex-col justify-between hover:border-white/20 transition-all duration-300 shadow-sm group"
              >
                <div>
                  <div className="aspect-[16/10] relative overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                    />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#080A0A]/85 text-[#B7FF3C] backdrop-blur-sm border border-white/10">
                      {event.category}
                    </span>
                    {event.maxCapacity && (
                      <span className="absolute top-4 right-4 px-2.5 py-1 rounded-md text-[10px] font-semibold bg-[#181C1C]/90 text-[#F4F6F3] backdrop-blur-sm border border-white/10 flex items-center gap-1">
                        <Users className="w-3 h-3 text-[#B7FF3C]" />
                        <span>{event.registeredMembers.length} / {event.maxCapacity}</span>
                      </span>
                    )}
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex flex-col gap-1 text-xs text-[#9CA39D]">
                      <div className="flex items-center gap-2 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-[#B7FF3C]" />
                        <span>{event.date}</span>
                        <span>•</span>
                        <Clock className="w-3.5 h-3.5 text-[#B7FF3C]" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-[#9CA39D]" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-[#F4F6F3] font-display group-hover:text-[#B7FF3C] transition-colors leading-snug">
                      {event.title}
                    </h3>

                    <p className="text-xs text-[#9CA39D] leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Button
                    variant={isUserRegistered ? 'outline' : 'primary'}
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      setActiveEvent(event);
                      setRegisterModal(true);
                    }}
                  >
                    {isUserRegistered ? '✓ REGISTERED (VIEW DETAILS)' : 'REGISTER FOR EVENT'}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Register / Details Modal */}
      <Modal
        isOpen={registerModal}
        onClose={() => setRegisterModal(false)}
        title={activeEvent ? activeEvent.title : 'EVENT RSVP'}
        subtitle={activeEvent ? `${activeEvent.date} • ${activeEvent.time} • ${activeEvent.location}` : ''}
      >
        {activeEvent && (
          <form onSubmit={handleRegister} className="space-y-4">
            <p className="text-xs text-[#9CA39D] leading-relaxed bg-[#181C1C] p-4 rounded-xl border border-white/5">
              {activeEvent.description}
            </p>

            <div>
              <label className="block text-xs font-semibold text-[#9CA39D] uppercase tracking-wider mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                value={form.name || (currentUser?.name || '')}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Rahul Kumar"
                className="w-full px-4 py-2.5 rounded-lg bg-[#181C1C] border border-white/10 text-[#F4F6F3] text-sm focus:outline-none focus:border-[#B7FF3C]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#9CA39D] uppercase tracking-wider mb-1">
                Mobile Number *
              </label>
              <input
                type="tel"
                required
                pattern="[0-9]{10}"
                value={form.phone || (currentUser?.mobile || '')}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                placeholder="10-digit mobile"
                className="w-full px-4 py-2.5 rounded-lg bg-[#181C1C] border border-white/10 text-[#F4F6F3] text-sm focus:outline-none focus:border-[#B7FF3C]"
              />
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                isLoading={loading}
              >
                CONFIRM MY ATTENDANCE
              </Button>
              <p className="text-[11px] text-[#9CA39D] text-center mt-2">
                Free for active members. Non-members pay normal drop-in at the desk.
              </p>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};
