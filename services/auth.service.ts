import { api } from '@/lib/axios';

interface LoginDto {
  email: string;
  password: string;
}

export const authService = {
  async login(data: LoginDto) {
    const response = await api.post('/login', data);

    const token = response.data.access_token ?? response.data.accessToken;
    let user = response.data.user ?? null;

    if (!user && token) {
      // fetch profile using Authorization header with the token
      const profileRes = await api.get('/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      user = profileRes.data;
    }

    return { accessToken: token, user };
  },


  async profile() {
    const response = await api.get('/profile');

    return response.data;
  },

  async logout() {
    await api.post('/logout');
  },
};