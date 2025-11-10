export default function ActionButtons({
  row,
  onWatch,
  onSave,
  onDelete,
  onRestore,
  onOpenMovieDetail,
  activeTab,
}) {
  const buttonsToShow = [];

  if (activeTab === "saved") {
    buttonsToShow.push(
      {
        label: "Watch",
        onClick: () => {
          onWatch?.(row);
          onOpenMovieDetail?.(row);
        },
        bg: "bg-green-600",
        icon: "fa-play",
      },
      {
        label: "Delete",
        onClick: () => onDelete?.(row),
        bg: "bg-red-600",
        icon: "fa-trash",
      }
    );
  } else if (activeTab === "deleted") {
    buttonsToShow.push(
      {
        label: "Watch",
        onClick: () => {
          onWatch?.(row);
          onOpenMovieDetail?.(row);
        },
        bg: "bg-green-600",
        icon: "fa-play",
      },
      { label: "Save", onClick: () => onSave?.(row), bg: "bg-blue-600", icon: "fa-bookmark" },
      { label: "Restore", onClick: () => onRestore?.(row), bg: "bg-amber-500", icon: "fa-undo" }
    );
  } else if (activeTab === "watched") {
    buttonsToShow.push(
      { label: "Save", onClick: () => onSave?.(row), bg: "bg-blue-600", icon: "fa-bookmark" },
      { label: "Delete", onClick: () => onDelete?.(row), bg: "bg-red-600", icon: "fa-trash" }
    );
  } else {
    buttonsToShow.push(
      {
        label: "Watch",
        onClick: () => {
          onWatch?.(row);
          onOpenMovieDetail?.(row);
        },
        bg: "bg-green-600",
        icon: "fa-play",
      },
      { label: "Save", onClick: () => onSave?.(row), bg: "bg-blue-600", icon: "fa-bookmark" },
      { label: "Delete", onClick: () => onDelete?.(row), bg: "bg-red-600", icon: "fa-trash" }
    );
  }

  return (
    <nav className="flex flex-wrap gap-2" aria-label="Movie action buttons">
      <ul className="flex flex-wrap gap-2 p-0 m-0 list-none">
        {buttonsToShow.map((btn, index) => (
          <li key={`${row.id}-${btn.label}-${index}`} className="flex-1 min-w-[90px]">
            <button
              type="button"
              className={`${btn.bg} text-white w-full sm:w-auto px-3 sm:px-4 py-2 rounded-md hover:opacity-90 transition-all duration-300 cursor-pointer flex justify-center sm:flex-row items-center space-x-1 text-xs sm:text-sm`}
              onClick={btn.onClick}
            >
              <i className={`fas ${btn.icon}`} aria-hidden="true"></i>
              <span>{btn.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
