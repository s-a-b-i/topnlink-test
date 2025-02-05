// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { BiSpreadsheet, BiGridAlt } from 'react-icons/bi';
// import { FaEye, FaShoppingCart, FaStar } from "react-icons/fa";
// import { favouriteService, websiteService, cartService } from '../../utils/services';
// import { toast } from 'react-hot-toast';
// import { useAuthStore } from "../../store/authStore";
// import useCartStore from '../../store/cartStore';

// const Favorite = () => {
//   const navigate = useNavigate();
//   const [favorites, setFavorites] = useState([]);
//   const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'
//   const user = useAuthStore((state) => state.user);
//   const { updateCartCount } = useCartStore();
//   const [visibleColumns, setVisibleColumns] = useState({
//     country: true,
//     name: true,
//     price: true,
//     type: true,
//     category: true,
//     cbd: true,
//     trading: true,
//     adult: true,
//     gambling: true,
//     da: false,
//     ascore: false,
//     za: false,
//     gnews: true,
//     bl: false,
//     edu: false,
//     gov: false,
//     date: false,
//   });
//   const [showColumnModal, setShowColumnModal] = useState(false);

//   useEffect(() => {
//     if (user?._id) {
//       fetchFavorites(user._id);
//     }
//   }, [user]);

//   const fetchFavorites = async (userId) => {
//     try {
//       const favoritesData = await favouriteService.getFavourites(userId);
//       const websiteDetailsPromises = favoritesData.map(async (favorite) => {
//         try {
//           // Updated to match the new API signature - passing both websiteId and userId
//           const websiteDetails = await websiteService.getWebsiteById(favorite.websiteId, userId);
//           return {
//             ...websiteDetails,
//             favoriteId: favorite._id
//           };
//         } catch (error) {
//           console.error(`Failed to fetch website details for ID: ${favorite.websiteId}`);
//           return null;
//         }
//       });
  
//       const websiteDetails = await Promise.all(websiteDetailsPromises);
//       const validWebsites = websiteDetails.filter(website => website !== null);
//       setFavorites(validWebsites);
//     } catch (error) {
//       toast.error("Failed to fetch favorites");
//     }
//   };

//   const removeFavorite = async (favoriteId) => {
//     try {
//       await favouriteService.deleteFavourite(favoriteId, user._id);
//       await fetchFavorites(user._id);
//       toast.success("Removed from favorites");
//     } catch (error) {
//       toast.error("Failed to remove favorite");
//     }
//   };

//   const handleAddToCart = async (websiteId) => {
//     if (!user?._id) {
//       toast.error("Please login to add items to cart");
//       return;
//     }
//     try {
//       await cartService.createCart(user._id, websiteId);
//       updateCartCount(user._id);
//       toast.success("Item added to cart!");
//     } catch (error) {
//       toast.error(error?.message || "Failed to add item to cart");
//     }
//   };

//   const handleViewProduct = (id) => {
//     navigate(`/advertiser/products/view/${id}`);
//   };

//   const toggleColumn = (columnName) => {
//     setVisibleColumns((prev) => ({
//       ...prev,
//       [columnName.toLowerCase()]: !prev[columnName.toLowerCase()],
//     }));
//   };

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

//   const renderTable = () => (
//     <div className="table-wrapper overflow-x-auto shadow-md sm:rounded-lg">
//       <div className="min-w-full inline-block align-middle">
//         <div className="border rounded-lg">
//           <table className="min-w-full divide-y divide-foundations-tertiary bg-foundations-light">
//             <thead className="bg-gradient-to-r from-foundations-primary to-foundations-secondary">
//               <tr>
//                 <th className="sticky left-0 z-20 p-3 text-left text-white bg-gradient-to-r from-foundations-primary to-foundations-secondary">
//                   Actions
//                 </th>
//                 {visibleColumns.country && <th className="p-3 text-left text-white whitespace-nowrap">Country</th>}
//                 {visibleColumns.name && <th className="p-3 text-left text-white whitespace-nowrap">Name</th>}
//                 {visibleColumns.price && <th className="p-3 text-left text-white whitespace-nowrap">Price</th>}
//                 {visibleColumns.type && <th className="p-3 text-left text-white whitespace-nowrap">Type</th>}
//                 {visibleColumns.category && <th className="p-3 text-left text-white whitespace-nowrap">Category</th>}
//                 {visibleColumns.cbd && <th className="p-3 text-left text-white whitespace-nowrap">CBD</th>}
//                 {visibleColumns.trading && <th className="p-3 text-left text-white whitespace-nowrap">Trading</th>}
//                 {visibleColumns.adult && <th className="p-3 text-left text-white whitespace-nowrap">Adult</th>}
//                 {visibleColumns.gambling && <th className="p-3 text-left text-white whitespace-nowrap">Gambling</th>}
//                 {visibleColumns.da && <th className="p-3 text-left text-white whitespace-nowrap">DA</th>}
//                 {visibleColumns.ascore && <th className="p-3 text-left text-white whitespace-nowrap">AScore</th>}
//                 {visibleColumns.za && <th className="p-3 text-left text-white whitespace-nowrap">ZA</th>}
//                 {visibleColumns.gnews && <th className="p-3 text-left text-white whitespace-nowrap">GNews</th>}
//                 {visibleColumns.bl && <th className="p-3 text-left text-white whitespace-nowrap">BL</th>}
//                 {visibleColumns.edu && <th className="p-3 text-left text-white whitespace-nowrap">EDU</th>}
//                 {visibleColumns.gov && <th className="p-3 text-left text-white whitespace-nowrap">GOV</th>}
//                 {visibleColumns.date && <th className="p-3 text-left text-white whitespace-nowrap">Date</th>}
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-foundations-tertiary">
//               {favorites.map((website) => (
//                 <tr key={website._id} className="hover:bg-foundations-secondary transition-colors">
//                   <td className="sticky left-0 z-10 p-3 bg-white">
//                     <div className="flex gap-2">
//                       <button
//                         className="p-2 bg-foundations-primary rounded-full text-white hover:bg-foundations-secondary transition-colors"
//                         onClick={() => handleViewProduct(website._id)}
//                       >
//                         <FaEye />
//                       </button>
//                       <button
//                         className="p-2 bg-foundations-primary rounded-full text-white hover:bg-foundations-secondary transition-colors"
//                         onClick={() => handleAddToCart(website._id)}
//                       >
//                         <FaShoppingCart />
//                       </button>
//                       <button
//                         className="p-2 bg-foundations-tertiary rounded-full text-foundations-dark hover:bg-foundations-secondary transition-colors"
//                         onClick={() => removeFavorite(website.favoriteId)}
//                       >
//                         <FaStar />
//                       </button>
//                     </div>
//                   </td>
//                   {visibleColumns.country && <td className="p-3 text-foundations-dark whitespace-nowrap">{website.language}</td>}
//                   {visibleColumns.name && <td className="p-3 text-foundations-dark whitespace-nowrap">{website.webDomain}</td>}
//                   {visibleColumns.price && <td className="p-3 text-foundations-dark whitespace-nowrap">€ {website.price.toFixed(2)}</td>}
//                   {visibleColumns.type && <td className="p-3 text-foundations-dark whitespace-nowrap">{website.mediaType}</td>}
//                   {visibleColumns.category && (
//                     <td className="p-3 text-foundations-dark whitespace-nowrap">
//                       <div className="relative group">
//                         <span>{website.category[0]}</span>
//                         {website.category.length > 1 && (
//                           <span className="ml-1 text-foundations-tertiary">
//                             +{website.category.length - 1}
//                           </span>
//                         )}
//                         {website.category.length > 1 && (
//                           <div className="absolute hidden group-hover:block left-0 mt-1 p-2 bg-white border rounded shadow-lg z-20">
//                             {website.category.join(", ")}
//                           </div>
//                         )}
//                       </div>
//                     </td>
//                   )}
//                   {visibleColumns.cbd && (
//                     <td className="p-3 text-foundations-dark whitespace-nowrap">
//                       {website.sensitiveTopics?.includes("CBD") ? "✔" : "✖"}
//                     </td>
//                   )}
//                   {visibleColumns.trading && (
//                     <td className="p-3 text-foundations-dark whitespace-nowrap">
//                       {website.sensitiveTopics?.includes("Trading") ? "✔" : "✖"}
//                     </td>
//                   )}
//                   {visibleColumns.adult && (
//                     <td className="p-3 text-foundations-dark whitespace-nowrap">
//                       {website.sensitiveTopics?.includes("Adult") ? "✔" : "✖"}
//                     </td>
//                   )}
//                   {visibleColumns.gambling && (
//                     <td className="p-3 text-foundations-dark whitespace-nowrap">
//                       {website.sensitiveTopics?.includes("Gambling") ? "✔" : "✖"}
//                     </td>
//                   )}
//                   {visibleColumns.da && <td className="p-3 text-foundations-dark whitespace-nowrap">-</td>}
//                   {visibleColumns.ascore && <td className="p-3 text-foundations-dark whitespace-nowrap">-</td>}
//                   {visibleColumns.za && <td className="p-3 text-foundations-dark whitespace-nowrap">-</td>}
//                   {visibleColumns.gnews && (
//                     <td className="p-3 text-foundations-dark whitespace-nowrap">
//                       {website.googleNews ? "✔" : "✖"}
//                     </td>
//                   )}
//                   {visibleColumns.bl && <td className="p-3 text-foundations-dark whitespace-nowrap">-</td>}
//                   {visibleColumns.edu && (
//                     <td className="p-3 text-foundations-dark whitespace-nowrap">
//                       {website.category.includes("Education") ? "✔" : "✖"}
//                     </td>
//                   )}
//                   {visibleColumns.gov && <td className="p-3 text-foundations-dark whitespace-nowrap">✖</td>}
//                   {visibleColumns.date && (
//                     <td className="p-3 text-foundations-dark whitespace-nowrap">
//                       {new Date(website.createdAt).toLocaleDateString()}
//                     </td>
//                   )}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );

//   const renderCards = () => (
//     <div className="grid grid-cols-1 gap-4 max-w-full">
//       {favorites.map((website) => (
//         <div 
//           key={website._id} 
//           className="bg-foundations-light p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
//         >
//           <div className="flex flex-wrap justify-between items-center mb-4">
//             <div>
//               <h3 className="text-xl font-extrabold text-foundations-dark tracking-tight">
//                 {website.webDomain}
//               </h3>
//               <p className="text-sm font-semibold text-foundations-primary">
//                 {website.mediaType}
//               </p>
//             </div>
//             <div className="flex gap-3 mt-2 sm:mt-0">
//               <button 
//                 className="p-3 bg-foundations-primary rounded-full text-white hover:bg-foundations-secondary transition-colors"
//                 onClick={() => handleViewProduct(website._id)}
//               >
//                 <FaEye className="w-5 h-5" />
//               </button>
//               <button 
//                 className="p-3 bg-foundations-tertiary rounded-full text-foundations-dark hover:bg-foundations-secondary transition-colors"
//                 onClick={() => removeFavorite(website.favoriteId)}
//               >
//                 <FaStar className="w-5 h-5" />
//               </button>
//               <button 
//                 className="px-4 py-2 bg-foundations-primary rounded-lg text-white hover:bg-foundations-secondary transition-colors flex items-center gap-2 font-semibold"
//                 onClick={() => handleAddToCart(website._id)}
//               >
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm text-foundations-dark">
//             <div>
//               <p className="font-bold">Country: <span className="font-normal">{website.language}</span></p>
//               <p className="font-bold">Price: <span className="font-normal">€ {website.price.toFixed(2)}</span></p>
//               <p className="font-bold">Type: <span className="font-normal">{website.mediaType}</span></p>
//             </div>
//             <div>
//               <p className="font-bold">Category: <span className="font-normal">{website.category.join(", ")}</span></p>
//               <p className="font-bold">Google News: <span className="font-normal">{website.googleNews ? "✔" : "✖"}</span></p>
//             </div>
//             <div>
//               <p className="font-bold">Sensitive Topics:</p>
//               <div className="flex flex-wrap gap-2">
//                 {website.sensitiveTopics.map((topic) => (
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

//   return (
//     <div className="space-y-6 px-4 md:px-8 lg:px-12">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-2xl font-bold text-black">Favorites</h1>
//         <div className="flex gap-2">
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
//       </div>

//       {favorites.length === 0 ? (
//         <div className="text-black mb-8">No favorites to show</div>
//       ) : viewMode === 'table' ? (
//         renderTable()
//       ) : (
//         renderCards()
//       )}

//       <ColumnModal />
//     </div>
//   );
// };

// export default Favorite;
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiSpreadsheet, BiGridAlt } from 'react-icons/bi';
import { FaEye, FaShoppingCart, FaStar } from "react-icons/fa";
import { favouriteService, websiteService, cartService } from '../../utils/services';
import { toast } from 'react-hot-toast';
import { useAuthStore } from "../../store/authStore";
import useCartStore from '../../store/cartStore';
import Loader from "../../components/Loader"; // Import the Loader component

const Favorite = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'
  const user = useAuthStore((state) => state.user);
  const { updateCartCount } = useCartStore();
  const [visibleColumns, setVisibleColumns] = useState({
    country: true,
    name: true,
    price: true,
    type: true,
    category: true,
    cbd: true,
    trading: true,
    adult: true,
    gambling: true,
    da: false,
    ascore: false,
    za: false,
    gnews: true,
    bl: false,
    edu: false,
    gov: false,
    date: false,
  });
  const [showColumnModal, setShowColumnModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    if (user?._id) {
      fetchFavorites(user._id);
    }
  }, [user]);

  const fetchFavorites = async (userId) => {
    try {
      setIsLoading(true); // Start loading
      const favoritesData = await favouriteService.getFavourites(userId);
      const websiteDetailsPromises = favoritesData.map(async (favorite) => {
        try {
          const websiteDetails = await websiteService.getWebsiteById(favorite.websiteId, userId);
          return {
            ...websiteDetails,
            favoriteId: favorite._id
          };
        } catch (error) {
          console.error(`Failed to fetch website details for ID: ${favorite.websiteId}`);
          return null;
        }
      });
  
      const websiteDetails = await Promise.all(websiteDetailsPromises);
      const validWebsites = websiteDetails.filter(website => website !== null);
      setFavorites(validWebsites);
    } catch (error) {
      toast.error("Failed to fetch favorites");
    } finally {
      setIsLoading(false); // End loading
    }
  };

  const removeFavorite = async (favoriteId) => {
    try {
      await favouriteService.deleteFavourite(favoriteId, user._id);
      await fetchFavorites(user._id);
      toast.success("Removed from favorites");
    } catch (error) {
      toast.error(" Failed to remove favorite");
    }
  };

  const handleAddToCart = async (websiteId) => {
    if (!user?._id) {
      toast.error("Please login to add items to cart");
      return;
    }
    try {
      await cartService.createCart(user._id, websiteId);
      updateCartCount(user._id);
      toast.success("Item added to cart!");
    } catch (error) {
      toast.error(error?.message || "Failed to add item to cart");
    }
  };

  const handleViewProduct = (id) => {
    navigate(`/advertiser/products/view/${id}`);
  };

  const toggleColumn = (columnName) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [columnName.toLowerCase()]: !prev[columnName.toLowerCase()],
    }));
  };

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
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
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

  const renderTable = () => (
    <div className="table-wrapper overflow-x-auto shadow-md sm:rounded-lg">
      <div className="min-w-full inline-block align-middle">
        <div className="border rounded-lg">
          <table className="min-w-full divide-y divide-foundations-tertiary bg-foundations-light">
            <thead className="bg-gradient-to-r from-foundations-primary to-foundations-secondary">
              <tr>
                <th className="sticky left-0 z-20 p-3 text-left text-white bg-gradient-to-r from-foundations-primary to-foundations-secondary">
                  Actions
                </th>
                {visibleColumns.country && <th className="p-3 text-left text-white whitespace-nowrap">Country</th>}
                {visibleColumns.name && <th className="p-3 text-left text-white whitespace-nowrap">Name</th>}
                {visibleColumns.price && <th className="p-3 text-left text-white whitespace-nowrap">Price</th>}
                {visibleColumns.type && <th className="p-3 text-left text-white whitespace-nowrap">Type</th>}
                {visibleColumns.category && <th className="p-3 text-left text-white whitespace-nowrap">Category</th>}
                {visibleColumns.cbd && <th className="p-3 text-left text-white whitespace-nowrap">CBD</th>}
                {visibleColumns.trading && <th className="p-3 text-left text-white whitespace-nowrap">Trading</th>}
                {visibleColumns.adult && <th className="p-3 text-left text-white whitespace-nowrap">Adult</th>}
                {visibleColumns.gambling && <th className="p-3 text-left text-white whitespace-nowrap">Gambling</th>}
                {visibleColumns.da && <th className="p-3 text-left text-white whitespace-nowrap">DA</th>}
                {visibleColumns.ascore && <th className="p-3 text-left text-white whitespace-nowrap">AScore</th>}
                {visibleColumns.za && <th className="p-3 text-left text-white whitespace nowrap">ZA</th>}
                {visibleColumns.gnews && <th className="p-3 text-left text-white whitespace-nowrap">GNews</th>}
                {visibleColumns.bl && <th className="p-3 text-left text-white whitespace-nowrap">BL</th>}
                {visibleColumns.edu && <th className="p-3 text-left text-white whitespace-nowrap">EDU</th>}
                {visibleColumns.gov && <th className="p-3 text-left text-white whitespace-nowrap">GOV</th>}
                {visibleColumns.date && <th className="p-3 text-left text-white whitespace-nowrap">Date</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-foundations-tertiary">
              {favorites.map((website) => (
                <tr key={website._id} className="hover:bg-foundations-secondary transition-colors">
                  <td className="sticky left-0 z-10 p-3 bg-white">
                    <div className="flex gap-2">
                      <button
                        className="p-2 bg-foundations-primary rounded-full text-white hover:bg-foundations-secondary transition-colors"
                        onClick={() => handleViewProduct(website._id)}
                      >
                        <FaEye />
                      </button>
                      <button
                        className="p-2 bg-foundations-primary rounded-full text-white hover:bg-foundations-secondary transition-colors"
                        onClick={() => handleAddToCart(website._id)}
                      >
                        <FaShoppingCart />
                      </button>
                      <button
                        className="p-2 bg-foundations-tertiary rounded-full text-foundations-dark hover:bg-foundations-secondary transition-colors"
                        onClick={() => removeFavorite(website.favoriteId)}
                      >
                        <FaStar />
                      </button>
                    </div>
                  </td>
                  {visibleColumns.country && <td className="p-3 text-foundations-dark whitespace-nowrap">{website.language}</td>}
                  {visibleColumns.name && <td className="p-3 text-foundations-dark whitespace-nowrap">{website.webDomain}</td>}
                  {visibleColumns.price && <td className="p-3 text-foundations-dark whitespace-nowrap">€ {website.price.toFixed(2)}</td>}
                  {visibleColumns.type && <td className="p-3 text-foundations-dark whitespace-nowrap">{website.mediaType}</td>}
                  {visibleColumns.category && (
                    <td className="p-3 text-foundations-dark whitespace-nowrap">
                      <div className="relative group">
                        <span>{website.category[0]}</span>
                        {website.category.length > 1 && (
                          <span className="ml-1 text-foundations-tertiary">
                            +{website.category.length - 1}
                          </span>
                        )}
                        {website.category.length > 1 && (
                          <div className="absolute hidden group-hover:block left-0 mt-1 p-2 bg-white border rounded shadow-lg z-20">
                            {website.category.join(", ")}
                          </div>
                        )}
                      </div>
                    </td>
                  )}
                  {visibleColumns.cbd && (
                    <td className="p-3 text-foundations-dark whitespace-nowrap">
                      {website.sensitiveTopics?.includes("CBD") ? "✔" : "✖"}
                    </td>
                  )}
                  {visibleColumns.trading && (
                    <td className="p-3 text-foundations-dark whitespace-nowrap">
                      {website.sensitiveTopics?.includes("Trading") ? "✔" : "✖"}
                    </td>
                  )}
                  {visibleColumns.adult && (
                    <td className="p-3 text-foundations-dark whitespace-nowrap">
                      {website.sensitiveTopics?.includes("Adult") ? "✔" : "✖"}
                    </td>
                  )}
                  {visibleColumns.gambling && (
                    <td className="p-3 text-foundations-dark whitespace-nowrap">
                      {website.sensitiveTopics?.includes("Gambling") ? "✔" : "✖"}
                    </td>
                  )}
                  {visibleColumns.da && <td className="p-3 text-foundations-dark whitespace-nowrap">-</td>}
                  {visibleColumns.ascore && <td className="p-3 text-foundations-dark whitespace-nowrap">-</td>}
                  {visibleColumns.za && <td className="p-3 text-foundations-dark whitespace-nowrap">-</td>}
                  {visibleColumns.gnews && (
                    <td className="p-3 text-foundations-dark whitespace-nowrap">
                      {website.googleNews ? "✔" : "✖"}
                    </td>
                  )}
                  {visibleColumns.bl && <td className="p-3 text-foundations-dark whitespace-nowrap">-</td>}
                  {visibleColumns.edu && (
                    <td className="p-3 text-foundations-dark whitespace-nowrap">
                      {website.category.includes("Education ") ? "✔" : "✖"}
                    </td>
                  )}
                  {visibleColumns.gov && <td className="p-3 text-foundations-dark whitespace-nowrap">✖</td>}
                  {visibleColumns.date && (
                    <td className="p-3 text-foundations-dark whitespace-nowrap">
                      {new Date(website.createdAt).toLocaleDateString()}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderCards = () => (
    <div className="grid grid-cols-1 gap-4 max-w-full">
      {favorites.map((website) => (
        <div 
          key={website._id} 
          className="bg-foundations-light p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="flex flex-wrap justify-between items-center mb-4">
            <div>
              <h3 className="text-xl font-extrabold text-foundations-dark tracking-tight">
                {website.webDomain}
              </h3>
              <p className="text-sm font-semibold text-foundations-primary">
                {website.mediaType}
              </p>
            </div>
            <div className="flex gap-3 mt-2 sm:mt-0">
              <button 
                className="p-3 bg-foundations-primary rounded-full text-white hover:bg-foundations-secondary transition-colors"
                onClick={() => handleViewProduct(website._id)}
              >
                <FaEye className="w-5 h-5" />
              </button>
              <button 
                className="p-3 bg-foundations-tertiary rounded-full text-foundations-dark hover:bg-foundations-secondary transition-colors"
                onClick={() => removeFavorite(website.favoriteId)}
              >
                <FaStar className="w-5 h-5" />
              </button>
              <button 
                className="px-4 py-2 bg-foundations-primary rounded-lg text-white hover:bg-foundations-secondary transition-colors flex items-center gap-2 font-semibold"
                onClick={() => handleAddToCart(website._id)}
              >
                Add to Cart
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm text-foundations-dark">
            <div>
              <p className="font-bold">Country: <span className="font-normal">{website.language}</span></p>
              <p className="font-bold">Price: <span className="font-normal">€ {website.price.toFixed(2)}</span></p>
              <p className="font-bold">Type: <span className="font-normal">{website.mediaType}</span></p>
            </div>
            <div>
              <p className="font-bold">Category: <span className="font-normal">{website.category.join(", ")}</span></p>
              <p className="font-bold">Google News: <span className="font-normal">{website.googleNews ? "✔" : "✖"}</span></p>
            </div>
            <div>
              <p className="font-bold">Sensitive Topics:</p>
              <div className="flex flex-wrap gap-2">
                {website.sensitiveTopics.map((topic) => (
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

  return (
    <div className="space-y-6 px-4 md:px-8 lg:px-12">
      {isLoading && <Loader />} {/* Show loader when loading */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-black">Favorites</h1>
        <div className="flex gap-2">
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
 </div>

      {favorites.length === 0 ? (
        <div className="text-black mb-8">No favorites to show</div>
      ) : viewMode === 'table' ? (
        renderTable()
      ) : (
        renderCards()
      )}

      <ColumnModal />
    </div>
  );
};

export default Favorite;