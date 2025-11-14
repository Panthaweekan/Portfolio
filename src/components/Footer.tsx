export function Footer() {
  return (
    <footer className="bg-muted/30 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} Panthaweekan Somngam. Built with React, TypeScript,
            and TailwindCSS.
          </p>
        </div>
      </div>
    </footer>
  );
}
