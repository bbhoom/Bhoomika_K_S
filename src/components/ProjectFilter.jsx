import React from 'react';

const ProjectFilter = ({ activeFilter, onFilterChange, isMobile }) => {
    const filters = [
        { id: 'all', name: 'All' },
        { id: 'python', name: 'Python' },
        { id: 'react', name: 'React' },
        { id: 'java', name: 'Java' },
        { id: 'gamedev', name: 'Game Dev' }
    ];

    return (
        <div className="w-full mb-8">
            <div className={`flex ${isMobile ? 'flex-wrap gap-2' : 'gap-4'} justify-center`}>
                {filters.map((filter) => (
                    <button
                        key={filter.id}
                        onClick={() => onFilterChange(filter.id)}
                        className={`
                            ${isMobile ? 'px-4 py-2 text-sm' : 'px-8 py-3 text-base'}
                            rounded-lg font-semibold transition-all duration-300 ease-in-out
                            min-w-fit relative overflow-hidden
                            ${activeFilter === filter.id
                                ? 'bg-white dark:bg-gray-800 text-black dark:text-white shadow-xl transform scale-105'
                                : 'bg-transparent text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-white/5 dark:hover:bg-gray-800/20 hover:scale-105'
                            }
                            active:scale-95
                        `}
                    >
                        {/* Active indicator line */}
                        {activeFilter === filter.id && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                        )}
                        <span className="relative z-10">
                            {filter.name}
                        </span>
                    </button>
                ))}
            </div>

            {/* Minimal filter indicator */}
            <div className="mt-6 text-center">
                <div className="inline-flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
                    <p className="text-xs text-gray-500 dark:text-gray-500 font-medium tracking-wide uppercase">
                        {activeFilter === 'all'
                            ? 'All Projects'
                            : `${filters.find(f => f.id === activeFilter)?.name} Projects`
                        }
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProjectFilter;
