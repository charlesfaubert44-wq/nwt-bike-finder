'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { X, Upload, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  images: File[];
  onImagesChange: (images: File[]) => void;
  maxImages?: number;
  className?: string;
}

export function ImageUploader({ 
  images, 
  onImagesChange, 
  maxImages = 5, 
  className 
}: ImageUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const newImages = Array.from(files).filter(file => 
      file.type.startsWith('image/') && 
      file.size <= 5 * 1024 * 1024 // 5MB limit
    );

    const updatedImages = [...images, ...newImages].slice(0, maxImages);
    onImagesChange(updatedImages);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    onImagesChange(updatedImages);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={className}>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileInput}
        className="hidden"
      />

      {images.length === 0 ? (
        <Card
          className={`border-2 border-dashed transition-colors cursor-pointer ${
            dragActive 
              ? 'border-primary bg-primary/5' 
              : 'border-frost-gray hover:border-primary/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={openFileDialog}
        >
          <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium text-slate-gray mb-2">
              Upload bike photos
            </h3>
            <p className="text-sm text-slate-gray/80 mb-4">
              Drag and drop images here, or click to select files
            </p>
            <Button type="button" variant="outline">
              Choose Images
            </Button>
            <p className="text-xs text-slate-gray/60 mt-2">
              Up to {maxImages} images, 5MB each
            </p>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden bg-frost-gray">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Bike photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeImage(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>

          {images.length < maxImages && (
            <Card
              className="border-2 border-dashed border-frost-gray hover:border-primary/50 transition-colors cursor-pointer"
              onClick={openFileDialog}
            >
              <div className="flex items-center justify-center py-8 px-6">
                <div className="text-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mx-auto mb-2">
                    <ImageIcon className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-sm text-slate-gray">
                    Add more photos ({images.length}/{maxImages})
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}

