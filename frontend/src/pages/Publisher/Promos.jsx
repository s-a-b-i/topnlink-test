// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { promoService, websiteService } from "../../utils/services";
// import PromoForm from "../../components/Forms/PromoForm.jsx";
// import { useAuthStore } from "../../store/authStore";
// import { toast } from 'react-hot-toast';

// const Promos = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [promos, setPromos] = useState([]);
//   const [editingPromo, setEditingPromo] = useState(null);
//   const [approvedWebsites, setApprovedWebsites] = useState([]);

//   const user = useAuthStore((state) => state.user);
//   const userId = user?._id;

//   useEffect(() => {
//     const fetchPromos = async () => {
//       try {
//         if (userId) {
//           const fetchedPromos = await promoService.getPromos(userId);
//           setPromos(fetchedPromos.map(promo => ({ ...promo, isExpanded: false })));
          
//           const websites = await websiteService.getWebsitesApproved(userId);
//           setApprovedWebsites(websites);
//         } else {
//           toast.error("User ID is required");
//         }
//       } catch (err) {
//         console.error('Error fetching promos or websites:', err);
//         toast.error(err.message || 'Failed to load promotions or websites');
//       }
//     };
  
//     fetchPromos();
//   }, [userId]);

//   // Get all website IDs currently in promotions
//   const getExistingPromoWebsites = () => {
//     return promos
//       .filter(promo => promo._id !== (editingPromo !== null ? promos[editingPromo]._id : null))
//       .flatMap(promo => promo.products);
//   };

//   const handleAddPromo = async (promoData) => {
//     try {
//       const newPromoData = { 
//         ...promoData, 
//         userId,
//       };
      
//       if (editingPromo !== null) {
//         const updatedPromo = await promoService.updatePromo(promos[editingPromo]._id, newPromoData);
//         setPromos(prevPromos => 
//           prevPromos.map((p, i) => 
//             i === editingPromo ? { ...updatedPromo, isExpanded: false } : p
//           )
//         );
//         toast.success("Promo updated successfully");
//       } else {
//         const createdPromo = await promoService.createPromo(newPromoData);
//         setPromos(prevPromos => [...prevPromos, { ...createdPromo, isExpanded: false }]);
//         toast.success("Promo created successfully");
//       }
      
//       setShowForm(false);
//       setEditingPromo(null);
//     } catch (err) {
//       console.error('Error saving promo:', err);
//       toast.error(err.message || 'Failed to save promotion');
//     }
//   };

//   const handleDeletePromo = async (index) => {
//     try {
//       const promoToDelete = promos[index];
//       await promoService.deletePromo(promoToDelete._id);
//       setPromos(prevPromos => prevPromos.filter((_, i) => i !== index));
//       toast.success("Promo deleted successfully");
//     } catch (err) {
//       console.error('Error deleting promo:', err);
//       toast.error(err.message || 'Failed to delete promotion');
//     }
//   };

//   const handleCancelPromo = () => {
//     setShowForm(false);
//     setEditingPromo(null);
//   };

//   const togglePromoDetails = (index) => {
//     setPromos(prevPromos =>
//       prevPromos.map((promo, i) =>
//         i === index ? { ...promo, isExpanded: !promo.isExpanded } : promo
//       )
//     );
//   };

//   const handleEditPromo = (index) => {
//     setEditingPromo(index);
//     setShowForm(true);
//   };

//   return (
//     <div className="space-y-6 px-4 md:px-8 lg:px-12">
//       <h1 className="text-2xl font-bold">Manage promotions</h1>

//       {!showForm && (
//         <div className="flex justify-end">
//           <button
//             onClick={() => {
//               setEditingPromo(null);
//               setShowForm(true);
//             }}
//             className="bg-foundations-primary text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
//           >
//             Add new promo
//           </button>
//         </div>
//       )}

// {showForm && (
//         <PromoForm
//           onSubmit={handleAddPromo}
//           onCancel={() => {
//             setShowForm(false);
//             setEditingPromo(null);
//           }}
//           initialData={editingPromo !== null ? promos[editingPromo] : null}
//           existingPromoWebsites={getExistingPromoWebsites()}
//         />
//       )}

//       {promos.length > 0 && (
//         <div className="space-y-4">
//           <h2 className="text-xl font-bold">Active Promos</h2>
//           {promos.map((promo, index) => (
//             <div
//               key={promo._id || index}
//               className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-300"
//             >
//               <div
//                 className="bg-gradient-to-r from-foundations-primary to-foundations-secondary text-white p-4"
//                 onClick={() => togglePromoDetails(index)}
//               >
//                 <h3 className="text-lg font-bold capitalize cursor-pointer">
//                   {promo.promoName}
//                 </h3>
//               </div>

//               {promo.isExpanded && (
//                 <div className="p-4 space-y-2">
//                   <p>Discount: {promo.discount}%</p>
//                   <p>Products: {promo.products?.map(websiteId => 
//   approvedWebsites.find(w => w._id === websiteId)?.webDomain
// ).join(", ") || 'N/A'}</p>
//                   <p>
//                     Start date:{" "}
//                     <span className="font-medium">
//                       {new Date(promo.startDate).toLocaleString()}
//                     </span>
//                   </p>
//                   <p>
//                     End date:{" "}
//                     <span className="font-medium">
//                       {new Date(promo.endDate).toLocaleString()}
//                     </span>
//                   </p>
//                   <div className="flex justify-end gap-4">
//                     <button
//                       onClick={() => handleEditPromo(index)}
//                       className="bg-foundations-primary px-4 py-2 rounded-lg text-white"
//                     >
//                       Edit promo
//                     </button>
//                     <button
//                       onClick={() => handleDeletePromo(index)}
//                       className="bg-foundations-secondary px-4 py-2 rounded-lg text-white"
//                     >
//                       Delete promo
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}

//       <div className="flex gap-2 text-[#3D52A0] mt-8">
//         <Link to="/terms" className="hover:underline">
//           Terms and conditions
//         </Link>
//         <span>•</span>
//         <Link to="https://rankister.com" className="hover:underline">
//           Rankister.com
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Promos;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { promoService, websiteService } from "../../utils/services";
import PromoForm from "../../components/Forms/PromoForm.jsx";
import { useAuthStore } from "../../store/authStore";
import { toast } from 'react-hot-toast';
import Loader from "../../components/Loader"; // Import your Loader component

const Promos = () => {
  const [showForm, setShowForm] = useState(false);
  const [promos, setPromos] = useState([]);
  const [editingPromo, setEditingPromo] = useState(null);
  const [approvedWebsites, setApprovedWebsites] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state

  const user = useAuthStore((state) => state.user);
  const userId = user?._id;

  useEffect(() => {
    const fetchPromos = async () => {
      setLoading(true); // Start loading
      try {
        if (userId) {
          const fetchedPromos = await promoService.getPromos(userId);
          setPromos(fetchedPromos.map(promo => ({ ...promo, isExpanded: false })));
          
          const websites = await websiteService.getWebsitesApproved(userId);
          setApprovedWebsites(websites);
        } else {
          toast.error("User  ID is required");
        }
      } catch (err) {
        console.error('Error fetching promos or websites:', err);
        toast.error(err.message || 'Failed to load promotions or websites');
      } finally {
        setLoading(false); // End loading
      }
    };
  
    fetchPromos();
  }, [userId]);

  // Get all website IDs currently in promotions
  const getExistingPromoWebsites = () => {
    return promos
      .filter(promo => promo._id !== (editingPromo !== null ? promos[editingPromo]._id : null))
      .flatMap(promo => promo.products);
  };

  const handleAddPromo = async (promoData) => {
    setLoading(true); // Start loading
    try {
      const newPromoData = { 
        ...promoData, 
        userId,
      };
      
      if (editingPromo !== null) {
        const updatedPromo = await promoService.updatePromo(promos[editingPromo]._id, newPromoData);
        setPromos(prevPromos => 
          prevPromos.map((p, i) => 
            i === editingPromo ? { ...updatedPromo, isExpanded: false } : p
          )
        );
        toast.success("Promo updated successfully");
      } else {
        const createdPromo = await promoService.createPromo(newPromoData);
        setPromos(prevPromos => [...prevPromos, { ...createdPromo, isExpanded: false }]);
        toast.success("Promo created successfully");
      }
      
      setShowForm(false);
      setEditingPromo(null);
    } catch (err) {
      console.error('Error saving promo:', err);
      toast.error(err.message || 'Failed to save promotion');
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleDeletePromo = async (index) => {
    setLoading(true); // Start loading
    try {
      const promoToDelete = promos[index];
      await promoService.deletePromo(promoToDelete._id);
      setPromos(prevPromos => prevPromos.filter((_, i) => i !== index));
      toast.success("Promo deleted successfully");
    } catch (err) {
      console.error('Error deleting promo:', err);
      toast.error(err.message || 'Failed to delete promotion');
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleCancelPromo = () => {
    setShowForm(false);
    setEditingPromo(null);
  };

  const togglePromoDetails = (index) => {
    setPromos(prevPromos =>
      prevPromos.map((promo, i) =>
        i === index ? { ...promo, isExpanded: !promo.isExpanded } : promo
      )
    );
  };

  const handleEditPromo = (index) => {
    setEditingPromo(index);
    setShowForm(true);
  };

  if (loading) return <Loader />; // Show loader while loading

  return (
    <div className="space-y-6 px-4 md:px-8 lg:px-12">
      <h1 className="text-2xl font-bold">Manage promotions</h1>

      {!showForm && (
        <div className="flex justify-end">
          <button
            onClick={() => {
              setEditingPromo(null);
              setShowForm(true);
            }}
            className="bg-foundations-primary text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            Add new promo
          </button>
        </div>
      )}

      {showForm && (
        <PromoForm
          onSubmit={handleAddPromo}
          onCancel={() => {
            setShowForm(false);
            setEditingPromo(null);
          }}
          initialData={editingPromo !== null ? promos[editingPromo] : null}
          existingPromoWebsites={getExistingPromoWebsites()}
        />
      )}

      {promos.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Active Promos</h2>
          {promos.map((promo, index) => (
            <div
              key={promo._id || index}
              className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-300"
            >
              <div
                className="bg-gradient-to-r from-foundations-primary to-foundations-secondary text-white p-4"
                onClick={() => togglePromoDetails(index)}
              >
                <h3 className="text-lg font-bold capitalize cursor-pointer">
                  {promo.promoName}
                </h3>
              </div>

              {promo.isExpanded && (
                <div className="p-4 space-y-2">
                  <p>Discount: {promo.discount}%</p>
                  <p>Products: {promo.products?.map(websiteId => 
                    approvedWebsites.find(w => w._id === websiteId)?.webDomain
                  ).join(", ") || 'N/A'}</p>
                  <p>
                    Start date:{" "}
                    <span className="font-medium">
                      {new Date(promo.startDate).toLocaleString()}
                    </span>
                  </p>
                  <p>
                    End date:{" "}
                    <span className="font-medium">
                      {new Date(promo.endDate).toLocaleString()}
                    </span>
                  </p>
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={() => handleEditPromo(index)}
                      className="bg-foundations-primary px-4 py-2 rounded-lg text-white"
                    >
                      Edit promo
                    </button>
                    <button
                      onClick={() => handleDeletePromo(index)}
                      className="bg-foundations-secondary px-4 py-2 rounded-lg text-white"
                    >
                      Delete promo
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-2 text-[#3D52A0] mt-8">
        <Link to="/terms" className="hover:underline">
          Terms and conditions
        </Link>
        <span>•</span>
        <Link to="https://rankister.com" className="hover:underline">
          Rankister.com
        </Link>
      </div>
    </div>
  );
};

export default Promos;