'use client';

import Image from 'next/image';
import css from './EditProfilePage.module.css';
import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';
import { updateMe } from '@/lib/api/clientApi';
import { isAxiosError } from 'axios';
import { useState } from 'react';

const EditProfile = () => {
  const user = useAuthStore(state => state.user);
  const setUser = useAuthStore(state => state.setUser);
  const [error, setError] = useState('');

  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    try {
      const username = formData.get('username') as string;
      const updated = await updateMe({ username });
      setUser(updated);
      router.push('/profile');
    } catch (error) {
      setError(
        isAxiosError(error)
          ? (error.response?.data?.error ?? error.message)
          : 'Oops... some error'
      );
    }
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        {user ? (
          <>
            <Image
              src={user.avatar}
              alt="User Avatar"
              width={120}
              height={120}
              className={css.avatar}
            />

            <form className={css.profileInfo} action={handleSubmit}>
              <div className={css.usernameWrapper}>
                <label htmlFor="username">Username:</label>
                <input
                  id="username"
                  type="text"
                  className={css.input}
                  defaultValue={user.username}
                  name="username"
                />
              </div>

              <p>Email: {user.email}</p>

              <div className={css.actions}>
                <button type="submit" className={css.saveButton}>
                  Save
                </button>
                <button
                  type="button"
                  className={css.cancelButton}
                  onClick={() => router.push('/profile')}
                >
                  Cancel
                </button>
              </div>
              {error && <p>{error}</p>}
            </form>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </main>
  );
};

export default EditProfile;
