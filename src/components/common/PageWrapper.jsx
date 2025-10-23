function PageWrapper({ title, children }) {
  return (
    <div className="max-w mx-auto px-6 py-8 dark:bg-neutral-900">
      {title && (
        <h1 className="text-2xl font-bold mb-4 text-sunrice-brown dark:text-sunrice-yellow">
          {title}
        </h1>
      )}
      {children}
    </div>
  );
}

export default PageWrapper;