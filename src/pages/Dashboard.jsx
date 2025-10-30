import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopularMovies, fetchNowPlayingMovies, fetchUpcomingMovies, fetchTopRatedMovies } from '../redux/movies/createAction';

export function Dashboard() {
    const { popular, nowPlaying, upcoming, topRated } = useSelector((state) => state.movie);
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState('popular');

    useEffect(() => {
        dispatch(fetchPopularMovies());
        dispatch(fetchNowPlayingMovies());
        dispatch(fetchUpcomingMovies());
        dispatch(fetchTopRatedMovies());
    }, [dispatch]);

    const columns = [
        {
            name: "Poster",
            selector: (row) => row.poster_path,
            cell: (row) => (
                <img
                    src={`https://image.tmdb.org/t/p/w200${row.poster_path}`}
                    alt={row.title}
                    className='w-12 h-16 object-cover rounded-lg shadow-md'/>
            ),
        },
        {
            name: "Title",
            selector: (row) => row.title,
            sortable: true,
            cell: (row) => (
                <span className="font-medium text-gray-800">{row.title}</span>
            ),
        },
        {
            name: "Release Date",
            selector: (row) => row.release_date,
            sortable: true,
            cell: (row) => (
                <span className="text-gray-600">{row.release_date}</span>
            ),
        },
         {
            name: 'Action',
            selector: row => 
            <>
                <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-300 mr-2">
                    Watch Now 
                </button>
                <button
                    type="submit"
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-300">
                    Delete
                </button>
            </>
        }

    ];

    // Get data based on active tab
    const getCurrentData = () => {
        switch (activeTab) {
            case 'nowPlaying':
                return nowPlaying.movies || [];
            case 'upcoming':
                return upcoming.movies || [];
            case 'topRated':
                return topRated.movies || [];
            default: // popular
                return popular.movies || [];
        }
    };

    const currentData = getCurrentData();

    // Enhanced button styles with harmonious color scheme
    const buttonClasses = (isActive) => 
        `px-5 py-3 rounded-xl font-semibold transition-all duration-300 ease-in-out transform cursor-pointer border ${
            isActive 
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg scale-105 border-amber-600' 
                : 'bg-white text-gray-700 border-gray-300 hover:bg-amber-50 hover:border-amber-200 hover:scale-105'
        } hover:shadow-md active:scale-95 flex items-center space-x-2`;

    // Custom styles for DataTable to match our color scheme
    const customStyles = {
        headCells: {
            style: {
                backgroundColor: '#fef3c7',
                color: '#92400e',
                fontWeight: 'bold',
                fontSize: '1rem',
                padding: '16px 12px',
            },
        },
        cells: {
            style: {
                padding: '12px',
            },
        },
        rows: {
            style: {
                backgroundColor: '#ffffff',
                '&:hover': {
                    backgroundColor: '#fffbeb',
                },
            },
        },
    };

    return (
        <div className="min-h-screen w-screen max-w-none bg-gradient-to-br from-amber-50 to-orange-50 mt-10">
            <div className="flex flex-col items-center justify-center min-h-[90vh] p-4">
                <main className="p-6 w-full max-w-6xl">
                    <section className='mb-8'>
                        {/* Header */}
                        <div className="text-center mb-8">
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">
                                Istad Movie
                            </h1>
                        </div>
                       
                       {/* Enhanced Navigation Tabs with harmonious colors */}
                       <div className="flex justify-center space-x-4 mb-6 flex-wrap gap-3">
                           <button 
                               onClick={() => setActiveTab('popular')}
                               className={buttonClasses(activeTab === 'popular')}>
                               <i className="fas fa-fire text-sm"></i>
                               <span>Popular</span>
                           </button>
                           <button 
                               onClick={() => setActiveTab('nowPlaying')}
                               className={buttonClasses(activeTab === 'nowPlaying')}>
                               <i className="fas fa-play-circle text-sm"></i>
                               <span>Now Playing</span>
                           </button>
                           <button 
                               onClick={() => setActiveTab('upcoming')}
                               className={buttonClasses(activeTab === 'upcoming')}>
                               <i className="fas fa-calendar-alt text-sm"></i>
                               <span>Upcoming</span>
                           </button>
                           <button 
                               onClick={() => setActiveTab('topRated')}
                               className={buttonClasses(activeTab === 'topRated')}>
                               <i className="fas fa-star text-sm"></i>
                               <span>Top Rated</span>
                           </button>
                       </div>
                    </section>
                    
                    {/* Data Table */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        <DataTable 
                            columns={columns}
                            data={currentData}
                            pagination
                            customStyles={customStyles}
                            highlightOnHover
                            striped/>
                    </div>
                </main>
            </div>
        </div>
    );
}