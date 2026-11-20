'use client';

import { useQuery } from '@tanstack/react-query';
import css from './NotePreview.module.css';
import { useParams, useRouter } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';

export default function NotePreviewClient() {
  const { id } = useParams<{ id: string }>();

  const router = useRouter();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  return (
    <Modal onClose={() => router.back()}>
      {isError && <p>Something went wrong.</p>}
      {isLoading && <p>Loading, please wait...</p>}
      {note && (
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
              <button onClick={() => router.back()} className={css.backBtn}>
                Back
              </button>
            </div>
            <p className={css.tag}>{note.tag}</p>
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>{note.createdAt}</p>
          </div>
        </div>
      )}
    </Modal>
  );
}
