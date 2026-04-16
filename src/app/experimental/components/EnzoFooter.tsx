"use client";

export default function EnzoFooter() {
  return (
    <footer id="contact" className="enzo-mini-footer">
      <div className="col">
        <p className="text-sm" style={{ opacity: 0.5, marginBottom: "0.4rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
          Get in touch
        </p>
        <a href="mailto:hola@markelramiro.com" className="serif" style={{ fontSize: "clamp(1.25rem, 2vw, 1.75rem)" }}>
          hola@markelramiro.com
        </a>
      </div>
      <div className="col">
        <p className="text-sm" style={{ opacity: 0.5, marginBottom: "0.4rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
          Elsewhere
        </p>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <a href="/blog">Writings</a>
          <a href="https://github.com/Riemann-def" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/markel-ramiro-vaquero" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>
      <div className="col end">
        <p className="text-sm" style={{ opacity: 0.5, letterSpacing: "0.15em", textTransform: "uppercase" }}>
          Madrid, Spain
        </p>
        <p className="text-sm" style={{ opacity: 0.35, marginTop: "0.4rem" }}>
          © {new Date().getFullYear()} Markel Ramiro
        </p>
      </div>
    </footer>
  );
}
