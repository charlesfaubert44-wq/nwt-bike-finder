import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './firebase';

export const uploadImage = async (file: File, path: string): Promise<string> => {
  const imageRef = ref(storage, path);
  const snapshot = await uploadBytes(imageRef, file);
  return await getDownloadURL(snapshot.ref);
};

export const uploadBikeImages = async (files: File[], bikeId: string, type: 'stolen' | 'found'): Promise<string[]> => {
  const uploadPromises = files.map((file, index) => {
    const path = `bikes/${type}/${bikeId}/${index}_${file.name}`;
    return uploadImage(file, path);
  });
  
  return Promise.all(uploadPromises);
};

export const deleteImage = async (url: string): Promise<void> => {
  const imageRef = ref(storage, url);
  await deleteObject(imageRef);
};

export const deleteBikeImages = async (urls: string[]): Promise<void> => {
  const deletePromises = urls.map(url => deleteImage(url));
  await Promise.all(deletePromises);
};
