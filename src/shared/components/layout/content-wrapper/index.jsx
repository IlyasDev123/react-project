export default function index({
  children,
  title,
  color = 'text-black',
  size = 'text-xl',
  customClass = '',
}) {
  return (
    <div className="md:ml-14 w-full mt-6 mt-6 sm:ml-4">
      <div className="m-2">
        {title && (
          <h1 className={`${color} ${size} ${customClass}`}>{title}</h1>
        )}
      </div>
      {children}
    </div>
  );
}
