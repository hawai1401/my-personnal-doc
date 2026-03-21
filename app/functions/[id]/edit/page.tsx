import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Field, FieldLabel, FieldSet } from '@/components/ui/field';
import prisma from '@/lib/prisma';
import { Language } from '@/prisma/generated/prisma/enums';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import CodeEditorInput from '@/components/CodeEditorInput';
import FormButton from '@/components/FormButton';
import { revalidatePath } from 'next/cache';
import { notFound, redirect } from 'next/navigation';

export async function generateStaticParams() {
  return await prisma.docFunction.findMany({
    select: {
      id: true,
    },
  });
}

export default async function AddPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const fn = await prisma.docFunction.findUnique({
    where: { id },
    select: {
      name: true,
      description: true,
      language: true,
      codeExample: true,
    },
  });
  if (!fn) return notFound();

  return (
    <main className='w-full p-10 mx-auto'>
      <Button asChild variant='ghost' className='mb-4'>
        <Link href='/'>
          <ArrowLeft size={16} className='mr-2' />
          Retour
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Nouvelle documentation</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            action={async (formData) => {
              'use server';

              const name = formData.get('name') as string;
              const description = formData.get('description') as string;
              const codeExample = formData.get('codeExample') as string;
              const language = formData.get('language') as Language;

              await prisma.docFunction.update({
                where: { id },
                data: { name, description, codeExample, language },
              });

              revalidatePath('/');
              revalidatePath(`/functions/${id}`);
              revalidatePath(`/functions/${id}/edit`);
              redirect(`/functions/${id}?success=true`);
            }}>
            <FieldSet className='space-y-6'>
              <Field>
                <FieldLabel htmlFor='name'>Nom de la fonction</FieldLabel>
                <Input
                  id='name'
                  name='name'
                  defaultValue={fn.name}
                  placeholder='useMemo()'
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor='description'>Description</FieldLabel>
                <Input
                  id='description'
                  name='description'
                  defaultValue={fn.description}
                  placeholder='À quoi sert cette fonction ?'
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor='language'>
                  Langage de programmation
                </FieldLabel>
                <Select name='language' defaultValue={fn.language} required>
                  <SelectTrigger id='language'>
                    <SelectValue placeholder='Choisir un langage' />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(Language).map((lang) => (
                      <SelectItem key={lang} value={lang}>
                        {lang.charAt(0) + lang.slice(1).toLowerCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <FieldLabel>Code Source</FieldLabel>
                <CodeEditorInput defaultValue={fn.codeExample} />
              </Field>

              <FormButton
                value={'Modifier'}
                displayStatus
                message={{
                  loading: 'Modification en cours...',
                  success: 'Modifié avec succès !',
                }}
              />
            </FieldSet>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
