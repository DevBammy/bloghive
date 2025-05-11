import { supabase } from '@/lib/supabaseClient';

export async function uploadImage(file) {
  const filePath = `findit/${Date.now()}-${file.name}`;

  const { data, error } = await supabase.storage
    .from('blogs')
    .upload(filePath, file);

  if (error) {
    console.error('Upload error:', error);
    return null;
  }

  // Get the public URL of the uploaded image
  const { data: urlData } = supabase.storage
    .from('blogs')
    .getPublicUrl(filePath);

  console.log('Supabase Public URL:', publicUrlData.publicUrl);

  return urlData.publicUrl;
}
