import '../styles/loader.css'
export default function Loader() {
  return (
    <div className="loader loader-dots" role="status" aria-label="Cargando">
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}
