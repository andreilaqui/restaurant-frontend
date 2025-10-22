
function Footer() {
  return (
    <footer
      className="
        text-sunrice-cream bg-sunrice-brown
        dark:bg-neutral-900 dark:text-sunrice-cream
        mt-12 py-6
      "
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-4 text-sm">
        <div>
          <p className="font-semibold">Manila Sunrice</p>
          <p>123 Sample Street, Calgary</p>
          <p>Open daily: 9am – 3pm</p>
        </div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-sunrice-yellow">Facebook</a>
          <a href="#" className="hover:text-sunrice-yellow">Instagram</a>
          <a href="#" className="hover:text-sunrice-yellow">Twitter</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;