"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Giả lập userId, thực tế lấy từ auth
    const userId = "demo-user";
    const fetchUser = async () => {
      const { data, error } = await supabase.from("users").select("*").eq("id", userId).single();
      if (data) {
        setUser(data);
        setFullName(data.full_name || "");
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    // Giả lập userId
    const userId = "demo-user";
    const { error } = await supabase.from("users").update({ full_name: fullName }).eq("id", userId);
    if (!error) setMessage("Cập nhật thành công!");
    else setMessage("Có lỗi xảy ra!");
  };

  if (loading) return <div className="p-8">Đang tải...</div>;
  if (!user) return <div className="p-8">Không tìm thấy tài khoản.</div>;

  return (
    <div className="max-w-lg mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">👤 Thông tin tài khoản</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block mb-1">Email:</label>
          <input value={user.email} disabled className="w-full border rounded px-2 py-1 bg-gray-100" />
        </div>
        <div>
          <label className="block mb-1">Họ tên:</label>
          <input value={fullName} onChange={e => setFullName(e.target.value)} className="w-full border rounded px-2 py-1" />
        </div>
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Cập nhật</button>
      </form>
      {message && <div className="mt-4 text-green-600">{message}</div>}
    </div>
  );
}
