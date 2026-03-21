import { revalidatePath } from 'next/cache';
import { Button } from './ui/button';
import { Trash } from 'lucide-react';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';

export default function DeleteButtonForm({ id }: { id: string }) {
  return (
    <form
      action={async () => {
        'use server';

        await prisma.docFunction.delete({
          where: { id },
        });

        revalidatePath('/');
        revalidatePath(`/functions/${id}`);
        revalidatePath(`/functions/${id}/edit`);
        redirect('/');
      }}>
      <Button variant='destructive' type='submit' size='sm'>
        <Trash size={16} />
        Supprimer
      </Button>
    </form>
  );
}
