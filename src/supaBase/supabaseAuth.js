import { supabase } from './supabaseClient';
import bcrypt from 'bcryptjs';

// REGISTRAZIONE
export async function registerUser({ username, password, dimensions, securityQuestion, securityAnswer }) {
  const password_hash = await bcrypt.hash(password, 10);
  const security_answer_hash = await bcrypt.hash(securityAnswer, 10);
  const { data, error } = await supabase
    .from('users')
    .insert([{
      username,
      password_hash,
      dimensions: dimensions || {},
      security_question: securityQuestion,
      security_answer_hash
    }])
    .select()
    .single();
  return { data, error };
}

// LOGIN
export async function loginUser({ username, password }) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .single();
  if (error || !data) return { error: 'Utente non trovato' };
  const valid = await bcrypt.compare(password, data.password_hash);
  if (!valid) return { error: 'Password errata' };
  // Non salvare più userId/username in localStorage
  return { data };
}

// LOGOUT
export async function logoutUser() {
  // Non serve più cancellare localStorage
  return { error: null };
}

// Get current user
export async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    if (!user) return { data: null, error: null };

    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('username')
      .eq('id', user.id)
      .single();

    if (profileError) throw profileError;

    return { data: { ...user, ...profile }, error: null };
  } catch (error) {
    console.error('Error in getCurrentUser:', error);
    return { data: null, error };
  }
}

// RECUPERO DIMENSIONI
export async function getUserDimensions(userId) {
  const { data, error } = await supabase
    .from('users')
    .select('dimensions')
    .eq('id', userId)
    .single();
  return { data, error };
}

// AGGIORNA DIMENSIONI
export async function updateUserDimensions(userId, dimensions) {
  const { data, error } = await supabase
    .from('users')
    .update({ dimensions })
    .eq('id', userId);
  return { data, error };
} 