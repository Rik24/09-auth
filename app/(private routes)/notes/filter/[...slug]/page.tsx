import { fetchNotes } from '@/lib/api/serverApi';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { NoteTag } from '@/types/note';
import { Metadata } from 'next';

interface NotesProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: NotesProps): Promise<Metadata> {
  const { slug } = await params;
  const filter = slug[0] === 'all' ? 'All notes' : `${slug[0]} notes`;

  return {
    title: `${filter} | NoteHub`,
    description: `Browse ${filter.toLowerCase()} in NoteHub`,
    openGraph: {
      title: `${filter} | NoteHub`,
      description: `Browse ${filter.toLowerCase()} in NoteHub`,
      url: `https://notehub.com/notes/filter/${slug.join('/')}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: filter,
        },
      ],
    },
  };
}

export default async function Notes({ params }: NotesProps) {
  const { slug } = await params;

  const tag = slug[0] === 'all' ? undefined : (slug[0] as NoteTag);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', tag],
    queryFn: () => fetchNotes(1, '', tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
