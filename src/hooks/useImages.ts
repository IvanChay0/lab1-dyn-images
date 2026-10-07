import { useState, useEffect } from 'react';
import { DynamicImage } from '../types/image';
import { initialImages } from '../data/mockData';

export const useImages = () => {
  const [images, setImages] = useState<DynamicImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Имитация загрузки данных с API
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      // Здесь в будущем будет: const res = await fetch('https://dummyjson.com/images');
      await new Promise(resolve => setTimeout(resolve, 800)); // Имитация задержки 800мс
      setImages(initialImages);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const addImage = async (newImage: Omit<DynamicImage, 'id'>) => {
    const image: DynamicImage = { ...newImage, id: Date.now() };
    setImages(prev => [...prev, image]);
  };

  const updateImage = async (updatedImage: DynamicImage) => {
    setImages(prev => prev.map(img => img.id === updatedImage.id ? updatedImage : img));
  };

  const deleteImage = async (id: number) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  return { images, isLoading, addImage, updateImage, deleteImage };
};