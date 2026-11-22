import type { Note, NoteData, NoteTag } from '@/types/note';
import { api } from './api';
import { User } from '@/types/user';

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export type LoginRequest = RegisterRequest;

interface UpdateMeRequest {
  username: string;
}

interface CheckSessionResponse {
  success: boolean;
}

export async function fetchNotes(
  page: number,
  search?: string,
  tag?: NoteTag
): Promise<FetchNotesResponse> {
  const { data } = await api.get<FetchNotesResponse>('/notes', {
    params: { page, search, perPage: 12, tag },
  });
  return data;
}
export async function createNote(noteData: NoteData): Promise<Note> {
  const { data } = await api.post<Note>('/notes', noteData);
  return data;
}
export async function deleteNote(id: string): Promise<Note> {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
}

export async function register(userData: RegisterRequest): Promise<User> {
  const { data } = await api.post<User>('/auth/register', userData);
  return data;
}
export async function login(userData: LoginRequest): Promise<User> {
  const { data } = await api.post<User>('/auth/login', userData);
  return data;
}
export async function logout(): Promise<void> {
  await api.post('/auth/logout');
}

export async function checkSession(): Promise<boolean> {
  const { data } = await api.get<CheckSessionResponse>('/auth/session');
  return data.success;
}

export async function getMe(): Promise<User> {
  const { data } = await api.get<User>('/users/me');
  return data;
}

export async function updateMe(userData: UpdateMeRequest): Promise<User> {
  const { data } = await api.patch<User>('/users/me', userData);
  return data;
}
