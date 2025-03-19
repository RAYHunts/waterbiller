import { supabase } from '@/utils/supabase';

export const updateUser = async (data: any) => {
  const { data: user, error } = await supabase.auth.updateUser({
    data: {
      first_name: 'John',
      last_name: 'Doe',
      address: '123 Main St',
      phone_number: '555-555-5555',
      avatar_url: 'https://picsum.photos/100',
    },
  });

  if (error) return Promise.reject(error);
  return Promise.resolve(user);
};