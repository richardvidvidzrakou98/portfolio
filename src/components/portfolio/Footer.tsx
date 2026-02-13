const Footer = () => (
  <footer className="py-10 border-t border-border">
    <div className="container max-w-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <p className="text-xs text-muted-foreground">
        © {new Date().getFullYear()} Richard Vidzrakou
      </p>
      <a
        href="#"
        className="text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        Back to top ↑
      </a>
    </div>
  </footer>
);

export default Footer;
