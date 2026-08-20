export default function Footer() {
  return (
    <footer className="border-t border-line/60 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 text-sm text-dim md:flex-row md:px-10">
        <span className="font-display text-lg font-extrabold tracking-tight text-bone">
          Oryndel
        </span>
        <nav className="flex gap-6">
          <a href="#how-it-works" className="transition hover:text-bone">
            How it works
          </a>
          <a href="#pricing" className="transition hover:text-bone">
            Pricing
          </a>
          <a href="mailto:hello@oryndel.com" className="transition hover:text-bone">
            hello@oryndel.com
          </a>
        </nav>
        <span>© {new Date().getFullYear()} Oryndel. All rights reserved.</span>
      </div>
    </footer>
  );
}
