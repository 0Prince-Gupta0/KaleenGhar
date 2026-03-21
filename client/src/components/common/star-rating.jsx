import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";

function StarRatingComponent({ rating, handleRatingChange }) {
  const isClickable = !!handleRatingChange;
 return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive = star <= rating;

        return (
          <Button
            key={star}
            type="button"
            variant="ghost"
            size="icon"
            disabled={!isClickable}
            onClick={
              isClickable ? () => handleRatingChange(star) : undefined
            }
            className={`
              ${isActive ? "text-[#C9A24D]" : "text-muted-foreground"}
              ${isClickable ? "cursor-pointer hover:bg-[#F5EFE6]" : "cursor-default hover:bg-transparent"}
            `}
          >
            <StarIcon
              className={`${isActive ? "fill-[#C9A24D]" : "fill-transparent"}`}
            />
          </Button>
        );
      })}
    </div>
  );
}

export default StarRatingComponent;