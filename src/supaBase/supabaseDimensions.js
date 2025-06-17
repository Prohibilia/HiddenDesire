import { supabase } from './supabaseClient';

export async function upsertUserDimensions(userId, values) {
  try {
    // Ensure values are numbers and within valid range
    const dimensions = values.map(v => {
      const num = Number(v);
      return isNaN(num) ? 0 : Math.max(0, Math.min(100, num));
    });

    const { data, error } = await supabase
      .from('dimensions7')
      .upsert({
        user_id: userId,
        dimension_1: dimensions[0],
        dimension_2: dimensions[1],
        dimension_3: dimensions[2],
        dimension_4: dimensions[3],
        dimension_5: dimensions[4],
        dimension_6: dimensions[5],
        dimension_7: dimensions[6]
      })
      .select()
      .single();

    if (error) {
      console.error('Error upserting dimensions:', error);
      throw error;
    }

    return { data, error: null };
  } catch (error) {
    console.error('Error in upsertUserDimensions:', error);
    return { data: null, error };
  }
}

export async function getUserDimensions7(userId) {
  try {
    const { data, error } = await supabase
      .from('dimensions7')
      .select('dimension_1, dimension_2, dimension_3, dimension_4, dimension_5, dimension_6, dimension_7')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error fetching dimensions:', error);
      throw error;
    }

    return { data, error: null };
  } catch (error) {
    console.error('Error in getUserDimensions7:', error);
    return { data: null, error };
  }
} 