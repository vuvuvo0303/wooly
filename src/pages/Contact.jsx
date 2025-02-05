function Contact() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Liên Hệ</h1>

      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-3">Thông Tin Liên Hệ</h2>
        <p className="text-gray-700">📍 Địa chỉ: 123 Đường ABC, Quận 1, TP. Hồ Chí Minh</p>
        <p className="text-gray-700">📞 Hotline: 0123 456 789</p>
        <p className="text-gray-700">
          📧 Email:{" "}
          <a href="mailto:support@shopx.com" className="text-blue-500">
            support@.com
          </a>
        </p>
        <p className="text-gray-700">🕒 Giờ làm việc: 8:00 - 20:00 (T2 - CN)</p>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Gửi Tin Nhắn</h2>
        <form className="flex flex-col gap-4">
          <input type="text" placeholder="Họ và tên" className="p-3 border rounded-md" required />
          <input type="email" placeholder="Email" className="p-3 border rounded-md" required />
          <textarea placeholder="Nội dung tin nhắn" className="p-3 border rounded-md h-32" required />
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition">
            Gửi Tin Nhắn
          </button>
        </form>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-center mb-4">Vị Trí Cửa Hàng</h2>
        <iframe
          title="Google Map"
          className="w-full h-64 rounded-lg shadow-md"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.610010537022!2d106.80730807480579!3d10.841127589311634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752731176b07b1%3A0xb752b24b379bae5e!2sFPT%20University%20HCMC!5e0!3m2!1sen!2s!4v1738729017237!5m2!1sen!2s"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export default Contact;
