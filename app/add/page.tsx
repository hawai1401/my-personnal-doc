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

export default function AddPage() {
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

              await prisma.docFunction.create({
                data: { name, description, codeExample, language },
              });
            }}>
            <FieldSet className='space-y-6'>
              <Field>
                <FieldLabel htmlFor='name'>Nom de la fonction</FieldLabel>
                <Input id='name' name='name' placeholder='useMemo()' required />
              </Field>

              <Field>
                <FieldLabel htmlFor='description'>Description</FieldLabel>
                <Input
                  id='description'
                  name='description'
                  placeholder='À quoi sert cette fonction ?'
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor='language'>
                  Langage de programmation
                </FieldLabel>
                <Select name='language' required>
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
                <CodeEditorInput />
              </Field>

              <FormButton
                value={'Ajouter'}
                displayStatus
                message={{
                  loading: 'Enregistrement en cours...',
                  success: 'Enregistré avec succès !',
                }}
              />
            </FieldSet>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
