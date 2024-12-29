export default function index({ title, className, color = 'text-gray-700' }) {
  return (
    <label className={`block ${color} text-sm font-medium mb-1 ${className}`}>
      {title}
    </label>
  );
}
