import DataTable from "react-data-table-component";
import ActionButtons from "./ActionButtons";

export default function MovieTable({
    data,
    windowWidth,
    onWatch,
    onSave,
    onDelete,
    onRestore,
    onOpenMovieDetail,
    isLoading,
    activeTab,
    onLoadMore, // function to load more movies
    emptyMessage = "🎬 No movies found for your search.",
}) {
    const columns = [
        {
            name: "Poster",
            selector: (row) => row.poster_path,
            cell: (row) => (
                <img
                    src={
                        row.poster_path
                            ? `https://image.tmdb.org/t/p/w200${row.poster_path}`
                            : "https://via.placeholder.com/200x300?text=No+Image"
                    }
                    alt={row.title}
                    className="w-12 h-16 object-cover rounded-lg shadow-md"
                />
            ),
            grow: 0,
        },
        ...(windowWidth >= 640
            ? [
                  {
                      name: "Title",
                      selector: (row) => row.title,
                      sortable: true,
                      cell: (row) => <span className="font-semibold text-gray-800">{row.title}</span>,
                  },
              ]
            : []),
        ...(windowWidth >= 768
            ? [
                  {
                      name: "Release Date",
                      selector: (row) => row.release_date,
                      sortable: true,
                      cell: (row) => <span className="text-gray-600">{row.release_date}</span>,
                  },
              ]
            : []),
        {
            name: "Action",
            cell: (row, index) => (
                <ActionButtons
                    key={`${row.id}-${index}`} // ensures ActionButtons are unique
                    row={row}
                    onWatch={onWatch}
                    onSave={onSave}
                    onDelete={onDelete}
                    onRestore={onRestore}
                    onOpenMovieDetail={onOpenMovieDetail}
                    activeTab={activeTab}
                />
            ),
        },
    ];

    return (
        <section className="bg-white rounded-2xl shadow-lg overflow-hidden border border-amber-100">
            <div className="overflow-x-auto">
                {isLoading ? (
                    <div className="flex justify-center items-center py-10">
                        <div className="flex items-center space-x-3 text-amber-600">
                            <span className="loader border-4 border-amber-200 border-t-amber-600 rounded-full w-8 h-8 animate-spin"></span>
                            <span className="font-medium text-lg">Loading movies...</span>
                        </div>
                    </div>
                ) : data.length === 0 ? (
                    <div className="text-center py-10 text-gray-500 font-medium">{emptyMessage}</div>
                ) : (
                    <>
                        <DataTable
                            columns={columns}
                            data={data}
                            pagination
                            highlightOnHover
                            striped
                            className="w-full"
                            keyField={(row, index) => `${row.id}-${index}`} // <-- unique key for each row
                        />
                        {activeTab === "loadMore" && onLoadMore && (
                            <div className="flex justify-center py-4">
                                <button
                                    className="bg-amber-500 text-white px-6 py-2 rounded-md hover:bg-amber-600 transition-all duration-300"
                                    onClick={onLoadMore}
                                >
                                    Load More
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}
