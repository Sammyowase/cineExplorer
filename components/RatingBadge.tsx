import { FiStar } from "react-icons/fi";
import { formatRating } from "@/lib/utils";

interface RatingBadgeProps {
    rating: number;
    size?: "sm" | "md" | "lg";
}


const RatingBadge = ({ rating, size = "md" }: RatingBadgeProps) => {

    const sizeClasses = {
        sm: "text-xs px-1.5 py-0.5 gap-0.5",
        md: "text-sm px-2 py-1 gap-1",
        lg: "text-base px-3 py-1.5 gap-1.5",
    };

    const iconSizes = {
        sm: "h-3 w-3",
        md: "h-3.5 w-3.5",
        lg: "h-4 w-4",
    }
    return (
        <span
            className={`inline-flex items-center rounded-full bg-rating/15 font-semibold text-rating ${sizeClasses[size]}`}
        >
            <FiStar className={`fill-rating ${iconSizes[size]}`} />
            {formatRating(rating)}
        </span>
    )
}

export default RatingBadge
