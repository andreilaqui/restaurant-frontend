function PageWrapper({ title, children }) {
  return (
    <div className="max-w mx-auto px-6 py-8">
      {title && (
        <h1 className="text-3xl font-bold text-sunrice-brown dark:text-sunrice-cream mb-8 text-center">
          {title}
        </h1>
      )}
      {children}
    </div>
  );
}

export default PageWrapper;