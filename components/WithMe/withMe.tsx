"use client";

import ChromaGrid from "./ChromaGrid";

interface WithMeProps {
  dict: {
    withMe: {
      title: string;
      subtitle: string;
      text: string;
      button: string;
    };
  };
}

const WithMe = ({ dict }: WithMeProps) => {
  const items = [
    {
      image: "/images/ina320x400.jpeg",
      borderColor: "#adafde",
      gradient:
        "linear-gradient(145deg, rgba(173, 175, 222, 0.4), transparent)",
    },
  ];

  return (
    <section
      id="about"
      className="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl mx-auto py-16 md:py-24 px-8 gap-10 md:gap-12"
    >
      <div className="w-9/12 sm:w-7/12 md:w-5/12 aspect-[4/5] relative overflow-hidden rounded-[2rem] border border-white/40 shadow-xl group bg-white/10 backdrop-blur-sm">
        <ChromaGrid
          items={items}
          radius={200}
          damping={0.4}
          fadeOut={0.8}
          columns={1}
          rows={1}
          ease="power4.out"
          className="h-full w-full"
        />
      </div>

      <div className="w-full md:w-7/12 flex flex-col items-center md:items-start justify-center gap-5 text-center md:text-left">
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-serif text-black leading-tight tracking-tight">
            {dict.withMe.title}
          </h2>
          <h3 className="text-base md:text-lg font-serif text-black/60 italic">
            {dict.withMe.subtitle}
          </h3>
        </div>

        <p className="text-sm md:text-base text-black/70 leading-relaxed max-w-md font-light">
          {dict.withMe.text}
        </p>

        <a
          href="https://www.psychologytoday.com/uy/psicologos/ignacia-ayala-montevideo-mo/1681181"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 px-6 py-2.5 bg-black/5 hover:bg-black/10 border border-black/10 rounded-lg text-black font-serif text-sm transition-all duration-500 backdrop-blur-xl flex items-center gap-2 active:scale-95"
        >
          {dict.withMe.button}
          <span className="group-hover:translate-x-1 transition-transform">
            →
          </span>
        </a>
      </div>
    </section>
  );
};

export default WithMe;
