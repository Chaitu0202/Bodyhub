import { 
  User, 
  Membership, 
  Payment, 
  GymEvent, 
  Feedback, 
  AppNotification, 
  GymSettings, 
  Program, 
  Trainer 
} from '../types.ts';

export const INITIAL_GYM_SETTINGS: GymSettings = {
  name: 'BODY HUB',
  tagline: 'Train. Track. Transform.',
  phone: '+91 891 278 4499',
  email: 'contact@bodyhubfitness.in',
  address: 'Near YSR Statue Back Side, Neelakundilu, Visakhapatnam, Andhra Pradesh 530046, India',
  mapsUrl: 'https://share.google/cgMYsv6QbFgEbtZoa',
  openingHoursWeekdays: '5:30 AM – 10:00 PM',
  openingHoursWeekends: '6:00 AM – 8:30 PM (Sun: 6:00 AM – 1:00 PM)',
  monthlyPlanPrice: 'Enquire for seasonal offer',
  quarterlyPlanPrice: 'Enquire for seasonal offer',
  yearlyPlanPrice: 'Enquire for seasonal offer',
};

export const INITIAL_PROGRAMS: Program[] = [
  {
    id: 'prog-1',
    slug: 'strength',
    title: 'STRENGTH & HYPERTROPHY',
    category: 'Strength',
    tagline: 'Build power, dense muscle and unshakeable confidence.',
    description: 'A scientifically structured progressive overload training protocol utilizing Olympic barbells, calibrated dumbbells, and premium selectorized pin-loaded equipment.',
    duration: '60 - 75 min',
    intensity: 'High',
    suitableFor: 'Athletes, intermediates, and beginners wanting structured hypertrophy and compound lifts.',
    benefits: [
      'Compound movement mastery (Squat, Bench, Deadlift, Overhead Press)',
      'Progressive overload tracking and weekly volume adjustments',
      'Injury prevention techniques and neuromuscular priming',
      'Hypertrophy hypertrophy periodization schedules'
    ],
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop'
  },
  {
    id: 'prog-2',
    slug: 'conditioning',
    title: 'CONDITIONING & HYROX',
    category: 'Conditioning',
    tagline: 'Improve anaerobic stamina, VO2 max and mental grit.',
    description: 'High-energy interval and athletic conditioning fusing sled pushes, skiergs, curved treadmills, and rowing for ultimate cardiovascular efficiency.',
    duration: '45 - 50 min',
    intensity: 'High',
    suitableFor: 'Individuals aiming for metabolic conditioning, fat oxidation, and sports endurance.',
    benefits: [
      'Elevated heart rate variability and aerobic base building',
      'Full body functional circuit conditioning without joint wear',
      'Agility, ladder drills, and rotational core stamina',
      'Metabolic ramp-up for sustained calorie afterburn'
    ],
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1470&auto=format&fit=crop'
  },
  {
    id: 'prog-3',
    slug: 'personal-training',
    title: 'PERSONAL 1-ON-1 COACHING',
    category: 'Personal Training',
    tagline: 'Focused coaching and nutrition strictly built around your personal goals.',
    description: 'Direct dedicated mentorship with Body Hub senior coaches. Includes biomechanical posture assessments, macronutrient budgeting, and 100% focused attention.',
    duration: '60 min',
    intensity: 'Elite',
    suitableFor: 'Busy executives, competitive lifters, posture rehabilitation, or beginners wanting rapid, safe results.',
    benefits: [
      'Customized biometric assessment & movement screening',
      'Periodized nutrition guidance and weekly physique check-ins',
      'Form correction and real-time cadence / velocity cues',
      'Direct WhatsApp access to your assigned Master Coach'
    ],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1470&auto=format&fit=crop'
  },
  {
    id: 'prog-4',
    slug: 'functional-fitness',
    title: 'FUNCTIONAL FITNESS & MOBILITY',
    category: 'Functional Fitness',
    tagline: 'Move better. Eliminate stiffness. Train smarter for longevity.',
    description: 'Restores joint range of motion, scapular rhythm, hip hinge mechanics, and functional stability using kettlebells, suspension rigs, and bodyweight levers.',
    duration: '50 min',
    intensity: 'Medium',
    suitableFor: 'Desk workers with lower back tightness, athletes looking for recovery, and holistic fitness enthusiasts.',
    benefits: [
      'Thoracic spine and hip flexor mobility release',
      'Active recovery protocols that support heavy lifting days',
      'Dynamic balance, unilateral stability, and tendon health',
      'Functional kettlebell swing, snatch, and Turkish getup mastery'
    ],
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470&auto=format&fit=crop'
  }
];

export const INITIAL_TRAINERS: Trainer[] = [
  {
    id: 'tr-1',
    name: 'Vikram Rajput',
    role: 'Head Strength Coach',
    specialization: 'Strength & Conditioning / Powerlifting',
    experience: '8+ Years Experience',
    bio: 'CSCS certified specialist focusing on compound biomechanics and athletic power development.',
    certifications: ['CSCS (NSCA)', 'KBC Level 2 Kettlebell', 'First Aid / CPR'],
    image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=687&auto=format&fit=crop'
  },
  {
    id: 'tr-2',
    name: 'Ananya Deshmukh',
    role: 'Performance Coach',
    specialization: 'Functional Movement & HIIT',
    experience: '6+ Years Experience',
    bio: 'Former collegiate track athlete specializing in metabolic conditioning, mobility, and body recomposition.',
    certifications: ['ACE Certified Personal Trainer', 'Precision Nutrition L1', 'TRX Specialist'],
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=687&auto=format&fit=crop'
  },
  {
    id: 'tr-3',
    name: 'Karthik Varma',
    role: 'Hypertrophy & Rehab Specialist',
    specialization: 'Physique Transformation & Biomechanics',
    experience: '7+ Years Experience',
    bio: 'Blends functional anatomy with high-intensity bodybuilding protocols for aesthetic and pain-free progress.',
    certifications: ['ISSA Master Trainer', 'FMS Functional Movement Screen', 'Sports Nutritionist'],
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=764&auto=format&fit=crop'
  },
  {
    id: 'tr-4',
    name: 'Meera Chawla',
    role: 'Mobility & Conditioning Coach',
    specialization: 'Endurance & Core Conditioning',
    experience: '5+ Years Experience',
    bio: 'Passionate about joint longevity, posture correction, and guiding beginners to cultivate lifelong fitness habits.',
    certifications: ['CrossFit L1', 'Animal Flow Specialist', 'Pilates Mat Instructor'],
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=688&auto=format&fit=crop'
  }
];

export const INITIAL_MEMBERS: User[] = [
  {
    id: 'mem-1',
    name: 'Rahul Kumar',
    mobile: '9876543210',
    username: '9876543210',
    role: 'member',
    firstLogin: false,
    email: 'rahul.kumar@gmail.com',
    emergencyContact: '+91 98765 00111',
    createdAt: '2026-06-15T10:00:00Z',
    updatedAt: '2026-09-01T10:00:00Z'
  },
  {
    id: 'mem-2',
    name: 'Priya Sharma',
    mobile: '9182736452',
    username: '9182736452',
    role: 'member',
    firstLogin: false,
    email: 'priya.sharma@gmail.com',
    createdAt: '2026-05-10T11:00:00Z',
    updatedAt: '2026-08-10T11:00:00Z'
  },
  {
    id: 'mem-3',
    name: 'Arjun Rao',
    mobile: '9012345614',
    username: '9012345614',
    role: 'member',
    firstLogin: false,
    email: 'arjun.rao@gmail.com',
    createdAt: '2026-07-20T08:30:00Z',
    updatedAt: '2026-09-18T08:30:00Z'
  },
  {
    id: 'mem-4',
    name: 'Sneha Patel',
    mobile: '9822334455',
    username: '9822334455',
    role: 'member',
    firstLogin: false,
    email: 'sneha.patel@gmail.com',
    createdAt: '2026-03-01T09:00:00Z',
    updatedAt: '2026-09-01T09:00:00Z'
  },
  {
    id: 'mem-5',
    name: 'Vikram Joshi',
    mobile: '9765432190',
    username: '9765432190',
    role: 'member',
    firstLogin: false,
    email: 'vikram.joshi@gmail.com',
    createdAt: '2026-08-01T07:15:00Z',
    updatedAt: '2026-08-01T07:15:00Z'
  },
  {
    id: 'mem-6',
    name: 'Ananya Reddy',
    mobile: '9440123456',
    username: '9440123456',
    role: 'member',
    firstLogin: true, // New member test
    email: 'ananya.reddy@gmail.com',
    createdAt: '2026-09-15T14:20:00Z',
    updatedAt: '2026-09-15T14:20:00Z'
  },
  {
    id: 'mem-7',
    name: 'Rohan Gupta',
    mobile: '9811223344',
    username: '9811223344',
    role: 'member',
    firstLogin: false,
    email: 'rohan.gupta@gmail.com',
    createdAt: '2026-01-10T12:00:00Z',
    updatedAt: '2026-07-10T12:00:00Z'
  },
  {
    id: 'mem-8',
    name: 'Meera Nair',
    mobile: '9945678901',
    username: '9945678901',
    role: 'member',
    firstLogin: false,
    email: 'meera.nair@gmail.com',
    createdAt: '2026-04-18T16:45:00Z',
    updatedAt: '2026-07-18T16:45:00Z'
  },
  {
    id: 'mem-9',
    name: 'Karthik Iyer',
    mobile: '9820987654',
    username: '9820987654',
    role: 'member',
    firstLogin: false,
    email: 'karthik.iyer@gmail.com',
    createdAt: '2026-06-05T06:30:00Z',
    updatedAt: '2026-09-05T06:30:00Z'
  },
  {
    id: 'mem-10',
    name: 'Pooja Deshmukh',
    mobile: '9731234567',
    username: '9731234567',
    role: 'member',
    firstLogin: false,
    email: 'pooja.d@gmail.com',
    createdAt: '2026-02-14T11:20:00Z',
    updatedAt: '2026-08-14T11:20:00Z'
  },
  {
    id: 'mem-11',
    name: 'Aditya Sen',
    mobile: '9833445566',
    username: '9833445566',
    role: 'member',
    firstLogin: false,
    createdAt: '2026-08-20T10:00:00Z',
    updatedAt: '2026-08-20T10:00:00Z'
  },
  {
    id: 'mem-12',
    name: 'Deepika Menon',
    mobile: '9900112233',
    username: '9900112233',
    role: 'member',
    firstLogin: false,
    createdAt: '2026-05-22T08:00:00Z',
    updatedAt: '2026-08-22T08:00:00Z'
  },
  {
    id: 'mem-13',
    name: 'Suresh Choudhury',
    mobile: '9437123890',
    username: '9437123890',
    role: 'member',
    firstLogin: false,
    createdAt: '2026-07-01T15:30:00Z',
    updatedAt: '2026-07-01T15:30:00Z'
  },
  {
    id: 'mem-14',
    name: 'Divya Singhania',
    mobile: '9845112299',
    username: '9845112299',
    role: 'member',
    firstLogin: false,
    createdAt: '2026-08-12T09:45:00Z',
    updatedAt: '2026-08-12T09:45:00Z'
  },
  {
    id: 'mem-15',
    name: 'Manish Tiwari',
    mobile: '9711882233',
    username: '9711882233',
    role: 'member',
    firstLogin: false,
    createdAt: '2026-03-15T18:10:00Z',
    updatedAt: '2026-06-15T18:10:00Z'
  },
  {
    id: 'mem-16',
    name: 'Neha Agarwal',
    mobile: '9829001144',
    username: '9829001144',
    role: 'member',
    firstLogin: false,
    createdAt: '2026-06-25T11:00:00Z',
    updatedAt: '2026-09-12T11:00:00Z'
  },
  {
    id: 'mem-17',
    name: 'Kunal Malhotra',
    mobile: '9818776655',
    username: '9818776655',
    role: 'member',
    firstLogin: false,
    createdAt: '2026-04-05T07:40:00Z',
    updatedAt: '2026-07-05T07:40:00Z'
  },
  {
    id: 'mem-18',
    name: 'Tanvi Saxena',
    mobile: '9722334411',
    username: '9722334411',
    role: 'member',
    firstLogin: false,
    createdAt: '2026-09-01T13:00:00Z',
    updatedAt: '2026-09-01T13:00:00Z'
  },
  {
    id: 'mem-19',
    name: 'Harsh Vardhan',
    mobile: '9840556677',
    username: '9840556677',
    role: 'member',
    firstLogin: false,
    createdAt: '2026-01-20T17:00:00Z',
    updatedAt: '2026-07-20T17:00:00Z'
  },
  {
    id: 'mem-20',
    name: 'Shalini Nambiar',
    mobile: '9955443322',
    username: '9955443322',
    role: 'member',
    firstLogin: false,
    createdAt: '2026-07-15T10:15:00Z',
    updatedAt: '2026-07-15T10:15:00Z'
  }
];

export const INITIAL_MEMBERSHIPS: Membership[] = [
  {
    id: 'mbr-1',
    memberId: 'mem-1', // Rahul Kumar
    plan: 'Monthly',
    startDate: '2026-09-12',
    expiryDate: '2026-10-12',
    status: 'Active',
    amount: 2500
  },
  {
    id: 'mbr-2',
    memberId: 'mem-2', // Priya Sharma
    plan: 'Quarterly',
    startDate: '2026-07-10',
    expiryDate: '2026-10-10',
    status: 'Active',
    amount: 6500
  },
  {
    id: 'mbr-3',
    memberId: 'mem-3', // Arjun Rao
    plan: 'Monthly',
    startDate: '2026-08-25',
    expiryDate: '2026-09-25',
    status: 'Expiring',
    amount: 2500
  },
  {
    id: 'mbr-4',
    memberId: 'mem-4', // Sneha Patel
    plan: 'Yearly',
    startDate: '2026-03-01',
    expiryDate: '2027-03-01',
    status: 'Active',
    amount: 18000
  },
  {
    id: 'mbr-5',
    memberId: 'mem-5', // Vikram Joshi
    plan: 'Monthly',
    startDate: '2026-08-01',
    expiryDate: '2026-09-01',
    status: 'Expired',
    amount: 2500
  },
  {
    id: 'mbr-6',
    memberId: 'mem-6', // Ananya Reddy
    plan: 'Monthly',
    startDate: '2026-09-15',
    expiryDate: '2026-10-15',
    status: 'Active',
    amount: 2500
  },
  {
    id: 'mbr-7',
    memberId: 'mem-7', // Rohan Gupta
    plan: 'Quarterly',
    startDate: '2026-07-01',
    expiryDate: '2026-10-01',
    status: 'Expiring',
    amount: 6500
  },
  {
    id: 'mbr-8',
    memberId: 'mem-8', // Meera Nair
    plan: 'Monthly',
    startDate: '2026-08-15',
    expiryDate: '2026-09-15',
    status: 'Expired',
    amount: 2500
  },
  {
    id: 'mbr-9',
    memberId: 'mem-9', // Karthik Iyer
    plan: 'Yearly',
    startDate: '2026-01-15',
    expiryDate: '2027-01-15',
    status: 'Active',
    amount: 18000
  },
  {
    id: 'mbr-10',
    memberId: 'mem-10', // Pooja Deshmukh
    plan: 'Quarterly',
    startDate: '2026-08-14',
    expiryDate: '2026-11-14',
    status: 'Active',
    amount: 6500
  },
  {
    id: 'mbr-11',
    memberId: 'mem-11',
    plan: 'Monthly',
    startDate: '2026-08-28',
    expiryDate: '2026-09-28',
    status: 'Expiring',
    amount: 2500
  },
  {
    id: 'mbr-12',
    memberId: 'mem-12',
    plan: 'Quarterly',
    startDate: '2026-08-22',
    expiryDate: '2026-11-22',
    status: 'Active',
    amount: 6500
  },
  {
    id: 'mbr-13',
    memberId: 'mem-13',
    plan: 'Monthly',
    startDate: '2026-07-01',
    expiryDate: '2026-08-01',
    status: 'Expired',
    amount: 2500
  },
  {
    id: 'mbr-14',
    memberId: 'mem-14',
    plan: 'Monthly',
    startDate: '2026-09-10',
    expiryDate: '2026-10-10',
    status: 'Active',
    amount: 2500
  },
  {
    id: 'mbr-15',
    memberId: 'mem-15',
    plan: 'Monthly',
    startDate: '2026-05-15',
    expiryDate: '2026-06-15',
    status: 'Expired',
    amount: 2500
  },
  {
    id: 'mbr-16',
    memberId: 'mem-16',
    plan: 'Quarterly',
    startDate: '2026-07-20',
    expiryDate: '2026-10-20',
    status: 'Active',
    amount: 6500
  },
  {
    id: 'mbr-17',
    memberId: 'mem-17',
    plan: 'Yearly',
    startDate: '2026-04-05',
    expiryDate: '2027-04-05',
    status: 'Active',
    amount: 18000
  },
  {
    id: 'mbr-18',
    memberId: 'mem-18',
    plan: 'Monthly',
    startDate: '2026-09-01',
    expiryDate: '2026-10-01',
    status: 'Expiring',
    amount: 2500
  },
  {
    id: 'mbr-19',
    memberId: 'mem-19',
    plan: 'Yearly',
    startDate: '2026-02-01',
    expiryDate: '2027-02-01',
    status: 'Active',
    amount: 18000
  },
  {
    id: 'mbr-20',
    memberId: 'mem-20',
    plan: 'Quarterly',
    startDate: '2026-07-15',
    expiryDate: '2026-10-15',
    status: 'Active',
    amount: 6500
  }
];

export const INITIAL_PAYMENTS: Payment[] = [
  {
    id: 'pay-1',
    memberId: 'mem-1',
    memberName: 'Rahul Kumar',
    membershipId: 'mbr-1',
    amount: 2500,
    date: '2026-09-12',
    method: 'UPI',
    status: 'Paid',
    receiptNumber: 'BH-REC-2026-0912',
    planName: 'Monthly Membership'
  },
  {
    id: 'pay-2',
    memberId: 'mem-2',
    memberName: 'Priya Sharma',
    membershipId: 'mbr-2',
    amount: 6500,
    date: '2026-07-10',
    method: 'Card',
    status: 'Paid',
    receiptNumber: 'BH-REC-2026-0710',
    planName: 'Quarterly Membership'
  },
  {
    id: 'pay-3',
    memberId: 'mem-4',
    memberName: 'Sneha Patel',
    membershipId: 'mbr-4',
    amount: 18000,
    date: '2026-03-01',
    method: 'Net Banking',
    status: 'Paid',
    receiptNumber: 'BH-REC-2026-0301',
    planName: 'Yearly Membership'
  },
  {
    id: 'pay-4',
    memberId: 'mem-6',
    memberName: 'Ananya Reddy',
    membershipId: 'mbr-6',
    amount: 2500,
    date: '2026-09-15',
    method: 'UPI',
    status: 'Paid',
    receiptNumber: 'BH-REC-2026-0915',
    planName: 'Monthly Membership'
  },
  {
    id: 'pay-5',
    memberId: 'mem-7',
    memberName: 'Rohan Gupta',
    membershipId: 'mbr-7',
    amount: 6500,
    date: '2026-07-01',
    method: 'Cash',
    status: 'Paid',
    receiptNumber: 'BH-REC-2026-0701',
    planName: 'Quarterly Membership'
  },
  {
    id: 'pay-6',
    memberId: 'mem-9',
    memberName: 'Karthik Iyer',
    membershipId: 'mbr-9',
    amount: 18000,
    date: '2026-01-15',
    method: 'UPI',
    status: 'Paid',
    receiptNumber: 'BH-REC-2026-0115',
    planName: 'Yearly Membership'
  },
  {
    id: 'pay-7',
    memberId: 'mem-10',
    memberName: 'Pooja Deshmukh',
    membershipId: 'mbr-10',
    amount: 6500,
    date: '2026-08-14',
    method: 'Card',
    status: 'Paid',
    receiptNumber: 'BH-REC-2026-0814',
    planName: 'Quarterly Membership'
  },
  {
    id: 'pay-8',
    memberId: 'mem-14',
    memberName: 'Divya Singhania',
    membershipId: 'mbr-14',
    amount: 2500,
    date: '2026-09-10',
    method: 'UPI',
    status: 'Paid',
    receiptNumber: 'BH-REC-2026-0910',
    planName: 'Monthly Membership'
  },
  {
    id: 'pay-9',
    memberId: 'mem-3',
    memberName: 'Arjun Rao',
    membershipId: 'mbr-3',
    amount: 2500,
    date: '2026-09-20',
    method: 'UPI',
    status: 'Pending',
    receiptNumber: 'BH-REC-2026-0920',
    planName: 'Renewal (Monthly)'
  },
  {
    id: 'pay-10',
    memberId: 'mem-11',
    memberName: 'Aditya Sen',
    membershipId: 'mbr-11',
    amount: 2500,
    date: '2026-09-19',
    method: 'Card',
    status: 'Failed',
    receiptNumber: 'BH-REC-2026-0919',
    planName: 'Renewal (Monthly)'
  },
  {
    id: 'pay-11',
    memberId: 'mem-17',
    memberName: 'Kunal Malhotra',
    membershipId: 'mbr-17',
    amount: 18000,
    date: '2026-04-05',
    method: 'Net Banking',
    status: 'Paid',
    receiptNumber: 'BH-REC-2026-0405',
    planName: 'Yearly Membership'
  },
  {
    id: 'pay-12',
    memberId: 'mem-19',
    memberName: 'Harsh Vardhan',
    membershipId: 'mbr-19',
    amount: 18000,
    date: '2026-02-01',
    method: 'Card',
    status: 'Paid',
    receiptNumber: 'BH-REC-2026-0201',
    planName: 'Yearly Membership'
  }
];

export const INITIAL_EVENTS: GymEvent[] = [
  {
    id: 'ev-1',
    title: 'Autumn Strength Challenge & Max Deadlift Clinic',
    description: 'Test your 1RM, learn kinematic bar path mechanics, and celebrate community lifting milestones with Body Hub coaches.',
    category: 'Challenges',
    date: '2026-10-04',
    time: '07:00 AM – 11:30 AM',
    location: 'Main Lifting Arena, Body Hub',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1000&auto=format&fit=crop',
    status: 'Published',
    maxCapacity: 35,
    registeredMembers: ['mem-1', 'mem-3', 'mem-7', 'mem-9'],
    createdAt: '2026-09-10T10:00:00Z'
  },
  {
    id: 'ev-2',
    title: 'Kettlebell Flow & Shoulder Longevity Workshop',
    description: 'An interactive seminar breaking down thoracic extension, rotator cuff stabilization, and rotational Turkish get-ups.',
    category: 'Workshops',
    date: '2026-10-12',
    time: '05:30 PM – 07:30 PM',
    location: 'Functional Studio, Body Hub',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1000&auto=format&fit=crop',
    status: 'Published',
    maxCapacity: 25,
    registeredMembers: ['mem-2', 'mem-4', 'mem-6'],
    createdAt: '2026-09-12T10:00:00Z'
  },
  {
    id: 'ev-3',
    title: 'Sunday Morning Beach Run & Conditioning Mixer',
    description: 'Outdoor aerobic endurance session followed by protein smoothie hydration and coach Q&A by the shoreline.',
    category: 'Community',
    date: '2026-10-18',
    time: '06:00 AM – 08:00 AM',
    location: 'RK Beach Promenade (Meeting point: Body Hub)',
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=1000&auto=format&fit=crop',
    status: 'Published',
    maxCapacity: 50,
    registeredMembers: ['mem-1', 'mem-2', 'mem-5', 'mem-10'],
    createdAt: '2026-09-14T10:00:00Z'
  },
  {
    id: 'ev-4',
    title: 'Hyrox Simulation: Stamina & Sled Sprint Time Trial',
    description: 'Timed multi-station endurance circuit: 1km run, 50m sled push, 1000m row, 80m burpee broad jumps.',
    category: 'Fitness',
    date: '2026-10-25',
    time: '06:30 AM – 09:30 AM',
    location: 'Conditioning Turf, Body Hub',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop',
    status: 'Published',
    maxCapacity: 30,
    registeredMembers: ['mem-7', 'mem-11'],
    createdAt: '2026-09-15T10:00:00Z'
  },
  {
    id: 'ev-5',
    title: 'Nutrition for Lean Mass & Recovery Masterclass',
    description: 'Demystifying macro tracking, creatine timing, circadian sleep rhythm, and realistic Indian diet meal plans.',
    category: 'Workshops',
    date: '2026-11-02',
    time: '06:00 PM – 07:30 PM',
    location: 'Lounge & Seminar Room',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1000&auto=format&fit=crop',
    status: 'Published',
    maxCapacity: 40,
    registeredMembers: ['mem-1', 'mem-4'],
    createdAt: '2026-09-16T10:00:00Z'
  },
  {
    id: 'ev-6',
    title: 'Winter Intra-Gym Bench Press Showdown',
    description: 'Friendly internal gym power competition with weight classes, certified judges, and performance gear prizes.',
    category: 'Challenges',
    date: '2026-11-15',
    time: '04:00 PM – 08:00 PM',
    location: 'Power Cage Zone',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1000&auto=format&fit=crop',
    status: 'Draft',
    maxCapacity: 20,
    registeredMembers: [],
    createdAt: '2026-09-18T10:00:00Z'
  }
];

export const INITIAL_FEEDBACK: Feedback[] = [
  {
    id: 'fb-1',
    memberId: 'mem-1',
    memberName: 'Rahul Kumar',
    rating: 5,
    category: 'Equipment',
    comment: 'The calibrated plates and Eleiko barbells are top notch. By far the cleanest lifting atmosphere in town.',
    date: '2026-09-18',
    reviewed: true
  },
  {
    id: 'fb-2',
    memberId: 'mem-2',
    memberName: 'Priya Sharma',
    rating: 5,
    category: 'Trainers',
    comment: 'Coach Vikram helped fix my squat knee valgus in just two sessions. The staff genuinely cares about safe technique.',
    date: '2026-09-17',
    reviewed: true
  },
  {
    id: 'fb-3',
    memberId: 'mem-4',
    memberName: 'Sneha Patel',
    rating: 5,
    category: 'Cleanliness',
    comment: 'Locker rooms and shower areas are consistently sanitised throughout the day. Very respectful and safe vibe for women.',
    date: '2026-09-14',
    reviewed: true
  },
  {
    id: 'fb-4',
    memberId: 'mem-3',
    memberName: 'Arjun Rao',
    rating: 4,
    category: 'Overall',
    comment: 'Outstanding gym vibe! Would love if we could add one more cable crossover station for peak evening hours (6:30 PM).',
    date: '2026-09-12',
    reviewed: true
  },
  {
    id: 'fb-5',
    memberId: 'mem-7',
    memberName: 'Rohan Gupta',
    rating: 5,
    category: 'Staff',
    comment: 'Front desk team is always courteous. Digital check-in and membership management makes everything seamless.',
    date: '2026-09-10',
    reviewed: true
  },
  {
    id: 'fb-6',
    memberId: 'mem-9',
    memberName: 'Karthik Iyer',
    rating: 5,
    category: 'Trainers',
    comment: 'Trainer Ananya is exceptional with conditioning circuits. Lost 4kg in two months while getting significantly stronger.',
    date: '2026-09-08',
    reviewed: true
  },
  {
    id: 'fb-7',
    memberId: 'mem-10',
    memberName: 'Pooja Deshmukh',
    rating: 5,
    category: 'Equipment',
    comment: 'Love the turf area with the prowler sled. It really differentiates Body Hub from other commercial gym franchises.',
    date: '2026-09-05',
    reviewed: true
  },
  {
    id: 'fb-8',
    memberId: 'mem-14',
    memberName: 'Divya Singhania',
    rating: 5,
    category: 'Overall',
    comment: 'Great air conditioning, energetic playlist that is not obnoxiously loud, and serious lifters who re-rack their weights.',
    date: '2026-09-03',
    reviewed: true
  },
  {
    id: 'fb-9',
    memberId: 'mem-11',
    memberName: 'Aditya Sen',
    rating: 4,
    category: 'Cleanliness',
    comment: 'Clean towels provided upon entry is a thoughtful touch. Spotless chalk stands.',
    date: '2026-08-28',
    reviewed: true
  },
  {
    id: 'fb-10',
    memberId: 'mem-17',
    memberName: 'Kunal Malhotra',
    rating: 5,
    category: 'Overall',
    comment: 'Body Hub is hands down the best fitness facility. Premium culture without any elitist attitude.',
    date: '2026-08-20',
    reviewed: true
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    memberId: 'mem-1',
    title: 'Membership Renewal Warning',
    message: 'Your Monthly Membership will expire in 21 days (12 Oct 2026). Keep your training streak uninterrupted.',
    type: 'expiry',
    read: false,
    createdAt: '2026-09-20T08:00:00Z',
    actionUrl: '/member/membership'
  },
  {
    id: 'notif-2',
    memberId: 'all',
    title: 'New Event: Autumn Deadlift Clinic Announced',
    message: 'Registrations are now open for the Autumn Strength & Deadlift Clinic on Oct 4th.',
    type: 'event',
    read: false,
    createdAt: '2026-09-19T10:30:00Z',
    actionUrl: '/member/events'
  },
  {
    id: 'notif-3',
    memberId: 'mem-1',
    title: 'Payment Receipt Available',
    message: 'Payment of ₹2,500 via UPI (BH-REC-2026-0912) recorded successfully.',
    type: 'payment',
    read: true,
    createdAt: '2026-09-12T11:00:00Z',
    actionUrl: '/member/payments'
  },
  {
    id: 'notif-4',
    memberId: 'all',
    title: 'Holiday Schedule Announcement',
    message: 'Gym hours for upcoming public holiday: 6:00 AM to 1:00 PM. Evening slots will resume next morning.',
    type: 'announcement',
    read: true,
    createdAt: '2026-09-10T14:00:00Z'
  },
  {
    id: 'notif-5',
    memberId: 'mem-3',
    title: 'Urgent: Membership Expiring in 4 Days',
    message: 'Your membership expires on 25 Sep 2026. Please renew to retain locker access and member perks.',
    type: 'expiry',
    read: false,
    createdAt: '2026-09-21T07:00:00Z',
    actionUrl: '/member/membership'
  }
];
