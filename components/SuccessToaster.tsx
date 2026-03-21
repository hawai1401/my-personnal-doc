'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';

export default function SuccessToast({ message }: { message: string }) {
  useEffect(() => {
    toast.success(message, {
      id: 'submit-personnal-data-form',
    });
  });
  return null;
}
