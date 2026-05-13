"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Review {
  id: string;
  user_id: string;
  rating: number;
  comment: string;
  created_at: string;
}

export default function BookReviews({ bookId }: { bookId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      const res = await fetch(`/api/reviews?bookId=${bookId}`);
      const data = await res.json();
      setReviews(data);
      setLoading(false);
    };
    fetchReviews();
  }, [bookId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Giả lập user_id, thực tế lấy từ auth
    const user_id = "demo-user";
    await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ book_id: bookId, user_id, rating, comment }),
    });
    setRating(5);
    setComment("");
    setSubmitting(false);
    // Reload reviews
    const res = await fetch(`/api/reviews?bookId=${bookId}`);
    setReviews(await res.json());
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-2">Đánh giá & bình luận</h2>
      <form onSubmit={handleSubmit} className="mb-4 space-y-2">
        <div>
          <label className="mr-2">Số sao:</label>
          <select value={rating} onChange={e => setRating(Number(e.target.value))} className="border rounded px-2 py-1">
            {[5,4,3,2,1].map(star => <option key={star} value={star}>{star}</option>)}
          </select>
        </div>
        <textarea
          value={comment}
          onChange={e => setComment(e.target.value)}
          className="w-full border rounded px-2 py-1"
          placeholder="Viết bình luận..."
        />
        <button type="submit" disabled={submitting} className="bg-indigo-600 text-white px-4 py-2 rounded">
          {submitting ? "Đang gửi..." : "Gửi đánh giá"}
        </button>
      </form>
      {loading ? <p>Đang tải đánh giá...</p> : (
        <ul className="space-y-2">
          {reviews.map(r => (
            <li key={r.id} className="border rounded p-2">
              <div className="font-semibold">⭐ {r.rating} - {r.user_id}</div>
              <div>{r.comment}</div>
              <div className="text-xs text-gray-500">{new Date(r.created_at).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
