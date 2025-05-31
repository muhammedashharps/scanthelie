import React, { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { useImageUpload } from '../../hooks/useImageUpload';

interface ImageUploaderProps {
  label: string;
  onImageUploaded: (imageData: string) => void;
  className?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  label,
  onImageUploaded,
  className = '',
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadImage } = useImageUpload();

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const result = await uploadImage(file);
    if (result) {
      setPreview(result.preview);
      
      // Convert file to base64 for storage/processing
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        onImageUploaded(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    onImageUploaded('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      
      {!preview ? (
        <div 
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors duration-200"
          onClick={handleUploadClick}
        >
          <Upload className="w-10 h-10 text-gray-400 mb-2" />
          <p className="text-sm text-gray-500 mb-1">Click to upload or drag and drop</p>
          <p className="text-xs text-gray-400">PNG, JPG, JPEG up to 5MB</p>
          
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <div className="relative rounded-lg overflow-hidden border border-gray-200">
          <img 
            src={preview} 
            alt="Uploaded preview" 
            className="w-full h-48 object-cover"
          />
          
          <button 
            className="absolute top-2 right-2 bg-gray-800 bg-opacity-70 text-white rounded-full p-1 hover:bg-opacity-90 transition-opacity duration-200"
            onClick={handleRemoveImage}
            type="button"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;