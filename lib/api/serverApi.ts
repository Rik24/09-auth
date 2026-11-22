import type { Note, NoteTag } from '@/types/note';
import { api } from './api';
import { cookies } from 'next/headers';
import { User } from '@/types/user';
import { AxiosResponse } from 'axios';

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface CheckSessionResponse {
  success: boolean;
}

export async function fetchNotes(
  page: number,
  search?: string,
  tag?: NoteTag
): Promise<FetchNotesResponse> {
  const cookieStore = await cookies();

  const { data } = await api.get<FetchNotesResponse>('/notes', {
    params: { page, search, perPage: 12, tag },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}
export async function fetchNoteById(id: string): Promise<Note> {
  const cookieStore = await cookies();

  const { data } = await api.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}

export async function checkSession(): Promise<
  AxiosResponse<CheckSessionResponse>
> {
  const cookieStore = await cookies();

  const res = await api.get<CheckSessionResponse>('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
}

export async function getMe(): Promise<User> {
  const cookieStore = await cookies();

  const { data } = await api.get<User>('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}
