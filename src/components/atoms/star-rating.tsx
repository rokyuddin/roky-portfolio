import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  showNumber?: boolean;
}

export function StarRating({ rating, maxRating = 5, size = 16, showNumber = false }: StarRatingProps) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxRating }, (_, i) => (
        <Star
          key={i}
          size={size}
          className={`${
            i < rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-muted text-muted"
          } transition-colors`}
        />
      ))}
      {showNumber && (
        <span className="ml-1 text-sm text-muted-foreground">
          {rating}/{maxRating}
        </span>
      )}
    </div>
  );
}
