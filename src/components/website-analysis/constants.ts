import { 
  Target, 
  Wallet, 
  Clock, 
  Building2, 
  Contact,
  User,
  Globe,
  Goal,
  Rocket,
  LineChart,
  Smartphone,
  PenTool,
  Plus
} from 'lucide-react';
import { Step, GoalType, TimeOption } from './types';

export const steps: Step[] = [
  { number: 1, icon: Target, title: 'Ziele' },
  { number: 2, icon: Wallet, title: 'Budget' },
  { number: 3, icon: Clock, title: 'Zeitplan' },
  { number: 4, icon: Building2, title: 'Unternehmen' },
  { number: 5, icon: Contact, title: 'Kontakt' }
];

export const goals: GoalType[] = [
  { id: 'more-customers', label: 'Mehr Kunden gewinnen', icon: Target },
  { id: 'more-employees', label: 'Mitarbeiter finden', icon: User },
  { id: 'better-presence', label: 'Bessere Online-Präsenz', icon: Globe },
  { id: 'digitalization', label: 'Digitalisierung', icon: Goal },
  { id: 'relaunch', label: 'Website Relaunch', icon: Rocket },
  { id: 'analytics', label: 'Bessere Analytics', icon: LineChart },
  { id: 'mobile', label: 'Mobile Optimierung', icon: Smartphone },
  { id: 'design', label: 'Neues Design', icon: PenTool },
  { id: 'other', label: 'Andere Ziele', icon: Plus }
];

export const timeOptions: TimeOption[] = [
  { id: 'asap', label: 'So schnell wie möglich' },
  { id: '1-month', label: 'Innerhalb eines Monats' },
  { id: '3-months', label: 'In den nächsten 3 Monaten' },
  { id: 'planning', label: 'Noch in der Planungsphase' }
];

export const slideVariants = {
  enter: { x: 50, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -50, opacity: 0 }
};