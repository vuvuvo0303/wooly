import { useState } from "react";
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
} from "@mui/material";
import { Link } from "react-router-dom";
import Hero_image from "~/assets/hero_img.jpg";
// import vnpayQR from "~/assets/vnpay_qr.png"; // Thêm ảnh QR VNPay

function Checkout() {
    const [form, setForm] = useState({ name: "", phone: "", address: "" });
    const [isPaying, setIsPaying] = useState(false);
    const [isPaid, setIsPaid] = useState(false);

    const cartItems = [
        {
            id: 1,
            image: Hero_image,
            name: "Sản phẩm 1",
            price: 500000,
            quantity: 2,
        },
        {
            id: 2,
            image: Hero_image,
            name: "Sản phẩm 2",
            price: 1000000,
            quantity: 1,
        },
    ];

    const totalAmount = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleCheckout = () => {
        if (!form.name || !form.phone || !form.address) {
            alert("Vui lòng điền đầy đủ thông tin.");
            return;
        }
        setIsPaying(true);
    };

    const handlePaymentSuccess = () => {
        setIsPaying(false);
        setIsPaid(true);
    };

    return (
        <div className="max-w-3xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-6">Thanh toán</h2>

            {/* Danh sách sản phẩm */}
            <div className="border-b pb-4">
                {cartItems.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center space-x-4 mb-4"
                    >
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-500">
                                {item.price.toLocaleString()}đ x {item.quantity}
                            </p>
                        </div>
                        <p className="font-semibold">
                            {(item.price * item.quantity).toLocaleString()}đ
                        </p>
                    </div>
                ))}
            </div>

            {/* Tổng tiền */}
            <div className="flex justify-between items-center font-semibold text-lg py-4">
                <p>Tổng tiền:</p>
                <p className="text-red-500">{totalAmount.toLocaleString()}đ</p>
            </div>

            {/* Thông tin người nhận */}
            <div className="space-y-4">
                <TextField
                    label="Họ và Tên"
                    fullWidth
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Số điện thoại"
                    fullWidth
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Địa chỉ nhận hàng"
                    fullWidth
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* Nút Thanh toán */}
            <div className="mt-6 flex justify-between items-center">
                <Link to="/cart">
                    <Button variant="outlined" color="primary">
                        Quay lại giỏ hàng
                    </Button>
                </Link>
                <Button
                    variant="contained"
                    color="warning"
                    onClick={handleCheckout}
                >
                    Thanh toán
                </Button>
            </div>

            {/* Dialog Thanh Toán */}
            <Dialog open={isPaying} onClose={() => setIsPaying(false)}>
                <DialogContent>
                    <p className="text-lg font-semibold text-center">
                        Quét mã QR để thanh toán
                    </p>
                    <img
                        src={Hero_image}
                        alt="QR VNPay"
                        className="w-60 mx-auto my-4"
                    />
                    <p className="text-center text-sm text-gray-600">
                        Sau khi thanh toán, bấm "Xác nhận đã thanh toán"
                    </p>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setIsPaying(false)}
                        color="secondary"
                    >
                        Hủy
                    </Button>
                    <Button
                        onClick={handlePaymentSuccess}
                        color="success"
                        variant="contained"
                    >
                        Xác nhận đã thanh toán
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Xác nhận Đặt hàng thành công */}
            {isPaid && (
                <div className="mt-6 p-4 bg-green-100 text-green-700 font-semibold text-center rounded-lg">
                    🎉 Đặt hàng thành công! Cảm ơn bạn đã mua hàng.
                </div>
            )}
        </div>
    );
}

export default Checkout;
