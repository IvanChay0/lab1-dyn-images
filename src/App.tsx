import { useState } from 'react';
import { useImages } from './hooks/useImages';
import { ImageCard } from './components/ImageCard';
import { ImageForm } from './components/ImageForm';
import { DynamicImage } from './types/image';

function App() {
  const { images, isLoading, addImage, updateImage, deleteImage } = useImages();
  const [editingImage, setEditingImage] = useState<DynamicImage | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleAdd = (data: any) => {
    addImage(data);
    setIsFormOpen(false);
  };

  const handleUpdate = (data: any) => {
    if (editingImage) {
      updateImage({ ...editingImage, ...data });
      setEditingImage(null);
      setIsFormOpen(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <h1 className="text-4xl font-bold text-center mb-8">Динамические изображения</h1>
      
      <div className="flex justify-end mb-6">
        <button 
          className="btn btn-primary" 
          onClick={() => { setEditingImage(null); setIsFormOpen(true); }}
        >
          + Добавить изображение
        </button>
      </div>

      {isFormOpen && (
        <ImageForm 
          initialData={editingImage} 
          onSubmit={editingImage ? handleUpdate : handleAdd} 
          onCancel={() => { setIsFormOpen(false); setEditingImage(null); }} 
        />
      )}

      {isLoading ? (
        <div className="flex justify-center my-12">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <ImageCard 
              key={image.id} 
              image={image} 
              onEdit={(img) => { setEditingImage(img); setIsFormOpen(true); }}
              onDelete={deleteImage}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;