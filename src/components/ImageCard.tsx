import { DynamicImage } from '../types/image';

interface ImageCardProps {
  image: DynamicImage;
  onEdit: (image: DynamicImage) => void;
  onDelete: (id: number) => void;
}

export const ImageCard = ({ image, onEdit, onDelete }: ImageCardProps) => {
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
      <figure>
        <img src={image.url} alt={image.title} className="h-48 w-full object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{image.title}</h2>
        <div className="flex flex-wrap gap-2 my-2">
          {image.tags.map((tag, index) => (
            <span key={index} className="badge badge-primary">{tag}</span>
          ))}
        </div>
        <div className="card-actions justify-end mt-4">
          <button className="btn btn-sm btn-info" onClick={() => onEdit(image)}>Изменить</button>
          <button className="btn btn-sm btn-error" onClick={() => onDelete(image.id)}>Удалить</button>
        </div>
      </div>
    </div>
  );
};