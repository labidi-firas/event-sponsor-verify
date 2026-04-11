export interface Event {
  id: string;
  nom: string;
  dateDebut: string;
  dateFin: string;
  location: string | { address?: string; city?: string; name?: string };
  status: 'PUBLISHED' | 'DRAFT' | 'COMPLETED' | 'CANCELLED';
  participantCount: number;
  image?: string;
  description?: string;
  category?: string;
}

const mockEvents: Event[] = [
  {
    id: 'evt-001',
    nom: 'International Cardiology Congress 2025',
    dateDebut: '2025-09-15',
    dateFin: '2025-09-18',
    location: 'Sheraton Hotel, Algiers',
    status: 'PUBLISHED',
    participantCount: 342,
    category: 'Cardiology',
    description: 'Annual gathering of leading cardiologists.',
  },
  {
    id: 'evt-002',
    nom: 'Dermatology & Aesthetic Medicine Forum',
    dateDebut: '2025-10-05',
    dateFin: '2025-10-07',
    location: 'Hilton Hotel, Oran',
    status: 'PUBLISHED',
    participantCount: 218,
    category: 'Dermatology',
  },
  {
    id: 'evt-003',
    nom: 'Oncology Research Symposium',
    dateDebut: '2025-11-12',
    dateFin: '2025-11-14',
    location: 'Convention Center, Constantine',
    status: 'PUBLISHED',
    participantCount: 187,
    category: 'Oncology',
  },
  {
    id: 'evt-004',
    nom: 'Pediatrics Annual Conference',
    dateDebut: '2025-08-20',
    dateFin: '2025-08-22',
    location: 'Marriott Hotel, Algiers',
    status: 'PUBLISHED',
    participantCount: 156,
    category: 'Pediatrics',
  },
  {
    id: 'evt-005',
    nom: 'Neuroscience Innovation Summit',
    dateDebut: '2025-12-01',
    dateFin: '2025-12-03',
    location: 'Sofitel Hotel, Algiers',
    status: 'PUBLISHED',
    participantCount: 290,
    category: 'Neuroscience',
  },
  {
    id: 'evt-006',
    nom: 'Emergency Medicine Workshop',
    dateDebut: '2025-07-10',
    dateFin: '2025-07-11',
    location: 'CHU Mustapha, Algiers',
    status: 'PUBLISHED',
    participantCount: 124,
    category: 'Emergency Medicine',
  },
  {
    id: 'evt-007',
    nom: 'Surgical Techniques Masterclass',
    dateDebut: '2026-01-15',
    dateFin: '2026-01-17',
    location: 'Medical University, Tlemcen',
    status: 'DRAFT',
    participantCount: 0,
    category: 'Surgery',
  },
  {
    id: 'evt-008',
    nom: 'Ophthalmology Update 2025',
    dateDebut: '2025-06-01',
    dateFin: '2025-06-02',
    location: 'Grand Hotel, Annaba',
    status: 'COMPLETED',
    participantCount: 198,
    category: 'Ophthalmology',
  },
  {
    id: 'evt-009',
    nom: 'Gastroenterology & Hepatology Days',
    dateDebut: '2025-10-20',
    dateFin: '2025-10-22',
    location: 'Hyatt Regency, Algiers',
    status: 'PUBLISHED',
    participantCount: 167,
    category: 'Gastroenterology',
  },
];

export async function getAllEvents(params?: { limit?: number; status?: string }): Promise<{ events: Event[] }> {
  await new Promise(resolve => setTimeout(resolve, 600));
  let filtered = [...mockEvents];
  if (params?.status) {
    filtered = filtered.filter(e => e.status === params.status);
  }
  if (params?.limit) {
    filtered = filtered.slice(0, params.limit);
  }
  return { events: filtered };
}
