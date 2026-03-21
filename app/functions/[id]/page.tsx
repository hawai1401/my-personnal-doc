import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Pencil, ArrowLeft, Calendar } from 'lucide-react';
import { Field, FieldLabel, FieldSet } from '@/components/ui/field';
import prisma from '@/lib/prisma';
import CodeEditor from '@/components/CodeEditor';
import { Badge } from '@/components/ui/badge';

export async function generateStaticParams() {
  return await prisma.docFunction.findMany({
    select: {
      id: true,
    },
  });
}

export default async function FunctionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const fn = await prisma.docFunction.findUnique({
    where: { id },
  });

  if (!fn) notFound();

  return (
    <main className='p-10 max-w-5xl mx-auto space-y-8'>
      <div className='flex justify-between items-center'>
        <Button asChild variant='ghost' size='sm'>
          <Link href='/'>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Retour à la bibliothèque
          </Link>
        </Button>

        <Button asChild variant='default' size='sm'>
          <Link href={`/functions/${fn.id}/edit`}>
            <Pencil className='mr-2 h-4 w-4' />
            Modifier la fiche
          </Link>
        </Button>
      </div>

      <FieldSet>
        <div className='space-y-4 border-b pb-6'>
          <div className='flex items-center gap-3'>
            <h1 className='text-4xl font-bold font-mono tracking-tight'>
              {fn.name}
            </h1>
            <Badge variant='secondary' className='uppercase'>
              {fn.language}
            </Badge>
          </div>

          <p className='text-xl text-muted-foreground leading-relaxed'>
            {fn.description}
          </p>

          <div className='flex items-center text-sm text-muted-foreground italic'>
            <Calendar className='mr-2 h-4 w-4' />
            Dernière mise à jour le{' '}
            {new Date(fn.updatedAt).toLocaleDateString('fr-FR')}
          </div>
        </div>

        <div className='pt-6'>
          <Field>
            <FieldLabel className='text-lg mb-4 block'>
              Implémentation & Usage
            </FieldLabel>
            <CodeEditor
              value={fn.codeExample}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                automaticLayout: true,
                padding: { top: 16, bottom: 16 },
                readOnly: true,
                lineNumbers: 'off',
                scrollbar: {
                  verticalScrollbarSize: 4,
                },
              }}
            />
          </Field>
        </div>
      </FieldSet>
    </main>
  );
}
