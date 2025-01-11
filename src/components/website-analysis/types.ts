import { LucideIcon } from 'lucide-react';

export interface FormData {
  websiteUrl: string;
  companyName: string;
  industry: string;
  mainGoals: string[];
  customGoals: string[];
  budget: number;
  timeline: string;
  name: string;
  email: string;
  phone: string;
}

export interface Step {
  number: number;
  icon: LucideIcon;
  title: string;
}

export interface GoalType {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface TimeOption {
  id: string;
  label: string;
}