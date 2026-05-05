export function Footer() {
  return (
    <footer className="bg-[var(--brand-surface)] border-t border-[var(--brand-border)] py-8">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="font-mono text-xs text-[var(--brand-muted)]">
            © 2026 Santiago Rodríguez. Todos los derechos reservados.
          </p>
          <p className="font-mono text-xs text-[var(--brand-muted)] mt-1">
            Desarrollador Full Stack Senior <span className="text-[var(--brand-cyan)]">·</span> Bogotá D.C., Colombia
          </p>
        </div>
      </div>
    </footer>
  )
}
