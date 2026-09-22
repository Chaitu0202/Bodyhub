import React, { useState, useEffect } from 'react';
import { Plus, Calendar, Clock, MapPin, Trash2, Edit3, CheckCircle2, Globe, FileEdit } from 'lucide-react';
import { Button } from '../../components/ui/Button.tsx';
import { Badge } from '../../components/ui/Badge.tsx';
import { Modal } from '../../components/ui/Modal.tsx';
import { useToast } from '../../components/ui/Toast.tsx';
import { eventService } from '../../services/store.ts';
import { GymEvent, EventCategory, EventType } from '../../types.ts';

export const AdminEventsPage: React.FC = () => {
  const [events, setEvents] = useState<GymEvent[]>(eventService.getAll());
  const [createModal, setCreateModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<GymEvent | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('07:00 AM – 09:00 AM');
  const [location, setLocation] = useState('Body Hub Olympic Lifting Arena');
  const [category, setCategory] = useState<EventType>('Workshops');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1470&auto=format&fit=crop');
  const [status, setStatus] = useState<'Draft' | 'Published'>('Published');
  const [maxCapacity, setMaxCapacity] = useState('30');
  const { showToast } = useToast();

  const loadData = () => {
    setEvents(eventService.getAll());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('bodyhub_storage_updated', loadData);
    return () => window.removeEventListener('bodyhub_storage_updated', loadData);
  }, []);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDate('');
    setTime('07:00 AM – 09:00 AM');
    setLocation('Body Hub Olympic Lifting Arena');
    setCategory('Workshops');
    setImage('https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1470&auto=format&fit=crop');
    setStatus('Published');
    setMaxCapacity('30');
    setEditingEvent(null);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEvent) {
      eventService.update(editingEvent.id, {
        title,
        description,
        date,
        time,
        location,
        category,
        image,
        status,
        maxCapacity: parseInt(maxCapacity) || 30
      });
      showToast('Event Updated', `Updated "${title}".`, 'success');
    } else {
      eventService.create({
        title,
        description,
        date,
        time,
        location,
        category,
        image,
        status,
        maxCapacity: parseInt(maxCapacity) || 30
      });
      showToast('Event Published', `Created new event "${title}".`, 'success');
    }
    setCreateModal(false);
    resetForm();
  };

  const handleEditClick = (ev: GymEvent) => {
    setEditingEvent(ev);
    setTitle(ev.title);
    setDescription(ev.description);
    setDate(ev.date);
    setTime(ev.time);
    setLocation(ev.location);
    setCategory(ev.category);
    setImage(ev.image);
    setStatus(ev.status);
    setMaxCapacity(ev.maxCapacity ? ev.maxCapacity.toString() : '30');
    setCreateModal(true);
  };

  const handleDelete = (id: string, evTitle: string) => {
    if (window.confirm(`Delete event "${evTitle}"?`)) {
      eventService.delete(id);
      showToast('Event Deleted', 'Event removed from schedule.', 'info');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F4F6F3] font-display">
            EVENTS & ANNOUNCEMENTS
          </h1>
          <p className="text-xs sm:text-sm text-[#9CA39D] mt-1">
            Publish member workshops, strength challenges, and facility notices.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            resetForm();
            setCreateModal(true);
          }}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          CREATE EVENT
        </Button>
      </div>

      {/* Events Table / Card Roster */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(ev => (
          <div
            key={ev.id}
            className="bg-[#111414] border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between shadow-sm"
          >
            <div>
              <div className="aspect-[16/9] relative overflow-hidden">
                <img src={ev.image} alt={ev.title} className="w-full h-full object-cover filter brightness-90" />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#080A0A]/90 text-[#B7FF3C] border border-white/10">
                    {ev.category}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    ev.status === 'Published' ? 'bg-emerald-500/90 text-white' : 'bg-zinc-700 text-zinc-300'
                  }`}>
                    {ev.status}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <div className="text-xs text-[#9CA39D] flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#B7FF3C]" />
                  <span>{ev.date}</span>
                  <span>•</span>
                  <Clock className="w-3.5 h-3.5 text-[#B7FF3C]" />
                  <span>{ev.time}</span>
                </div>

                <h3 className="text-lg font-bold text-[#F4F6F3] font-display">
                  {ev.title}
                </h3>

                <p className="text-xs text-[#9CA39D] line-clamp-2 leading-relaxed">
                  {ev.description}
                </p>

                <div className="text-[11px] text-[#9CA39D] pt-2 border-t border-white/5 flex items-center justify-between">
                  <span>Registered: <strong className="text-[#F4F6F3]">{ev.registeredMembers.length} athletes</strong></span>
                  <span>Cap: {ev.maxCapacity || 30}</span>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0 flex items-center justify-between border-t border-white/5 mt-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-[#B7FF3C]"
                onClick={() => handleEditClick(ev)}
                leftIcon={<Edit3 className="w-3.5 h-3.5" />}
              >
                Edit
              </Button>
              <button
                onClick={() => handleDelete(ev.id, ev.title)}
                className="text-xs text-rose-400 hover:text-rose-300 transition-colors p-1"
                title="Delete Event"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create / Edit Modal */}
      <Modal
        isOpen={createModal}
        onClose={() => setCreateModal(false)}
        title={editingEvent ? 'EDIT EVENT' : 'CREATE NEW EVENT'}
        subtitle="Manage workshop information displayed on member dashboard and public portal."
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#9CA39D] uppercase mb-1">Event Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Olympic Deadlift Form Clinic"
              className="w-full px-4 py-2.5 rounded-lg bg-[#181C1C] border border-white/10 text-[#F4F6F3] text-sm focus:outline-none focus:border-[#B7FF3C]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#9CA39D] uppercase mb-1">Date *</label>
              <input
                type="text"
                required
                value={date}
                onChange={e => setDate(e.target.value)}
                placeholder="e.g. October 15, 2026"
                className="w-full px-4 py-2.5 rounded-lg bg-[#181C1C] border border-white/10 text-[#F4F6F3] text-sm focus:outline-none focus:border-[#B7FF3C]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#9CA39D] uppercase mb-1">Time Slot *</label>
              <input
                type="text"
                required
                value={time}
                onChange={e => setTime(e.target.value)}
                placeholder="e.g. 06:30 AM – 08:30 AM"
                className="w-full px-4 py-2.5 rounded-lg bg-[#181C1C] border border-white/10 text-[#F4F6F3] text-sm focus:outline-none focus:border-[#B7FF3C]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#9CA39D] uppercase mb-1">Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as any)}
                className="w-full px-4 py-2.5 rounded-lg bg-[#181C1C] border border-white/10 text-[#F4F6F3] text-sm focus:outline-none focus:border-[#B7FF3C]"
              >
                <option value="Workshops">Workshops</option>
                <option value="Fitness">Fitness</option>
                <option value="Community">Community</option>
                <option value="Challenges">Challenges</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#9CA39D] uppercase mb-1">Status</label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value as any)}
                className="w-full px-4 py-2.5 rounded-lg bg-[#181C1C] border border-white/10 text-[#F4F6F3] text-sm focus:outline-none focus:border-[#B7FF3C]"
              >
                <option value="Published">Published (Live)</option>
                <option value="Draft">Draft (Hidden)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#9CA39D] uppercase mb-1">Location / Venue</label>
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-[#181C1C] border border-white/10 text-[#F4F6F3] text-sm focus:outline-none focus:border-[#B7FF3C]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#9CA39D] uppercase mb-1">Description *</label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Detail what attendees should bring, schedule, and learning outcomes..."
              className="w-full px-4 py-2.5 rounded-lg bg-[#181C1C] border border-white/10 text-[#F4F6F3] text-sm focus:outline-none focus:border-[#B7FF3C] resize-none"
            />
          </div>

          <div className="pt-2">
            <Button type="submit" variant="primary" size="lg" className="w-full">
              {editingEvent ? 'SAVE EVENT CHANGES' : 'PUBLISH EVENT'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
