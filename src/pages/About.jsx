import aboutUs_img from "~/assets/aboutUs.jpg";

function AboutUs() {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6">
                Về Chúng Tôi
            </h1>

            <p className="text-lg text-gray-700 mb-4">
                Chào mừng bạn đến với{" "}
                <span className="font-semibold">WOOLY</span> – nơi mang đến
                những sản phẩm chất lượng cao với mức giá hợp lý. Chúng tôi cam
                kết mang lại trải nghiệm mua sắm tốt nhất cho khách hàng.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <img
                    src={aboutUs_img}
                    alt="Cửa hàng"
                    className="w-full h-auto rounded-lg shadow-md"
                />
                <div>
                    <h2 className="text-2xl font-semibold mb-2">
                        Sứ mệnh của chúng tôi
                    </h2>
                    <p className="text-gray-700">
                        Chúng tôi không chỉ cung cấp sản phẩm mà còn mang đến
                        **giá trị và niềm tin** cho khách hàng. Sản phẩm của
                        chúng tôi được chọn lọc kỹ lưỡng để đảm bảo chất lượng.
                    </p>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-semibold text-center mb-4">
                    Giá Trị Cốt Lõi
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                    <div className="p-4 border rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-red-500">
                            Chất lượng
                        </h3>
                        <p className="text-gray-600">
                            Sản phẩm đạt tiêu chuẩn cao nhất.
                        </p>
                    </div>
                    <div className="p-4 border rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-blue-500">
                            Dịch vụ
                        </h3>
                        <p className="text-gray-600">
                            Luôn hỗ trợ khách hàng tận tình.
                        </p>
                    </div>
                    <div className="p-4 border rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-green-500">
                            Đổi mới
                        </h3>
                        <p className="text-gray-600">
                            Không ngừng cải tiến sản phẩm.
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-10 text-center">
                <h2 className="text-2xl font-semibold mb-4">
                    Liên hệ với chúng tôi
                </h2>
                <p className="text-gray-700">
                    Email:{" "}
                    <a
                        href="mailto:support@shopx.com"
                        className="text-blue-500"
                    >
                        support@wooly.com
                    </a>
                </p>
                <p className="text-gray-700">Hotline: 0123 456 789</p>
            </div>
        </div>
    );
}

export default AboutUs;
