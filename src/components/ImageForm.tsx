import { useState, useEffect } from 'react';
import { DynamicImage } from '../types/image';

interface ImageFormProps {
  initialData?: DynamicImage | null;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export const ImageForm = ({ initialData, onSubmit, onCancel }: ImageFormProps) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [url, setUrl] = useState(initialData?.url || '');
  const [tags, setTags] = useState(initialData?.tags.join(', ') || '');

  // Если initialData меняется, обновляем форму (для редактирования)
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setUrl(initialData.url);
      setTags(initialData.tags.join(', '));
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      url,
      tags: tags.split(',').map(t => t.trim()).filter(t => t !== '')
    });
  };

  return (
    <form onSubmit={handleSubmit} className="card bg-base-200 p-6 mb-6">
      <h3 className="text-xl font-bold mb-4">{initialData ? 'Редактировать' : 'Добавить'} изображение</h3>
      <div className="form-control mb-4">
        <label className="label"><span className="label-text">Название</span></label>
        <input type="text" className="input input-bordered" value={title} onChange={e => setTitle(e.target.value)} required />
      </div>
      <div className="form-control mb-4">
        <label className="label"><span className="label-text">URL изображения</span></label>
        <input type="url" className="input input-bordered" value={url} onChange={e => setUrl(e.target.value)} required />
      </div>
      <div className="form-control mb-4">
        <label className="label"><span className="label-text">Теги (через запятую)</span></label>
        <input type="text" className="input input-bordered" value={tags} onChange={e => setTags(e.target.value)} placeholder="nature, art" />
      </div>
      <div className="flex gap-2 justify-end">
        <button type="button" className="btn btn-ghost" onClick={onCancel}>Отмена</button>
        <button type="submit" className="btn btn-primary">Сохранить</button>
      </div>
    </form>
  );
};