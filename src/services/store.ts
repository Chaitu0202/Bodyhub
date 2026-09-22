import { 
  User, 
  Membership, 
  Payment, 
  GymEvent, 
  Feedback, 
  AppNotification, 
  GymSettings 
} from '../types.ts';
import { 
  INITIAL_GYM_SETTINGS, 
  INITIAL_MEMBERS, 
  INITIAL_MEMBERSHIPS, 
  INITIAL_PAYMENTS, 
  INITIAL_EVENTS, 
  INITIAL_FEEDBACK, 
  INITIAL_NOTIFICATIONS 
} from '../data/mockData.ts';

const STORAGE_KEYS = {
  CURRENT_USER: 'bodyhub_current_user',
  MEMBERS: 'bodyhub_members',
  MEMBERSHIPS: 'bodyhub_memberships',
  PAYMENTS: 'bodyhub_payments',
  EVENTS: 'bodyhub_events',
  FEEDBACK: 'bodyhub_feedback',
  NOTIFICATIONS: 'bodyhub_notifications',
  SETTINGS: 'bodyhub_settings',
  PASSWORDS: 'bodyhub_passwords' // stores mobile -> password mapping for demo
};

// Helper for local storage read/write
function getStored<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error reading ${key} from storage:`, e);
    return fallback;
  }
}

function setStored<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event('bodyhub_storage_updated'));
  } catch (e) {
    console.error(`Error writing ${key} to storage:`, e);
  }
}

// Ensure initial seed
export function initializeStore() {
  if (!localStorage.getItem(STORAGE_KEYS.MEMBERS)) {
    localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(INITIAL_MEMBERS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.MEMBERSHIPS)) {
    localStorage.setItem(STORAGE_KEYS.MEMBERSHIPS, JSON.stringify(INITIAL_MEMBERSHIPS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.PAYMENTS)) {
    localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(INITIAL_PAYMENTS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.EVENTS)) {
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(INITIAL_EVENTS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.FEEDBACK)) {
    localStorage.setItem(STORAGE_KEYS.FEEDBACK, JSON.stringify(INITIAL_FEEDBACK));
  }
  if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(INITIAL_NOTIFICATIONS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(INITIAL_GYM_SETTINGS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.PASSWORDS)) {
    // Default demo passwords: mobile number for members
    const defaultPasswords: Record<string, string> = {
      'admin': 'password',
      '9876543210': '9876543210',
      '9182736452': '9182736452',
      '9012345614': '9012345614',
      '9440123456': '9440123456'
    };
    localStorage.setItem(STORAGE_KEYS.PASSWORDS, JSON.stringify(defaultPasswords));
  }
}

// Current User & Auth
export const authService = {
  getCurrentUser(): User | null {
    return getStored<User | null>(STORAGE_KEYS.CURRENT_USER, null);
  },

  setCurrentUser(user: User | null): void {
    setStored(STORAGE_KEYS.CURRENT_USER, user);
  },

  login(identifier: string, passwordAttempt: string): { success: boolean; user?: User; requiresPasswordChange?: boolean; error?: string } {
    initializeStore();
    const cleanId = identifier.trim();
    const passwords = getStored<Record<string, string>>(STORAGE_KEYS.PASSWORDS, {});

    // Check Admin Login
    if (cleanId.toLowerCase() === 'admin') {
      const adminPass = passwords['admin'] || 'password';
      if (passwordAttempt === adminPass) {
        const adminUser: User = {
          id: 'admin-1',
          name: 'Administrator',
          mobile: '9999999999',
          username: 'admin',
          role: 'admin',
          firstLogin: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        this.setCurrentUser(adminUser);
        return { success: true, user: adminUser, requiresPasswordChange: false };
      } else {
        return { success: false, error: 'Incorrect administrator password.' };
      }
    }

    // Check Member Login (by mobile or username)
    const members = memberService.getAll();
    const member = members.find(m => m.mobile === cleanId || m.username === cleanId);

    if (!member) {
      return { success: false, error: 'No member account found with this mobile number.' };
    }

    // Check password
    const expectedPassword = passwords[member.mobile] || member.mobile;
    if (passwordAttempt !== expectedPassword) {
      return { success: false, error: 'Invalid password. Try your temporary mobile number if first login.' };
    }

    this.setCurrentUser(member);
    return { 
      success: true, 
      user: member, 
      requiresPasswordChange: member.firstLogin 
    };
  },

  changePassword(userId: string, newPassword: string): boolean {
    const members = memberService.getAll();
    const index = members.findIndex(m => m.id === userId);
    if (index === -1 && userId !== 'admin-1') return false;

    if (userId === 'admin-1') {
      const passwords = getStored<Record<string, string>>(STORAGE_KEYS.PASSWORDS, {});
      passwords['admin'] = newPassword;
      setStored(STORAGE_KEYS.PASSWORDS, passwords);
      return true;
    }

    const member = members[index];
    const passwords = getStored<Record<string, string>>(STORAGE_KEYS.PASSWORDS, {});
    passwords[member.mobile] = newPassword;
    setStored(STORAGE_KEYS.PASSWORDS, passwords);

    // Mark firstLogin as false
    member.firstLogin = false;
    member.updatedAt = new Date().toISOString();
    members[index] = member;
    setStored(STORAGE_KEYS.MEMBERS, members);

    // Update current session
    const current = this.getCurrentUser();
    if (current && current.id === userId) {
      this.setCurrentUser({ ...current, firstLogin: false });
    }

    return true;
  },

  logout(): void {
    this.setCurrentUser(null);
  }
};

// Members Service
export const memberService = {
  getAll(): User[] {
    initializeStore();
    return getStored<User[]>(STORAGE_KEYS.MEMBERS, INITIAL_MEMBERS);
  },

  getById(id: string): User | undefined {
    return this.getAll().find(m => m.id === id);
  },

  create(name: string, mobile: string, initialPlan: 'Monthly' | 'Quarterly' | 'Yearly' = 'Monthly'): { user: User; membership: Membership; temporaryPassword: string } {
    initializeStore();
    const cleanMobile = mobile.replace(/\D/g, '');
    const cleanName = name.trim();
    const newId = `mem-${Date.now()}`;

    const newUser: User = {
      id: newId,
      name: cleanName,
      mobile: cleanMobile,
      username: cleanMobile, // mobile becomes username
      role: 'member',
      firstLogin: true, // forced password change
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Store temporary password
    const passwords = getStored<Record<string, string>>(STORAGE_KEYS.PASSWORDS, {});
    passwords[cleanMobile] = cleanMobile; // mobile is temporary password
    setStored(STORAGE_KEYS.PASSWORDS, passwords);

    // Save user
    const members = this.getAll();
    members.unshift(newUser);
    setStored(STORAGE_KEYS.MEMBERS, members);

    // Generate initial membership
    const startDate = new Date().toISOString().split('T')[0];
    const expDate = new Date();
    const daysToAdd = initialPlan === 'Monthly' ? 30 : initialPlan === 'Quarterly' ? 90 : 365;
    expDate.setDate(expDate.getDate() + daysToAdd);
    const expiryDate = expDate.toISOString().split('T')[0];

    const amounts = { Monthly: 2500, Quarterly: 6500, Yearly: 18000 };

    const newMembership: Membership = {
      id: `mbr-${Date.now()}`,
      memberId: newId,
      plan: initialPlan,
      startDate,
      expiryDate,
      status: 'Active',
      amount: amounts[initialPlan]
    };

    const memberships = membershipService.getAll();
    memberships.unshift(newMembership);
    setStored(STORAGE_KEYS.MEMBERSHIPS, memberships);

    // Initial payment record
    paymentService.recordPayment({
      memberId: newId,
      memberName: cleanName,
      membershipId: newMembership.id,
      amount: amounts[initialPlan],
      method: 'UPI',
      status: 'Paid',
      planName: `${initialPlan} Membership`
    });

    // Welcome Notification
    notificationService.add({
      memberId: newId,
      title: 'Welcome to BODY HUB!',
      message: 'Your membership is active. Please update your temporary password upon logging in.',
      type: 'announcement'
    });

    return {
      user: newUser,
      membership: newMembership,
      temporaryPassword: cleanMobile
    };
  },

  update(id: string, updates: Partial<User>): User | null {
    const members = this.getAll();
    const index = members.findIndex(m => m.id === id);
    if (index === -1) return null;

    members[index] = {
      ...members[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    setStored(STORAGE_KEYS.MEMBERS, members);

    // If current session is this user, update it
    const cur = authService.getCurrentUser();
    if (cur && cur.id === id) {
      authService.setCurrentUser(members[index]);
    }

    return members[index];
  },

  deleteOrDeactivate(id: string): boolean {
    const members = this.getAll().filter(m => m.id !== id);
    setStored(STORAGE_KEYS.MEMBERS, members);

    // Also update membership to Expired
    const memberships = membershipService.getAll();
    const memberIndex = memberships.findIndex(mb => mb.memberId === id);
    if (memberIndex !== -1) {
      memberships[memberIndex].status = 'Expired';
      setStored(STORAGE_KEYS.MEMBERSHIPS, memberships);
    }
    return true;
  }
};

// Memberships Service
export const membershipService = {
  getAll(): Membership[] {
    initializeStore();
    return getStored<Membership[]>(STORAGE_KEYS.MEMBERSHIPS, INITIAL_MEMBERSHIPS);
  },

  getByMemberId(memberId: string): Membership | undefined {
    return this.getAll().find(m => m.memberId === memberId);
  },

  extend(memberId: string, plan: 'Monthly' | 'Quarterly' | 'Yearly', paymentMethod: 'UPI' | 'Card' | 'Cash' = 'UPI'): Membership | null {
    const memberships = this.getAll();
    const index = memberships.findIndex(m => m.memberId === memberId);
    const member = memberService.getById(memberId);
    if (!member) return null;

    const daysToAdd = plan === 'Monthly' ? 30 : plan === 'Quarterly' ? 90 : 365;
    const amounts = { Monthly: 2500, Quarterly: 6500, Yearly: 18000 };
    const today = new Date();
    
    let baseDate = today;
    if (index !== -1) {
      const currentExpiry = new Date(memberships[index].expiryDate);
      if (currentExpiry > today) {
        baseDate = currentExpiry;
      }
    }

    const newExpiry = new Date(baseDate);
    newExpiry.setDate(newExpiry.getDate() + daysToAdd);

    const updatedMembership: Membership = {
      id: index !== -1 ? memberships[index].id : `mbr-${Date.now()}`,
      memberId,
      plan,
      startDate: today.toISOString().split('T')[0],
      expiryDate: newExpiry.toISOString().split('T')[0],
      status: 'Active',
      amount: amounts[plan]
    };

    if (index !== -1) {
      memberships[index] = updatedMembership;
    } else {
      memberships.unshift(updatedMembership);
    }
    setStored(STORAGE_KEYS.MEMBERSHIPS, memberships);

    // Create payment
    paymentService.recordPayment({
      memberId,
      memberName: member.name,
      membershipId: updatedMembership.id,
      amount: amounts[plan],
      method: paymentMethod,
      status: 'Paid',
      planName: `${plan} Membership Renewal`
    });

    // Send notification
    notificationService.add({
      memberId,
      title: 'Membership Extended Successfully',
      message: `Your ${plan} membership has been renewed until ${updatedMembership.expiryDate}.`,
      type: 'payment',
      actionUrl: '/member/membership'
    });

    return updatedMembership;
  }
};

// Payment Service
export const paymentService = {
  getAll(): Payment[] {
    initializeStore();
    return getStored<Payment[]>(STORAGE_KEYS.PAYMENTS, INITIAL_PAYMENTS);
  },

  getByMemberId(memberId: string): Payment[] {
    return this.getAll().filter(p => p.memberId === memberId);
  },

  recordPayment(data: {
    memberId: string;
    memberName: string;
    membershipId?: string;
    amount: number;
    method: 'UPI' | 'Card' | 'Cash' | 'Net Banking';
    status: 'Paid' | 'Pending' | 'Failed';
    planName: string;
  }): Payment {
    const payments = this.getAll();
    const dateStr = new Date().toISOString().split('T')[0];
    const rand = Math.floor(1000 + Math.random() * 9000);
    const receiptNumber = `BH-REC-${dateStr.replace(/-/g, '')}-${rand}`;

    const newPayment: Payment = {
      id: `pay-${Date.now()}`,
      memberId: data.memberId,
      memberName: data.memberName,
      membershipId: data.membershipId,
      amount: data.amount,
      date: dateStr,
      method: data.method,
      status: data.status,
      receiptNumber,
      planName: data.planName
    };

    payments.unshift(newPayment);
    setStored(STORAGE_KEYS.PAYMENTS, payments);
    return newPayment;
  }
};

// Events Service
export const eventService = {
  getAll(): GymEvent[] {
    initializeStore();
    return getStored<GymEvent[]>(STORAGE_KEYS.EVENTS, INITIAL_EVENTS);
  },

  getPublished(): GymEvent[] {
    return this.getAll().filter(e => e.status === 'Published');
  },

  create(eventData: Omit<GymEvent, 'id' | 'createdAt' | 'registeredMembers'>): GymEvent {
    const events = this.getAll();
    const newEvent: GymEvent = {
      ...eventData,
      id: `ev-${Date.now()}`,
      registeredMembers: [],
      createdAt: new Date().toISOString()
    };
    events.unshift(newEvent);
    setStored(STORAGE_KEYS.EVENTS, events);

    if (newEvent.status === 'Published') {
      notificationService.add({
        memberId: 'all',
        title: `New Event: ${newEvent.title}`,
        message: `${newEvent.description.substring(0, 80)}... on ${newEvent.date}`,
        type: 'event',
        actionUrl: '/events'
      });
    }

    return newEvent;
  },

  toggleRegister(eventId: string, memberId: string): boolean {
    const events = this.getAll();
    const index = events.findIndex(e => e.id === eventId);
    if (index === -1) return false;

    const event = events[index];
    const isRegistered = event.registeredMembers.includes(memberId);

    if (isRegistered) {
      event.registeredMembers = event.registeredMembers.filter(id => id !== memberId);
    } else {
      if (event.maxCapacity && event.registeredMembers.length >= event.maxCapacity) {
        return false; // full
      }
      event.registeredMembers.push(memberId);
    }

    events[index] = event;
    setStored(STORAGE_KEYS.EVENTS, events);
    return true;
  },

  update(eventId: string, updates: Partial<GymEvent>): boolean {
    const events = this.getAll();
    const index = events.findIndex(e => e.id === eventId);
    if (index === -1) return false;

    events[index] = { ...events[index], ...updates };
    setStored(STORAGE_KEYS.EVENTS, events);
    return true;
  },

  updateStatus(eventId: string, status: 'Published' | 'Draft'): boolean {
    const events = this.getAll();
    const index = events.findIndex(e => e.id === eventId);
    if (index === -1) return false;

    events[index].status = status;
    setStored(STORAGE_KEYS.EVENTS, events);
    return true;
  },

  delete(eventId: string): boolean {
    const events = this.getAll().filter(e => e.id !== eventId);
    setStored(STORAGE_KEYS.EVENTS, events);
    return true;
  }
};

// Feedback Service
export const feedbackService = {
  getAll(): Feedback[] {
    initializeStore();
    return getStored<Feedback[]>(STORAGE_KEYS.FEEDBACK, INITIAL_FEEDBACK);
  },

  submit(data: {
    memberId: string;
    memberName: string;
    rating: number;
    category: 'Trainers' | 'Equipment' | 'Cleanliness' | 'Staff' | 'Overall';
    comment: string;
  }): Feedback {
    const feedbacks = this.getAll();
    const newFeedback: Feedback = {
      id: `fb-${Date.now()}`,
      ...data,
      date: new Date().toISOString().split('T')[0],
      reviewed: false
    };
    feedbacks.unshift(newFeedback);
    setStored(STORAGE_KEYS.FEEDBACK, feedbacks);
    return newFeedback;
  }
};

// Notifications Service
export const notificationService = {
  getAll(): AppNotification[] {
    initializeStore();
    return getStored<AppNotification[]>(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  },

  getForUser(userId: string): AppNotification[] {
    return this.getAll().filter(n => n.memberId === 'all' || n.memberId === userId);
  },

  add(data: Omit<AppNotification, 'id' | 'createdAt' | 'read'>): AppNotification {
    const notifs = this.getAll();
    const newNotif: AppNotification = {
      ...data,
      id: `notif-${Date.now()}`,
      read: false,
      createdAt: new Date().toISOString()
    };
    notifs.unshift(newNotif);
    setStored(STORAGE_KEYS.NOTIFICATIONS, notifs);
    return newNotif;
  },

  markAsRead(id: string): void {
    const notifs = this.getAll();
    const index = notifs.findIndex(n => n.id === id);
    if (index !== -1) {
      notifs[index].read = true;
      setStored(STORAGE_KEYS.NOTIFICATIONS, notifs);
    }
  },

  markAllAsRead(userId: string): void {
    const notifs = this.getAll();
    notifs.forEach(n => {
      if (n.memberId === 'all' || n.memberId === userId) {
        n.read = true;
      }
    });
    setStored(STORAGE_KEYS.NOTIFICATIONS, notifs);
  }
};

// Settings Service
export const settingsService = {
  get(): GymSettings {
    initializeStore();
    return getStored<GymSettings>(STORAGE_KEYS.SETTINGS, INITIAL_GYM_SETTINGS);
  },

  update(newSettings: Partial<GymSettings>): GymSettings {
    const current = this.get();
    const updated = { ...current, ...newSettings };
    setStored(STORAGE_KEYS.SETTINGS, updated);
    return updated;
  }
};
