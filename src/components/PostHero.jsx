export function PostHero({ title, image }) {
  return (
    <section className="relative h-screen w-full flex items-center justify-center text-white">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />
      <h1 className="relative z-10 text-5xl md:text-7xl font-bold text-center">
        {title}
      </h1>
    </section>
  );
}
