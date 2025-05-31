import { useState, useCallback } from 'react';
import { ImageUploadResult } from '../types/types';
import { toast } from 'react-toastify';

interface UseImageUploadReturn {
  uploadImage: (file: File) => Promise<ImageUploadResult | null>;
  isUploading: boolean;
  error: string | null;
}

export function useImageUpload(): UseImageUploadReturn {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = useCallback(async (file: File): Promise<ImageUploadResult | null> => {
    if (!file) {
      setError('No file selected');
      return null;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      setError('Only image files are allowed');
      toast.error('Only image files are allowed');
      return null;
    }

    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('File size exceeds 5MB limit');
      toast.error('File size exceeds 5MB limit');
      return null;
    }

    try {
      setIsUploading(true);
      setError(null);

      // Create a preview URL for the image
      const preview = URL.createObjectURL(file);

      // In a real app, you might upload the image to a server here
      // For this demo, we'll just use the local file and preview URL

      return { file, preview };
    } catch (err) {
      console.error('Error uploading image:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to upload image';
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    } finally {
      setIsUploading(false);
    }
  }, []);

  return { uploadImage, isUploading, error };
}