function AdminSectionHeader({ title, toggleLabel, onToggle }) {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold">{title}</h2>
      {toggleLabel && (
        <button
          onClick={onToggle}
          className="bg-sunrice-brown text-sunrice-cream px-3 py-1 rounded hover:bg-sunrice-accent transition"
        >
          {toggleLabel}
        </button>
      )}
    </div>
  );
}

export default AdminSectionHeader;