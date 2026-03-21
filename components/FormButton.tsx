'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import { VariantProps } from 'class-variance-authority';
import { ComponentProps, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { toast } from 'sonner';

export default function FormButton({
  value,
  displayStatus,
  message,
  variant,
  type,
  ...props
}: {
  value: string;
  displayStatus?: boolean | undefined;
  message?:
    | {
        loading: string;
        success: string;
      }
    | undefined;
} & ComponentProps<'button'> &
  VariantProps<typeof buttonVariants>) {
  const { pending } = useFormStatus();

  const wasPending = useRef(false);

  useEffect(() => {
    if (!displayStatus || !message) return;
    if (pending && !wasPending.current) {
      toast.loading(message.loading, {
        id: 'submit-personnal-data-form',
      });
      wasPending.current = true;
    }

    if (!pending && wasPending.current) {
      toast.success(message.success, {
        id: 'submit-personnal-data-form',
      });
      wasPending.current = false;
    }
  }, [displayStatus, message, pending]);

  return (
    <Button
      type={type}
      variant={variant}
      className={cn('cursor-pointer', pending ? 'animate-pulse' : '')}
      onClick={(e) => {
        if (pending || wasPending.current) e.preventDefault();
      }}
      {...props}>
      {pending ? <Spinner /> : value}
    </Button>
  );
}
