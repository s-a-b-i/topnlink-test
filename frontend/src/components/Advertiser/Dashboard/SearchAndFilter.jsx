import React from "react";

const SearchAndFilter = ({
  searchQuery,
  setSearchQuery,
  priceRange,
  setPriceRange,
  onSearch,
  onReset,
  da,
  setDa,
  ascore,
  setAscore,
  mediaType,
  setMediaType,
  category,
  setCategory,
  country,
  setCountry,
  googleNews,
  setGoogleNews,
  sensitiveTopics = [],
  setSensitiveTopics,
}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSearch) {
          onSearch();
        }
      };

  return (
    <div className="space-y-6 ">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Search Section */}
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by Domain name / Social / Category / Media Type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-foundations-primary"
          />
          <button 
            type="submit" 
            className="px-6 py-3 bg-foundations-primary text-white rounded hover:bg-opacity-90 transition-colors"
          >
            SUBMIT
          </button>
          <button 
  type="button"
  onClick={onReset}  // Just call onReset directly
  className="px-6 py-3 bg-foundations-secondary border rounded hover:bg-gray-200 transition-colors"
>
  RESET
</button>
        </div>

        {/* Filters Section */}
        <div className="space-y-6">
          {/* Price Range */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Minimum price"
              value={priceRange.min}
              className="p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-foundations-primary"
              onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) || 0 })}
              min="0"
            />
            <input
              type="number"
              placeholder="Maximum price"
              value={priceRange.max}
              className="p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-foundations-primary"
              onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) || 50000 })}
              min="0"
              max="50000"
            />
          </div>

          {/* Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium">DA: {da}</label>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={da}
                onChange={(e) => setDa(parseInt(e.target.value))}
                className="w-full h-1 accent-foundations-primary"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Ascore: {ascore}</label>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={ascore}
                onChange={(e) => setAscore(parseInt(e.target.value))}
                className="w-full h-1 accent-foundations-primary"
              />
            </div>
          </div>

          {/* Dropdown Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <select 
              className="p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-foundations-primary"
              value={mediaType}
              onChange={(e) => setMediaType(e.target.value)}
            >
              <option value="">Media type</option>
              <option value="Blog">Blog</option>
              <option value="Social Pages">Social Pages</option>
              <option value="Newspaper">Newspaper</option>
            </select>

            <select 
              className="p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-foundations-primary"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Category</option>
              <option value="Technology">Technology</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
            </select>

            <select 
              className="p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-foundations-primary"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">Country</option>
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Australia">Australia</option>
              <option value="Germany">Germany</option>
              <option value="France">France</option>
              <option value="Spain">Spain</option>
              <option value="Italy">Italy</option>
            </select>

            <select 
              className="p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-foundations-primary"
              value={googleNews}
              onChange={(e) => setGoogleNews(e.target.value)}
            >
              <option value="">Google News</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Checkbox Filters */}
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-medium">ACCEPTS:</span>
            {["Gambling", "CBD", "Adult", "Trading"].map((item) => (
              <label key={item} className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox"
                  checked={sensitiveTopics.includes(item)}
                  onChange={(e) => {
                    const newTopics = e.target.checked 
                      ? [...sensitiveTopics, item]
                      : sensitiveTopics.filter(topic => topic !== item);
                    setSensitiveTopics(newTopics);
                  }}
                  className="w-4 h-4 accent-foundations-primary"
                />
                <span className="text-sm">{item}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Filter Button */}
        <div className="flex justify-end mt-6">
          <button 
            type="submit" 
            className="px-6 py-3 bg-foundations-primary text-white rounded hover:bg-opacity-90 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchAndFilter;
