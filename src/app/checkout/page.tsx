"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartContext";

type PaymentMethod = "credit-card" | "bank-transfer" | "ewallet" | "cod";

interface CheckoutData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  paymentMethod: PaymentMethod;
  cardNumber?: string;
  cardExpiry?: string;
  cardCVC?: string;
  bankName?: string;
  ewalletPhone?: string;
}

export default function CheckoutPage() {
  const { cart, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<CheckoutData>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    paymentMethod: "credit-card",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart,
          total,
          customerInfo: formData,
        }),
      });

      if (!response.ok) throw new Error("Thanh toán thất bại");

      setSuccess(true);
      clearCart();
      setTimeout(() => {
        window.location.href = "/books";
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0 && !success) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-800 mb-4">Giỏ hàng trống</p>
          <Link href="/books" className="text-indigo-600 hover:text-indigo-700 font-semibold">
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <p className="text-5xl mb-4">✅</p>
          <p className="text-2xl font-bold text-gray-800 mb-2">Thanh toán thành công!</p>
          <p className="text-gray-600 mb-4">Cảm ơn bạn đã mua hàng</p>
          <p className="text-sm text-gray-500">Đang chuyển hướng...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">🛒 Thanh Toán</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Đơn hàng của bạn</h2>

              <div className="space-y-3 border-b pb-4 mb-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div>
                      <p className="font-semibold text-gray-800">{item.title}</p>
                      <p className="text-sm text-gray-600">x{item.quantity}</p>
                    </div>
                    <p className="font-semibold text-gray-800">
                      {(item.price * item.quantity).toLocaleString('vi-VN')} ₫
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-gray-600">
                  <p>Tạm tính:</p>
                  <p>{total.toLocaleString('vi-VN')} ₫</p>
                </div>
                <div className="flex justify-between text-gray-600">
                  <p>Phí vận chuyển:</p>
                  <p>50,000 ₫</p>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold text-lg">
                  <p>Tổng cộng:</p>
                  <p className="text-indigo-600">{(total + 50000).toLocaleString('vi-VN')} ₫</p>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <form onSubmit={handleSubmit} className="md:col-span-2 space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Customer Info */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Thông tin giao hàng</h2>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Họ và tên"
                  required
                  className="col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Số điện thoại"
                  required
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Địa chỉ"
                  required
                  className="col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Thành phố"
                  required
                  className="col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Phương thức thanh toán</h2>

              {/* Payment Method Selection */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {[
                  { id: "credit-card", label: "💳 Thẻ tín dụng", icon: "💳" },
                  { id: "bank-transfer", label: "🏦 Chuyển khoản", icon: "🏦" },
                  { id: "ewallet", label: "📱 Ví điện tử", icon: "📱" },
                  { id: "cod", label: "🚚 Thanh toán khi nhận", icon: "🚚" },
                ].map(method => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: method.id as PaymentMethod })}
                    className={`p-3 rounded-lg border-2 transition ${
                      formData.paymentMethod === method.id
                        ? "border-indigo-600 bg-indigo-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="text-2xl mb-1">{method.icon}</div>
                    <div className="text-xs font-semibold text-gray-700">{method.label.split(" ")[1]}</div>
                  </button>
                ))}
              </div>

              {/* Credit Card Payment */}
              {formData.paymentMethod === "credit-card" && (
                <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
                  <input
                    type="text"
                    placeholder="Số thẻ (1234 5678 9012 3456)"
                    value={formData.cardNumber || ""}
                    onChange={e => setFormData({ ...formData, cardNumber: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={formData.cardExpiry || ""}
                      onChange={e => setFormData({ ...formData, cardExpiry: e.target.value })}
                      required
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                      type="text"
                      placeholder="CVC"
                      value={formData.cardCVC || ""}
                      onChange={e => setFormData({ ...formData, cardCVC: e.target.value })}
                      required
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <p className="text-xs text-gray-600">Thông tin thẻ của bạn được bảo mật và mã hóa.</p>
                </div>
              )}

              {/* Bank Transfer Payment */}
              {formData.paymentMethod === "bank-transfer" && (
                <div className="space-y-4 p-4 bg-green-50 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <select
                      value={formData.bankName || ""}
                      onChange={e => setFormData({ ...formData, bankName: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    >
                      <option>Chọn ngân hàng</option>
                      <option>Vietcombank</option>
                      <option>Techcombank</option>
                      <option>MB Bank</option>
                      <option>ACB</option>
                    </select>
                  </div>
                  <div className="bg-white p-3 rounded border border-gray-200">
                    <p className="text-sm font-semibold text-gray-700">Thông tin chuyển khoản:</p>
                    <p className="text-xs text-gray-600 mt-2">Tên tài khoản: Metabookstore</p>
                    <p className="text-xs text-gray-600">STK: 123456789</p>
                    <p className="text-xs text-gray-600">Nội dung: #{formData.phone}</p>
                  </div>
                  <p className="text-xs text-yellow-700">ℹ️ Vui lòng ghi nội dung chuyển khoản để chúng tôi có thể xác nhận đơn hàng của bạn.</p>
                </div>
              )}

              {/* E-Wallet Payment */}
              {formData.paymentMethod === "ewallet" && (
                <div className="space-y-4 p-4 bg-purple-50 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      className="p-3 border-2 border-gray-200 rounded-lg hover:border-purple-600 transition text-center"
                    >
                      <div className="text-3xl mb-1">🛵</div>
                      <div className="text-xs font-semibold">Momo</div>
                    </button>
                    <button
                      type="button"
                      className="p-3 border-2 border-gray-200 rounded-lg hover:border-purple-600 transition text-center"
                    >
                      <div className="text-3xl mb-1">💳</div>
                      <div className="text-xs font-semibold">Zalopay</div>
                    </button>
                  </div>
                  <input
                    type="tel"
                    placeholder="Số điện thoại liên kết"
                    value={formData.ewalletPhone || ""}
                    onChange={e => setFormData({ ...formData, ewalletPhone: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              )}

              {/* Cash on Delivery */}
              {formData.paymentMethod === "cod" && (
                <div className="space-y-4 p-4 bg-orange-50 rounded-lg">
                  <div className="flex items-center justify-center py-6">
                    <div className="text-center">
                      <div className="text-5xl mb-2">🚚</div>
                      <p className="text-gray-700 font-semibold">Thanh toán khi nhận hàng</p>
                      <p className="text-sm text-gray-600 mt-1">Bạn sẽ thanh toán tiền mặt cho tài xế khi nhận đơn hàng</p>
                    </div>
                  </div>
                  <p className="text-xs text-orange-700">ℹ️ Phí COD có thể áp dụng tuỳ theo khoảng cách giao hàng</p>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <Link
                href="/books"
                className="flex-1 text-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 rounded-lg transition"
              >
                Tiếp tục mua sắm
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition"
              >
                {loading ? "Đang xử lý..." : `Thanh toán ${(total + 5).toFixed(2)}$`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
