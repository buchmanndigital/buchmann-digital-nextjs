'use client';

import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export function BackButton() {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      onClick={() => router.push('/')}
      className="mb-8 hover:bg-gray-200"
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      Zurück
    </Button>
  );
}