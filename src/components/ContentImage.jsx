export function ContentImage({ src, alt, side = false }) {
  const classes = side
    ? "md:w-1/3 md:float-left md:mr-6 rounded-lg mb-4"
    : "w-full rounded-lg my-4";

  return <img src={src} alt={alt} className={classes} />;
}
