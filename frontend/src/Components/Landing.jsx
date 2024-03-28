import React from "react";
import { Typewriter } from "react-simple-typewriter";
import ScrollReveal from "../Scroll/Reveal";

const Landing = () => {
  return (
    <div className="flex w-full items-center justify-center min-h-screen bg-[#EEEEEE]">
      <div className="w-1/3 lg:block hidden">
        <ScrollReveal>
          <img src="Lpage.png" alt="logo" className="w-[90%] h-auto" />
        </ScrollReveal>
      </div>
      <div className="flex flex-col items-center justify-center gap-8 lg:w-1/2 w-full px-6 py-4">
        <p className="text-[#87A922] text-7xl font-bold">
          <span>
            <Typewriter
              words={["SayIt", "SayIt"]}
              loop={"autostart"}
              typeSpeed={80}
              deleteSpeed={120}
              delaySpeed={1000}
            />
          </span>
        </p>
        <p className="text-2xl text-[#87A922] font-semibold italic">
          Where Apparel Meets Opinions
        </p>
        <p className="text-[#31363F] text-lg text-center font-bold">
          Welcome to SayIt, where apparel meets opinions! SayIt is your ultimate
          destination for exploring and comparing clothing products from various
          brands. We understand that choosing the perfect outfit involves more
          than just style; it's about expressing yourself and making informed
          decisions. With SayIt, you can browse a diverse collection of clothing
          items, read user reviews, and easily compare products from different
          brands. Elevate your shopping experience by embracing the power of
          community insights. Discover, express, and make informed fashion
          choices at SayIt!
        </p>

        <button
          onClick={() => (window.location.href = "/signup")}
          className="bg-orange-600 text-[#F8F6E3] font-semibold p-3 lg:w-[30%] w-1/2 rounded-full hover:bg-[#114232] hover:text-white"
        >
          Get Started ↪{" "}
        </button>
      </div>
    </div>
  );
};

export default Landing;
