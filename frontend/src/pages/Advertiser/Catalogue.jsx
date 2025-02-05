// import React, { useState, useEffect, useCallback } from "react";
// import { FaEye, FaShoppingCart, FaStar } from "react-icons/fa";
// import { BiSpreadsheet, BiGridAlt } from 'react-icons/bi';
// import { useNavigate, useLocation } from "react-router-dom";
// import { websiteService, searchService, cartService, favouriteService } from "../../utils/services";
// import { toast } from "react-hot-toast";
// import SearchAndFilter from "../../components/Advertiser/Dashboard/SearchAndFilter";
// import { debounce } from 'lodash';
// import useCartStore from '../../store/cartStore';
// import { useAuthStore } from "../../store/authStore";
// import { use } from "react";

// const Catalog = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const user = useAuthStore((state) => state.user);
//   const { updateCartCount } = useCartStore();
//   const [websites, setWebsites] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [favorites, setFavorites] = useState(new Set());
//   const [showColumnModal, setShowColumnModal] = useState(false);
//   const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'
//   const [priceRange, setPriceRange] = useState({ min: 0, max: 50000 });
//   const [da, setDa] = useState(0);
//   const [ascore, setAscore] = useState(0);
//   const [mediaType, setMediaType] = useState('');
//   const [category, setCategory] = useState('');
//   const [country, setCountry] = useState('');
//   const [googleNews, setGoogleNews] = useState('');
//   const [sensitiveTopics, setSensitiveTopics] = useState([]);

//   const [visibleColumns, setVisibleColumns] = useState({
//     country: true,
//     name: true,
//     price: true,
//     type: true,
//     category: true,
//     da: false,
//     ascore: false,
//     za: false,
//     gambling: true,
//     adult: true,
//     cbd: true,
//     trading: true,
//     gnews: true,
//     bl: false,
//     edu: false,
//     gov: false,
//     date: false,
//   });

  
//   const handleAddToCart = async (websiteId) => {
//     if (!user?._id) {
//       toast.error("You need to be logged in to add items to the cart.");
//       return;
//     }
//     try {
//       await cartService.createCart(user._id, websiteId);
//       updateCartCount(user._id);
//       toast.success("Item added to cart! 🛒");
//     } catch (error) {
//       toast.error(error?.message || "Failed to add item to cart. 🚨");
//     }
//   };

//   useEffect(() => {
//     const initializeFavorites = async () => {
//       if (!user?._id) return;
      
//       try {
//         const userFavorites = await favouriteService.getFavourites(user._id);
//         const favoriteWebsiteIds = new Set(userFavorites.map(fav => fav.websiteId));
//         setFavorites(favoriteWebsiteIds);
//       } catch (error) {
//         console.error("Error fetching favorites:", error);
//       }
//     };
  
//     initializeFavorites();
//   }, [user]);

//   const handleSearch = useCallback(
//     debounce(async () => {
//       try {
//         const searchParams = {
//           userId: user._id,
//         };

//         if (searchQuery) {
//           searchParams.searchQuery = searchQuery.toLowerCase();
//         }

//         if (priceRange.min > 0 || priceRange.max < 50000) {
//           searchParams.minPrice = priceRange.min;
//           searchParams.maxPrice = priceRange.max;
//         }
//         if (da > 0) searchParams.da = da;
//         if (ascore > 0) searchParams.ascore = ascore;
//         if (mediaType) searchParams.mediaType = mediaType;
//         if (category) searchParams.category = category;
//         if (country) searchParams.country = country;
//         if (googleNews) searchParams.googleNews = googleNews === "Yes";

//         if (sensitiveTopics.length > 0) {
//           sensitiveTopics.forEach((topic) => {
//             searchParams[topic.toLowerCase()] = true;
//           });
//         }

//         const data = await searchService.searchWebsites(searchParams);
//         setWebsites(data);
//       } catch (error) {
//         console.error("Error searching websites:", error);
//       }
//     }, 300),
//     [searchQuery, priceRange, da, ascore, mediaType, category, country, googleNews, sensitiveTopics]
//   );

//   useEffect(() => {
//     const handleInitialLoad = async () => {
//       const params = new URLSearchParams(location.search);
      
//       const queryFromURL = params.get('query');
//       const minPriceFromURL = params.get('minPrice');
//       const maxPriceFromURL = params.get('maxPrice');
//       const daFromURL = params.get('da');
//       const ascoreFromURL = params.get('ascore');
//       const mediaTypeFromURL = params.get('mediaType');
//       const categoryFromURL = params.get('category');
//       const countryFromURL = params.get('country');
//       const googleNewsFromURL = params.get('googleNews');
//       const sensitiveTopicsFromURL = params.getAll('sensitiveTopics');

//       if (queryFromURL || minPriceFromURL || maxPriceFromURL || daFromURL || 
//           ascoreFromURL || mediaTypeFromURL || categoryFromURL || countryFromURL || 
//           googleNewsFromURL || sensitiveTopicsFromURL.length > 0) {
        
//         if (queryFromURL) setSearchQuery(queryFromURL);
//         if (minPriceFromURL || maxPriceFromURL) {
//           setPriceRange({
//             min: parseInt(minPriceFromURL) || 0,
//             max: parseInt(maxPriceFromURL) || 50000,
//           });
//         }
//         if (daFromURL) setDa(parseInt(daFromURL));
//         if (ascoreFromURL) setAscore(parseInt(ascoreFromURL));
//         if (mediaTypeFromURL) setMediaType(mediaTypeFromURL);
//         if (categoryFromURL) setCategory(categoryFromURL);
//         if (countryFromURL) setCountry(countryFromURL);
//         if (googleNewsFromURL) setGoogleNews(googleNewsFromURL);
//         if (sensitiveTopicsFromURL.length > 0) {
//           setSensitiveTopics(sensitiveTopicsFromURL);
//         }

//         const searchParams = {
//           userId: user._id,
//           ...(queryFromURL && { searchQuery: queryFromURL.toLowerCase() }),
//           ...(minPriceFromURL && { minPrice: parseInt(minPriceFromURL) }),
//           ...(maxPriceFromURL && { maxPrice: parseInt(maxPriceFromURL) }),
//           ...(daFromURL && { da: parseInt(daFromURL) }),
//           ...(ascoreFromURL && { ascore: parseInt(ascoreFromURL) }),
//           ...(mediaTypeFromURL && { mediaType: mediaTypeFromURL }),
//           ...(categoryFromURL && { category: categoryFromURL }),
//           ...(countryFromURL && { country: countryFromURL }),
//           ...(googleNewsFromURL && { googleNews: googleNewsFromURL === "Yes" }),
//         };

//         if (sensitiveTopicsFromURL.length > 0) {
//           sensitiveTopicsFromURL.forEach((topic) => {
//             searchParams[topic.toLowerCase()] = true;
//           });
//         }

//         try {
//           const data = await searchService.searchWebsites(user._id, searchParams);
//           setWebsites(data);
//         } catch (error) {
//           console.error("Error searching websites:", error);
//         }
//       } else {
//         try {
//           const data = await websiteService.getAllWebsites(user._id);
//           setWebsites(data);
//         } catch (error) {
//           console.error("Error fetching websites:", error);
//         }
//       }
//     };

//     handleInitialLoad();
//   }, [location.search]);

//   const handleReset = async () => {
//     setSearchQuery("");
//     setPriceRange({ min: 0, max: 50000 });
//     setDa(0);
//     setAscore(0);
//     setMediaType("");
//     setCategory("");
//     setCountry("");
//     setGoogleNews("");
//     setSensitiveTopics([]);
//     navigate('/advertiser/catalogue', { replace: true });

//     try {
//       const data = await websiteService.getAllWebsites(user._id);
//       setWebsites(data);
//     } catch (error) {
//       console.error("Error fetching websites:", error);
//     }
//   };

//   const toggleFavorite = async (websiteId) => {
//     if (!user?._id) {
//       toast.error("You need to be logged in to manage favorites.");
//       return;
//     }
//     try {
//       if (favorites.has(websiteId)) {
//         // First, get all favorites to find the favoriteId
//         const userFavorites = await favouriteService.getFavourites(user._id);
//         const favorite = userFavorites.find(fav => fav.websiteId === websiteId);
        
//         if (favorite) {
//           // Now delete using the favoriteId
//           await favouriteService.deleteFavourite(favorite._id, user._id);
//           setFavorites(prev => {
//             const newFavorites = new Set(prev);
//             newFavorites.delete(websiteId);
//             return newFavorites;
//           });
//           toast.success("Removed from favorites");
//         }
//       } else {
//         await favouriteService.createFavourite(user._id, websiteId);
//         setFavorites(prev => {
//           const newFavorites = new Set(prev);
//           newFavorites.add(websiteId);
//           return newFavorites;
//         });
//         toast.success("Added to favorites");
//       }
//     } catch (error) {
//       toast.error(error?.message || "Failed to update favorites");
//     }
//   };

//   const toggleColumn = (columnName) => {
//     setVisibleColumns(prev => ({
//       ...prev,
//       [columnName.toLowerCase()]: !prev[columnName.toLowerCase()],
//     }));
//   };

//   const handleViewProduct = (id) => {
//     navigate(`/advertiser/products/view/${id}`);
//   };

//   const renderCards = () => (
//     <div className="grid grid-cols-1 gap-4 max-w-full">
//       {websites.map((item) => (
//         <div 
//           key={item._id} 
//           className="bg-foundations-light p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
//         >
//           <div className="flex flex-wrap justify-between items-center mb-4">
//             <div>
//               <h3 className="text-xl font-extrabold text-foundations-dark tracking-tight">
//                 {item.webDomain}
//               </h3>
//               <p className="text-sm font-semibold text-foundations-primary">
//                 {item.mediaType}
//               </p>
//             </div>
//             <div className="flex gap-3 mt-2 sm:mt-0">
//               <button 
//                 className="p-3 bg-foundations-primary rounded-full text-white hover:bg-foundations-secondary transition-colors"
//                 onClick={() => handleViewProduct(item._id)}
//               >
//                 <FaEye className="w-5 h-5" />
//               </button>
//               <button 
//                 className={`p-3 rounded-full ${
//                   favorites.has(item._id)
//                     ? "bg-foundations-tertiary text-foundations-dark"
//                     : "bg-foundations-primary text-white"
//                 } hover:bg-foundations-secondary transition-colors`}
//                 onClick={() => toggleFavorite(item._id)}
//               >
//                 <FaStar className="w-5 h-5" />
//               </button>
//               <button 
//                 className="px-4 py-2 bg-foundations-primary rounded-lg text-white hover:bg-foundations-secondary transition-colors flex items-center gap-2 font-semibold"
//                 onClick={() => handleAddToCart(item._id)}
//               >
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm text-foundations-dark">
//             <div>
//               <p className="font-bold">Country: <span className="font-normal">{item.language}</span></p>
//               <p className="font-bold">Price: <span className="font-normal">€ {item.price.toFixed(2)}</span></p>
//               <p className="font-bold">Type: <span className="font-normal">{item.mediaType}</span></p>
//             </div>
//             <div>
//               <p className="font-bold">Category: <span className="font-normal">{item.category.join(", ")}</span></p>
//               <p className="font-bold">Google News: <span className="font-normal">{item.googleNews ? "✔" : "✖"}</span></p>
//             </div>
//             <div>
//               <p className="font-bold">Sensitive Topics:</p>
//               <div className="flex flex-wrap gap-2">
//                 {item.sensitiveTopics.map((topic) => (
//                   <span key={topic} className="px-2 py-1 bg-foundations-tertiary rounded-full text-xs">
//                     {topic}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );

//   const ColumnModal = () => {
//     if (!showColumnModal) return null;

//     const columnList = [
//       ["Country", "Name"],
//       ["Price", "Type"],
//       ["Category", "DA"],
//       ["Ascore", "ZA"],
//       ["Gambling", "CBD"],
//       ["Adult", "Trading"],
//       ["GNews", "BL"],
//       ["EDU", "GOV"],
//       ["Date"],
//     ];

//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//         <div className="bg-white p-4 md:p-6 rounded-lg w-full max-w-[500px] max-h-[90vh] overflow-y-auto">
//           <h2 className="text-lg md:text-xl font-bold mb-4">Change view columns</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             {columnList.map((row, index) => (
//               <React.Fragment key={index}>
//                 {row.map((column) => (
//                   <div key={column} className="flex items-center gap-2">
//                     <input
//                       type="checkbox"
//                       id={column}
//                       checked={visibleColumns[column.toLowerCase()]}
//                       onChange={() => toggleColumn(column)}
//                       className="w-4 h-4 accent-foundations-primary"
//                     />
//                     <label htmlFor={column} className="text-gray-700">{column}</label>
//                   </div>
//                 ))}
//               </React.Fragment>
//             ))}
//           </div>
//           <div className="mt-4 flex justify-end">
//             <button
//               onClick={() => setShowColumnModal(false)}
//               className="w-full sm:w-auto bg-foundations-primary text-white px-4 py-2 rounded"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="space-y-6 px-4 md:px-8 lg:px-12">
//       <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Catalog</h1>

//       <div className="flex flex-col gap-4 md:gap-6">
//         <SearchAndFilter
//           searchQuery={searchQuery}
//           setSearchQuery={setSearchQuery}
//           priceRange={priceRange}
//           setPriceRange={setPriceRange}
//           da={da}
//           setDa={setDa}
//           ascore={ascore}
//           setAscore={setAscore}
//           mediaType={mediaType}
//           setMediaType={setMediaType}
//           category={category}
//           setCategory={setCategory}
//           country={country}
//           setCountry={setCountry}
//           googleNews={googleNews}
//           setGoogleNews={setGoogleNews}
//           sensitiveTopics={sensitiveTopics}
//           setSensitiveTopics={setSensitiveTopics}
//           onSearch={handleSearch}
//           onReset={handleReset}
//         />

//         <div className="flex justify-end gap-2 mt-4">
//           <button
//             className="w-full sm:w-auto bg-foundations-primary text-white px-6 py-2 rounded hover:bg-foundations-secondary transition-colors"
//             onClick={() => setShowColumnModal(true)}
//           >
//             CHANGE COLUMNS
//           </button>
//           <button
//             className="w-full sm:w-auto bg-foundations-primary text-white px-6 py-2 rounded hover:bg-foundations-secondary transition-colors"
//             onClick={() => setViewMode(viewMode === 'table' ? 'card' : 'table')}
//           >
//             {viewMode === 'table' ? <BiGridAlt /> : <BiSpreadsheet />}
//           </button>
//         </div>

//         {websites.length === 0 ? (
//   <div className="w-full text-center py-8">
//     <p className="text-foundations-dark text-lg font-semibold">No products available.</p>
//   </div>
// ) : viewMode === 'table' ? (
//   <div className="w-full">
//     <div className="table-wrapper overflow-x-auto shadow-md sm:rounded-lg">
//       <div className="min-w-full inline-block align-middle">
//         <div className="border rounded-lg">
//           <table className="min-w-full divide-y divide-foundations-tertiary bg-foundations-light">
//             <thead className="bg-gradient-to-r from-foundations-primary to-foundations-secondary">
//               <tr>
//                 <th className="sticky left-0 z-20 p-3 text-left text-white bg-gradient-to-r from-foundations-primary to-foundations-secondary">
//                   Actions
//                 </th>
//                 {visibleColumns.country && (
//                   <th className="p-3 text-left text-white whitespace-nowrap">Country</th>
//                 )}
//                 {visibleColumns.name && (
//                   <th className="p-3 text-left text-white whitespace-nowrap">Name</th>
//                 )}
//                 {visibleColumns.price && (
//                   <th className="p-3 text-left text-white whitespace-nowrap">Price</th>
//                 )}
//                 {visibleColumns.type && (
//                   <th className="p-3 text-left text-white whitespace-nowrap">Type</th>
//                 )}
//                 {visibleColumns.category && (
//                   <th className="p-3 text-left text-white whitespace-nowrap">Category</th>
//                 )}
//                 {visibleColumns.cbd && (
//                   <th className="p-3 text-left text-white whitespace-nowrap">CBD</th>
//                 )}
//                 {visibleColumns.trading && (
//                   <th className="p-3 text-left text-white whitespace-nowrap">Trading</th>
//                 )}
//                 {visibleColumns.adult && (
//                   <th className="p-3 text-left text-white whitespace-nowrap">Adult</th>
//                 )}
//                 {visibleColumns.gambling && (
//                   <th className="p-3 text-left text-white whitespace-nowrap">Gambling</th>
//                 )}
//                 {visibleColumns.da && (
//                   <th className="p-3 text-left text-white whitespace-nowrap">DA</th>
//                 )}
//                 {visibleColumns.ascore && (
//                   <th className="p-3 text-left text-white whitespace-nowrap">AScore</th>
//                 )}
//                 {visibleColumns.za && (
//                   <th className="p-3 text-left text-white whitespace-nowrap">ZA</th>
//                 )}
//                 {visibleColumns.gnews && (
//                   <th className="p-3 text-left text-white whitespace-nowrap">GNews</th>
//                 )}
//                 {visibleColumns.bl && (
//                   <th className="p-3 text-left text-white whitespace-nowrap">BL</th>
//                 )}
//                 {visibleColumns.edu && (
//                   <th className="p-3 text-left text-white whitespace-nowrap">EDU</th>
//                 )}
//                 {visibleColumns.gov && (
//                   <th className="p-3 text-left text-white whitespace-nowrap">GOV</th>
//                 )}
//                 {visibleColumns.date && (
//                   <th className="p-3 text-left text-white whitespace-nowrap">Date</th>
//                 )}
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-foundations-tertiary">
//               {websites.map((item) => (
//                 <tr key={item._id} className="hover:bg-foundations-secondary transition-colors">
//                   <td className="sticky left-0 z-10 p-3 bg-white">
//                     <div className="flex gap-2">
//                       <button
//                         className="p-2 bg-foundations-primary rounded-full text-white hover:bg-foundations-secondary transition-colors"
//                         onClick={() => handleViewProduct(item._id)}
//                       >
//                         <FaEye />
//                       </button>
//                       <button
//                         className="p-2 bg-foundations-primary rounded-full text-white hover:bg-foundations-secondary transition-colors"
//                         onClick={() => handleAddToCart(item._id)}
//                       >
//                         <FaShoppingCart />
//                       </button>
//                       <button
//                         className={`p-2 rounded-full ${
//                           favorites.has(item._id)
//                             ? "bg-foundations-tertiary text-foundations-dark"
//                             : "bg-foundations-primary text-white"
//                         } hover:bg-foundations-secondary transition-colors`}
//                         onClick={() => toggleFavorite(item._id)}
//                       >
//                         <FaStar />
//                       </button>
//                     </div>
//                   </td>
//                   {visibleColumns.country && (
//                     <td className="p-3 text-foundations-dark whitespace-nowrap">{item.language}</td>
//                   )}
//                   {visibleColumns.name && (
//                     <td className="p-3 text-foundations-dark whitespace-nowrap">{item.webDomain}</td>
//                   )}
//                   {visibleColumns.price && (
//                     <td className="p-3 text-foundations-dark whitespace-nowrap">€ {item.price.toFixed(2)}</td>
//                   )}
//                   {visibleColumns.type && (
//                     <td className="p-3 text-foundations-dark whitespace-nowrap">{item.mediaType}</td>
//                   )}
//                   {visibleColumns.category && (
//                     <td className="p-3 text-foundations-dark whitespace-nowrap">
//                       <div className="relative group">
//                         <span>{item.category[0]}</span>
//                         {item.category.length > 1 && (
//                           <span className="ml-1 text-foundations-tertiary">
//                             +{item.category.length - 1}
//                           </span>
//                         )}
//                         {item.category.length > 1 && (
//                           <div className="absolute hidden group-hover:block left-0 mt-1 p-2 bg-white border rounded shadow-lg z-20">
//                             {item.category.join(", ")}
//                           </div>
//                         )}
//                       </div>
//                     </td>
//                   )}
//                   {visibleColumns.cbd && (
//                     <td className="p-3 text-foundations-dark whitespace-nowrap">
//                       {item.sensitiveTopics?.includes("CBD") ? "✔" : "✖"}
//                     </td>
//                   )}
//                   {visibleColumns.trading && (
//                     <td className="p-3 text-foundations-dark whitespace-nowrap">
//                       {item.sensitiveTopics?.includes("Trading") ? "✔" : "✖"}
//                     </td>
//                   )}
//                   {visibleColumns.adult && (
//                     <td className="p-3 text-foundations-dark whitespace-nowrap">
//                       {item.sensitiveTopics?.includes("Adult") ? "✔" : "✖"}
//                     </td>
//                   )}
//                   {visibleColumns.gambling && (
//                     <td className="p-3 text-foundations-dark whitespace-nowrap">
//                       {item.sensitiveTopics?.includes("Gambling") ? "✔" : "✖"}
//                     </td>
//                   )}
//                   {visibleColumns.da && <td className="p-3 text-foundations-dark whitespace-nowrap">-</td>}
//                   {visibleColumns.ascore && <td className="p-3 text-foundations-dark whitespace-nowrap">-</td>}
//                   {visibleColumns.za && <td className="p-3 text-foundations-dark whitespace-nowrap">-</td>}
//                   {visibleColumns.gnews && (
//                     <td className="p-3 text-foundations-dark whitespace-nowrap">
//                       {item.googleNews ? "✔" : "✖"}
//                     </td>
//                   )}
//                   {visibleColumns.bl && <td className="p-3 text-foundations-dark whitespace-nowrap">-</td>}
//                   {visibleColumns.edu && (
//                     <td className="p-3 text-foundations-dark whitespace-nowrap">
//                       {item.category.includes("Education") ? "✔" : "✖"}
//                     </td>
//                   )}
//                   {visibleColumns.gov && <td className="p-3 text-foundations-dark whitespace-nowrap">✖</td>}
//                   {visibleColumns.date && (
//                     <td className="p-3 text-foundations-dark whitespace-nowrap">
//                       {new Date(item.createdAt).toLocaleDateString()}
//                     </td>
//                   )}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   </div>
// ) : (
//   renderCards()
// )}
//       </div>

//       <ColumnModal />
//     </div>
//   );
// };

// export default Catalog;

import Loader from "../../components/Loader";
import React, { useState, useEffect, useCallback } from "react";
import { FaEye, FaShoppingCart, FaStar } from "react-icons/fa";
import { BiSpreadsheet, BiGridAlt } from 'react-icons/bi';
import { useNavigate, useLocation } from "react-router-dom";
import { websiteService, searchService, cartService, favouriteService } from "../../utils/services";
import { toast } from "react-hot-toast";
import SearchAndFilter from "../../components/Advertiser/Dashboard/SearchAndFilter";
import { debounce } from 'lodash';
import useCartStore from '../../store/cartStore';
import { useAuthStore } from "../../store/authStore";

const Catalog = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const { updateCartCount } = useCartStore();
  const [websites, setWebsites] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState(new Set());
  const [showColumnModal, setShowColumnModal] = useState(false);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'
  const [priceRange, setPriceRange] = useState({ min: 0, max: 50000 });
  const [da, setDa] = useState(0);
  const [ascore, setAscore] = useState(0);
  const [mediaType, setMediaType] = useState('');
  const [category, setCategory] = useState('');
  const [country, setCountry] = useState('');
  const [googleNews, setGoogleNews] = useState('');
  const [sensitiveTopics, setSensitiveTopics] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState({
    country: true,
    name: true,
    price: true,
    type: true,
    category: true,
    da: false,
    ascore: false,
    za: false,
    gambling: true,
    adult: true,
    cbd: true,
    trading: true,
    gnews: true,
    bl: false,
    edu: false,
    gov: false,
    date: false,
  });
  
  // New loading state
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async (websiteId) => {
    if (!user?._id) {
      toast.error("You need to be logged in to add items to the cart.");
      return;
    }
    try {
      setLoading(true); // Start loading
      await cartService.createCart(user._id, websiteId);
      updateCartCount(user._id);
      toast.success("Item added to cart! 🛒");
    } catch (error) {
      toast.error(error?.message || "Failed to add item to cart. 🚨");
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    const initializeFavorites = async () => {
      if (!user?._id) return;
      
      try {
        setLoading(true); // Start loading
        const userFavorites = await favouriteService.getFavourites(user._id);
        const favoriteWebsiteIds = new Set(userFavorites.map(fav => fav.websiteId));
        setFavorites(favoriteWebsiteIds);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setLoading(false); // End loading
      }
    };
  
    initializeFavorites();
  }, [user]);

  const handleSearch = useCallback(
    debounce(async () => {
      try {
        setLoading(true); // Start loading
        const searchParams = {
          userId: user._id,
        };

        if (searchQuery) {
          searchParams.searchQuery = searchQuery.toLowerCase();
        }

        if (priceRange.min > 0 || priceRange.max < 50000) {
          searchParams.minPrice = priceRange.min;
          searchParams.maxPrice = priceRange.max;
        }
        if (da > 0) searchParams.da = da;
        if (ascore > 0) searchParams.ascore = ascore;
        if (mediaType) searchParams.mediaType = mediaType;
        if (category) searchParams.category = category;
        if (country) searchParams.country = country;
        if (googleNews) searchParams.googleNews = googleNews === "Yes";

        if (sensitiveTopics.length > 0) {
          sensitiveTopics.forEach((topic) => {
            searchParams[topic.toLowerCase()] = true;
          });
        }

        const data = await searchService.searchWebsites(searchParams);
        setWebsites(data);
      } catch (error) {
        console.error("Error searching websites:", error);
      } finally {
        setLoading(false); // End loading
      }
    }, 300),
    [searchQuery, priceRange, da, ascore, mediaType, category, country, googleNews, sensitiveTopics]
  );

  useEffect(() => {
    const handleInitialLoad = async () => {
      const params = new URLSearchParams(location.search);
      
      const queryFromURL = params.get('query');
      const minPriceFromURL = params.get('minPrice');
      const maxPriceFromURL = params.get('maxPrice');
      const daFromURL = params.get('da');
      const ascoreFromURL = params.get('ascore');
      const mediaTypeFromURL = params.get('mediaType');
      const categoryFromURL = params.get('category');
      const countryFromURL = params.get('country');
      const googleNewsFromURL = params.get('googleNews');
      const sensitiveTopicsFromURL = params.getAll('sensitiveTopics');

      if (queryFromURL || minPriceFromURL || maxPriceFromURL || daFromURL || 
          ascoreFromURL || mediaTypeFromURL || categoryFromURL || countryFromURL || 
          googleNewsFromURL || sensitiveTopicsFromURL.length > 0) {
        
        if (queryFromURL) setSearchQuery(queryFromURL);
        if (minPriceFromURL || maxPriceFromURL) {
          setPriceRange({
            min: parseInt(minPriceFromURL) || 0,
            max: parseInt(maxPriceFromURL) || 50000,
          });
        }
        if (daFromURL) setDa(parseInt(daFromURL));
        if (ascoreFromURL) setAscore(parseInt(ascoreFromURL));
        if (mediaTypeFromURL) setMediaType(mediaTypeFromURL);
        if (categoryFromURL) setCategory(categoryFromURL);
        if (countryFromURL) setCountry(countryFromURL);
        if (googleNewsFromURL) setGoogleNews(googleNewsFromURL);
        if (sensitiveTopicsFromURL.length > 0) {
          setSensitiveTopics(sensitiveTopicsFromURL);
        }

        const searchParams = {
          userId: user._id,
          ...(queryFromURL && { searchQuery: queryFromURL.toLowerCase() }),
          ...(minPriceFromURL && { minPrice: parseInt(minPriceFromURL) }),
          ...(maxPriceFromURL && { maxPrice: parseInt(maxPriceFromURL) }),
          ...(daFromURL && { da: parseInt(daFromURL) }),
          ...(ascoreFromURL && { ascore: parseInt(ascoreFromURL) }),
          ...(mediaTypeFromURL && { mediaType: mediaTypeFromURL }),
          ...(categoryFromURL && { category: categoryFromURL }),
          ...(countryFromURL && { country: countryFromURL }),
          ...(googleNewsFromURL && { googleNews: googleNewsFromURL === "Yes" }),
        };

        if (sensitiveTopicsFromURL.length > 0) {
          sensitiveTopicsFromURL.forEach((topic) => {
            searchParams[topic.toLowerCase()] = true;
          });
        }

        try {
          setLoading(true); // Start loading
          const data = await searchService.searchWebsites(user._id, searchParams);
          setWebsites(data);
        } catch (error) {
          console.error("Error searching websites:", error);
        } finally {
          setLoading(false); // End loading
        }
      } else {
        try {
          setLoading(true); // Start loading
          const data = await websiteService.getAllWebsites(user._id);
          setWebsites(data);
        } catch (error) {
          console.error("Error fetching websites:", error);
        } finally {
          setLoading(false); // End loading
        }
      }
    };

    handleInitialLoad();
  }, [location.search]);

  const handleReset = async () => {
    setSearchQuery("");
    setPriceRange({ min: 0, max: 50000 });
    setDa(0);
    setAscore(0);
    setMediaType("");
    setCategory("");
    setCountry("");
    setGoogleNews("");
    setSensitiveTopics([]);
    navigate('/advertiser/catalogue', { replace: true });

    try {
      setLoading(true); // Start loading
      const data = await websiteService.getAllWebsites(user._id);
      setWebsites(data);
    } catch (error) {
      console.error("Error fetching websites:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  const toggleFavorite = async (websiteId) => {
    if (!user?._id) {
      toast.error("You need to be logged in to manage favorites.");
      return;
    }
    try {
      setLoading(true); // Start loading
      if (favorites.has(websiteId)) {
        // First, get all favorites to find the favoriteId
        const userFavorites = await favouriteService.getFavourites(user._id);
        const favorite = userFavorites.find(fav => fav.websiteId === websiteId);
        
        if (favorite) {
          // Now delete using the favoriteId
          await favouriteService.deleteFavourite(favorite._id, user._id);
          setFavorites(prev => {
            const newFavorites = new Set(prev);
            newFavorites.delete(websiteId);
            return newFavorites;
          });
          toast.success("Removed from favorites");
        }
      } else {
        await favouriteService.createFavourite(user._id, websiteId);
        setFavorites(prev => {
          const newFavorites = new Set(prev);
          newFavorites.add(websiteId);
          return newFavorites;
        });
        toast.success("Added to favorites");
      }
    } catch (error) {
      toast.error(error?.message || "Failed to update favorites");
    } finally {
      setLoading(false); // End loading
    }
  };

  const toggleColumn = (columnName) => {
    setVisibleColumns(prev => ({
      ...prev,
      [columnName.toLowerCase()]: !prev[columnName.toLowerCase()],
    }));
  };

  const handleViewProduct = (id) => {
    navigate(`/advertiser/products/view/${id}`);
  };

  const renderCards = () => (
    <div className="grid grid-cols-1 gap-4 max-w-full">
      {websites.map((item) => (
        <div 
          key={item._id} 
          className="bg-foundations-light p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="flex flex-wrap justify-between items-center mb-4">
            <div>
              <h3 className="text-xl font-extrabold text-foundations-dark tracking-tight">
                {item.webDomain}
              </h3>
              <p className="text-sm font-semibold text-foundations-primary">
                {item.mediaType}
              </p>
            </div>
            <div className="flex gap-3 mt-2 sm:mt-0">
              <button 
                className="p-3 bg-foundations-primary rounded-full text-white hover:bg-foundations-secondary transition-colors"
                onClick={() => handleViewProduct(item._id)}
              >
                <FaEye className="w-5 h-5" />
              </button>
              <button 
                className={`p-3 rounded-full ${
                  favorites.has(item._id)
                    ? "bg-foundations-tertiary text-foundations-dark"
                    : "bg-foundations-primary text-white"
                } hover:bg-foundations-secondary transition-colors`}
                onClick={() => toggleFavorite(item._id)}
              >
                <FaStar className="w-5 h-5" />
              </button>
              <button 
                className="px-4 py-2 bg-foundations-primary rounded-lg text-white hover:bg-foundations-secondary transition-colors flex items-center gap-2 font-semibold"
                onClick={() => handleAddToCart(item._id)}
              >
                Add to Cart
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm text-foundations-dark">
            <div>
              <p className="font-bold">Country: <span className="font-normal">{item.language}</span></p>
              <p className="font-bold">Price: <span className="font-normal">€ {item.price.toFixed(2)}</span></p>
              <p className="font-bold">Type: <span className="font-normal">{item.mediaType}</span></p>
            </div>
            <div>
              <p className="font-bold">Category: <span className="font-normal">{item.category.join(", ")}</span></p>
              <p className="font-bold">Google News: <span className="font-normal">{item.googleNews ? "✔" : "✖"}</span></p>
            </div>
            <div>
              <p className="font-bold">Sensitive Topics:</p>
              <div className="flex flex-wrap gap-2">
                {item.sensitiveTopics.map((topic) => (
                  <span key={topic} className="px-2 py-1 bg-foundations-tertiary rounded-full text-xs">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const ColumnModal = () => {
    if (!showColumnModal) return null;

    const columnList = [
      ["Country", "Name"],
      ["Price", "Type"],
      ["Category", "DA"],
      ["Ascore", "ZA"],
      ["Gambling", "CBD"],
      ["Adult", "Trading"],
      ["GNews", "BL"],
      ["EDU", "GOV"],
      ["Date"],
    ];

    return (
      <div className=" bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white p-4 md:p-6 rounded-lg w-full max-w-[500px] max-h-[90vh] overflow-y-auto">
          <h2 className="text-lg md:text-xl font-bold mb-4">Change view columns</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {columnList.map((row, index) => (
              <React.Fragment key={index}>
                {row.map((column) => (
                  <div key={column} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={column}
                      checked={visibleColumns[column.toLowerCase()]}
                      onChange={() => toggleColumn(column)}
                      className="w-4 h-4 accent-foundations-primary"
                    />
                    <label htmlFor={column} className="text-gray-700">{column}</label>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => setShowColumnModal(false)}
              className="w-full sm:w-auto bg-foundations-primary text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
    {loading && <Loader />} {/* Show loader when loading */}
    <div className="space-y-6 px-4 md:px-8 lg:px-12">
      <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Catalog</h1>

      

      <div className="flex flex-col gap-4 md:gap-6">
        <SearchAndFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          da={da}
          setDa={setDa}
          ascore={ascore}
          setAscore={setAscore}
          mediaType={mediaType}
          setMediaType={setMediaType}
          category={category}
          setCategory={setCategory}
          country={country}
          setCountry={setCountry}
          googleNews={googleNews}
          setGoogleNews={setGoogleNews}
          sensitiveTopics={sensitiveTopics}
          setSensitiveTopics={setSensitiveTopics}
          onSearch={handleSearch}
          onReset={handleReset}
        />

        <div className="flex justify-end gap-2 mt-4">
          <button
            className="w-full sm:w-auto bg-foundations-primary text-white px-6 py-2 rounded hover:bg-foundations-secondary transition-colors"
            onClick={() => setShowColumnModal(true)}
          >
            CHANGE COLUMNS
          </button>
          <button
            className="w-full sm:w-auto bg-foundations-primary text-white px-6 py-2 rounded hover:bg-foundations-secondary transition-colors"
            onClick={() => setViewMode(viewMode === 'table' ? 'card' : 'table')}
          >
            {viewMode === 'table' ? <BiGridAlt /> : <BiSpreadsheet />}
          </button>
        </div>

        {websites.length === 0 ? (
          <div className="w-full text-center py-8">
            <p className="text-foundations-dark text-lg font-semibold">No products available.</p>
          </div>
        ) : viewMode === 'table' ? (
          <div className="w-full">
            <div className="table-wrapper overflow-x-auto shadow-md sm:rounded-lg">
              <div className="min-w-full inline-block align-middle">
                <div className="border rounded-lg">
                  <table className="min-w-full divide-y divide-foundations-tertiary bg-foundations-light">
                    <thead className="bg-gradient-to-r from-foundations-primary to-foundations-secondary">
                      <tr>
                        <th className="sticky left-0 z-20 p-3 text-left text-white bg-gradient-to-r from-foundations-primary to-foundations-secondary">
                          Actions
                        </th>
                        {visibleColumns.country && (
                          <th className="p-3 text-left text-white whitespace-nowrap">Country</th>
                        )}
                        {visibleColumns.name && (
                          <th className="p-3 text-left text-white whitespace-nowrap">Name</th>
                        )}
                        {visibleColumns.price && (
                          <th className="p-3 text-left text-white whitespace-nowrap">Price</th>
                        )}
                        {visibleColumns.type && (
                          <th className="p-3 text-left text-white whitespace-nowrap">Type</th>
                        )}
                        {visibleColumns.category && (
                          <th className="p-3 text-left text-white whitespace-nowrap">Category</th>
                        )}
                        {visibleColumns.cbd && (
                          <th className="p-3 text-left text-white whitespace-nowrap">CBD</th>
                        )}
                        {visibleColumns.trading && (
                          <th className="p-3 text-left text-white whitespace-nowrap">Trading</th>
                        )}
                        {visibleColumns.adult && (
                          <th className="p-3 text-left text-white whitespace-nowrap">Adult</th>
                        )}
                        {visibleColumns.gambling && (
                          <th className="p-3 text-left text-white whitespace-nowrap">Gambling</th>
                        )}
                        {visibleColumns.da && (
                          <th className="p-3 text-left text-white whitespace-nowrap">DA</th>
                        )}
                        {visibleColumns.ascore && (
                          <th className="p-3 text-left text-white whitespace-nowrap">AScore</th>
                        )}
                        {visibleColumns.za && (
                          <th className="p-3 text-left text-white whitespace-nowrap">ZA</th>
                        )}
                        {visibleColumns.gnews && (
                          <th className="p-3 text-left text-white whitespace-nowrap">GNews</th>
                        )}
                        {visibleColumns.bl && (
                          <th className="p-3 text-left text-white whitespace-nowrap">BL</th>
                        )}
                        {visibleColumns.edu && (
                          <th className="p-3 text-left text-white whitespace-nowrap">EDU</th>
                        )}
                        {visibleColumns.gov && (
                          <th className="p-3 text-left text-white whitespace-nowrap">GOV</th>
                        )}
                        {visibleColumns.date && (
                          <th className="p-3 text-left text-white whitespace-nowrap">Date</th>
                        )}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-foundations-tertiary">
                      {websites.map((item) => (
                        <tr key={item._id} className="hover:bg-foundations-secondary transition-colors">
                          <td className="sticky left-0 z-10 p-3 bg-white">
                            <div className="flex gap-2">
                              <button
                                className="p-2 bg-foundations-primary rounded-full text-white hover:bg-foundations-secondary transition-colors"
                                onClick={() => handleViewProduct(item._id)}
                              >
                                <FaEye />
                              </button>
                              <button
                                className="p-2 bg-foundations-primary rounded-full text-white hover:bg-foundations-secondary transition-colors"
                                onClick={() => handleAddToCart(item._id)}
                              >
                                <FaShoppingCart />
                              </button>
                              <button
                                className={`p-2 rounded-full ${
                                  favorites.has(item._id)
                                    ? "bg-foundations-tertiary text-foundations-dark"
                                    : "bg-foundations-primary text-white"
                                } hover:bg-foundations-secondary transition-colors`}
                                onClick={() => toggleFavorite(item._id)}
                              >
                                <FaStar />
                              </button>
                            </div>
                          </td>
                          {visibleColumns.country && (
                            <td className="p-3 text-foundations-dark whitespace-nowrap">{item.language}</td>
                          )}
                          {visibleColumns.name && (
                            <td className="p-3 text-foundations-dark whitespace-nowrap">{item.webDomain}</td>
                          )}
                          {visibleColumns.price && (
                            <td className="p-3 text-foundations-dark whitespace-nowrap">€ {item.price.toFixed(2)}</td>
                          )}
                          {visibleColumns.type && (
                            <td className="p-3 text-foundations-dark whitespace-nowrap">{item.mediaType}</td>
                          )}
                          {visibleColumns.category && (
                            <td className="p-3 text-foundations-dark whitespace-nowrap">
                              <div className="relative group">
                                <span>{item.category[0]}</span>
                                {item.category.length > 1 && (
                                  <span className="ml-1 text-foundations-tertiary">
                                    +{item.category.length - 1}
                                  </span>
                                )}
                                {item.category.length > 1 && (
                                  <div className="absolute hidden group-hover:block left-0 mt-1 p-2 bg-white border rounded shadow-lg z-20">
                                    {item.category.join(", ")}
                                  </div>
                                )}
                              </div>
                            </td>
                          )}
                          {visibleColumns.cbd && (
                            <td className="p-3 text-foundations-dark whitespace-nowrap">
                              {item.sensitiveTopics?.includes("CBD") ? "✔" : "✖"}
                            </td>
                          )}
                          {visibleColumns.trading && (
                            <td className="p-3 text-foundations-dark whitespace-nowrap">
                              {item.sensitiveTopics?.includes("Trading") ? "✔" : "✖"}
                            </td>
                          )}
                          {visibleColumns.adult && (
                            <td className="p-3 text-foundations-dark whitespace-nowrap">
                              {item.sensitiveTopics?.includes("Adult") ? "✔" : "✖"}
                            </td>
                          )}
                          {visibleColumns.gambling && (
                            <td className="p-3 text-foundations-dark whitespace-nowrap">
                              {item.sensitiveTopics?.includes("Gambling") ? "✔" : "✖"}
                            </td>
                          )}
                          {visibleColumns.da && <td className="p-3 text-foundations-dark whitespace-nowrap">-</td>}
                          {visibleColumns.ascore && <td className="p-3 text-foundations-dark whitespace-nowrap">-</td>}
                          {visibleColumns.za && <td className="p-3 text-foundations-dark whitespace-nowrap">-</td>}
                          {visibleColumns.gnews && (
                            <td className="p-3 text-foundations-dark whitespace-nowrap">
                              {item.googleNews ? "✔" : "✖"}
                            </td>
                          )}
                          {visibleColumns.bl && <td className="p-3 text-foundations-dark whitespace-nowrap">-</td>}
                          {visibleColumns.edu && (
                            <td className="p-3 text-foundations-dark whitespace-nowrap">
                              {item.category.includes("Education") ? "✔" : "✖"}
                            </td>
                          )}
                          {visibleColumns.gov && <td className="p-3 text-foundations-dark whitespace-nowrap">✖</td>}
                          {visibleColumns.date && (
                            <td className="p-3 text-foundations-dark whitespace-nowrap">
                              {new Date(item.createdAt).toLocaleDateString()}
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : (
          renderCards()
        )}
      </div>

      <ColumnModal />
    </div>
    </>
  );
};

export default Catalog;