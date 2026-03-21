import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";

function StarRatingComponent({ rating, handleRatingChange }) {
  return (
    <div className="flex items-center justify-center sm:justify-start gap-0.5 sm:gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive = star <= rating;

        return (
          <Button
            key={star}
            type="button"
            variant="ghost"
            size="icon"
            aria-label={`Rate ${star} star`}
            onClick={
              handleRatingChange ? () => handleRatingChange(star) : undefined
            }
            className={`
              rounded-full
              transition-all duration-200
              p-0 sm:p-1   /* 🔥 FIX: remove extra padding on mobile */
              ${
                isActive
                  ? "text-[#C9A24D]"
                  : "text-muted-foreground"
              }
              hover:bg-[#F5EFE6]
            `}
          >
            <StarIcon
              className={`
                h-4 w-4 sm:h-5 sm:w-5   /* 🔥 responsive star size */
                transition-all
                ${
                  isActive
                    ? "fill-[#C9A24D]"
                    : "fill-transparent"
                }
              `}
            />
          </Button>
        );
      })}
    </div>
  );
}

export default StarRatingComponent;