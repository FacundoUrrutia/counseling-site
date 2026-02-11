"use client";

import { useState } from "react";
import BlurText from "./blurText";

interface BannerProps {
  dict: {
    banner: {
      title: string;
      subtitle: string;
    };
  };
}

const Banner = ({ dict }: BannerProps) => {
  const [titleComplete, setTitleComplete] = useState(false);

  return (
    <section className="flex flex-col items-center justify-center w-full py-24 md:py-40 min-h-[400px] md:min-h-[500px] px-6">
      <BlurText
        text={dict.banner.title}
        delay={150}
        animateBy="words"
        direction="top"
        onAnimationComplete={() => setTitleComplete(true)}
        className="text-4xl md:text-6xl font-serif mb-4 md:mb-6 text-center leading-[1.1]"
      />

      <BlurText
        text={dict.banner.subtitle}
        delay={100}
        animateBy="words"
        direction="top"
        trigger={titleComplete}
        className="text-lg md:text-2xl font-serif text-center opacity-80 max-w-[280px] md:max-w-none"
      />
    </section>
  );
};

export default Banner;
