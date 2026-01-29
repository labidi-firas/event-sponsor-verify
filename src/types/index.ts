export type UserRole = 'laboratory' | 'organizer' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  laboratoryName?: string;
}

export interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  participantCount: number;
  status: 'active' | 'upcoming' | 'completed';
}

export interface Participant {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  identityCard: string;
  email: string;
  specialty: string;
}

export interface Sponsorship {
  id: string;
  eventId: string;
  laboratoryId: string;
  participant: Participant;
  status: 'validated' | 'pending' | 'rejected';
  similarityScore: number;
  matchedParticipant?: Participant;
  matchDetails?: MatchDetails;
  createdAt: string;
}

export interface MatchDetails {
  nameScore: number;
  dateOfBirthScore: number;
  identityCardScore: number;
  overallScore: number;
  explanation: string;
}

export interface DashboardStats {
  totalDeclared: number;
  validated: number;
  pending: number;
  rejected: number;
  averageScore: number;
  validationRate: number;
}

export interface Activity {
  id: string;
  type: 'declaration' | 'validation' | 'rejection' | 'import';
  description: string;
  timestamp: string;
  participantName?: string;
}
