import Hero_image from "~/assets/hero_img.jpg";
function Hero() {
    return (
        <div className="flex flex-col sm:flex-row border border-gray-400 rounded-xl">
            {/* Hero left */}
            <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
                <div className="text-[#414141]">
                    <div className="flex items-center gap-2">
                        <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
                        <p className=" font-medium text-sm md: text-base">
                            OUR BESTSELLERS
                        </p>
                    </div>
                    <h1 className="prata-regular text-3x1 sm:py-3 lg:text-5xl leading-relaxed">
                        Latest Arrivals
                    </h1>

                    <div className="flex items-center gap-2">
                        <p className="font-semibold text-sm md:text-base">
                            SHOP NOW
                        </p>
                        <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
                    </div>
                </div>
            </div>

            {/* Hero-right */}
            <img
                className="w-full sm:w-1/2 object-cover rounded-xl"
                src={Hero_image}
            />
        </div>
    );
}

export default Hero;
