import React from "react";
import { Rate, Avatar } from "antd";

interface UserInfo {
  fullName?: string;
  avatar?: string;
}

interface Review {
  _id?: string;
  rating: number;
  comment: string;
  title?: string;
  createdAt?: string;
  userId?: UserInfo | string;
}

interface ReviewItemProps {
  review: Review;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => (
  <div className="flex gap-4 p-4 mb-3 bg-white rounded-2xl shadow hover:shadow-lg transition-shadow border border-gray-100">
    {/* Avatar */}
    <div className="flex-shrink-0">
      {typeof review.userId === "object" && review.userId.avatar ? (
        <Avatar size={48} src={review.userId.avatar} />
      ) : (
        <Avatar size={48}>{typeof review.userId === "object" && review.userId.fullName
            ? review.userId.fullName[0].toUpperCase()
            : "A"}
        </Avatar>
      )}
    </div>
    {/* Content */}
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-1">
        <span className="font-semibold text-lg">
          {typeof review.userId === "object"
            ? review.userId.fullName || "Ẩn danh"
            : "Ẩn danh"}
        </span>
        <span className="text-gray-400 text-xs">
          {review.createdAt && new Date(review.createdAt).toLocaleString()}
        </span>
      </div>
      <div className="flex items-center gap-2 mb-1">
        <Rate disabled value={review.rating} />
        {review.title && (
          <span className="font-medium text-sm text-blue-700">{review.title}</span>
        )}
      </div>
      <div className="text-gray-700 text-base whitespace-pre-line">{review.comment}</div>
    </div>
  </div>
);

export default ReviewItem;
