import Link from 'next/link';
import prisma from '@/lib/prisma';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { PlusCircle, Eye } from 'lucide-react';
import DeleteButtonForm from '@/components/DeleteButtonForm';

export default async function Home() {
  const functions = await prisma.docFunction.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className='flex flex-col items-center justify-center p-10'>
      <div className='w-full flex justify-between items-center mb-8'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Ma Doc Interne</h1>
          <p className='text-muted-foreground'>
            Liste des fonctions et utilitaires du projet.
          </p>
        </div>
        <Button asChild>
          <Link href='/add'>
            <PlusCircle size={16} />
            Ajouter une fonction
          </Link>
        </Button>
      </div>

      <div className='w-full border rounded-md'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-50'>Fonction</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className='text-right'>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {functions.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className='text-center py-10 text-muted-foreground'>
                  Aucune fonction enregistrée.
                </TableCell>
              </TableRow>
            ) : (
              functions.map((fn) => (
                <TableRow key={fn.id}>
                  <TableCell className='font-mono font-medium'>
                    {fn.name}
                  </TableCell>
                  <TableCell className='max-w-md truncate'>
                    {fn.description}
                  </TableCell>
                  <TableCell className='text-right flex gap-2 justify-end'>
                    <Button variant='outline' size='sm' asChild>
                      <Link href={`/functions/${fn.id}`}>
                        <Eye size={16} />
                        Voir
                      </Link>
                    </Button>
                    <DeleteButtonForm id={fn.id} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
