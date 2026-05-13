"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Order {
  id: string;
  total: number;
  status: string;
  created_at: string;
  order_items: Array<{
    id: string;
    book_id: string;
    quantity: number;
    price: number;
    book?: { title: string };
  }>;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      // Lấy userId từ localStorage hoặc JWT nếu có xác thực
      // Ở đây demo: lấy tất cả đơn hàng (cần sửa lại nếu có auth)
      const { data, error } = await supabase
        .from("orders")
        .select("*, order_items(*, book:book_id(title))")
        .order("created_at", { ascending: false });
      if (!error && data) setOrders(data);
      setLoading(false);
    };
    fetchOrders();
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">🧾 Lịch sử đơn hàng</h1>
      {loading ? (
        <p>Đang tải...</p>
      ) : orders.length === 0 ? (
        <p>Bạn chưa có đơn hàng nào.</p>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-lg p-6 bg-white shadow">
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Mã đơn: {order.id.slice(0, 8)}...</span>
                <span className="text-indigo-600 font-bold">{order.status}</span>
              </div>
              <div className="text-gray-600 text-sm mb-2">Ngày đặt: {new Date(order.created_at).toLocaleString()}</div>
              <ul className="mb-2">
                {order.order_items?.map((item) => (
                  <li key={item.id} className="flex justify-between text-sm">
                    <span>{item.book?.title || "[Sách]"} x {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="text-right font-bold text-lg">Tổng: ${order.total.toFixed(2)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
