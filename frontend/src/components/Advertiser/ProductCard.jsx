import React from 'react';
import { IoEye } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const ProductCard = ({ product, onAddToCart }) => {
  const navigate = useNavigate();

  const handleViewProduct = () => {
    navigate(`/advertiser/products/view/${product._id}?action=${product.userId}`);
  };

  const handleAddToCart = async () => {
    try {
      await onAddToCart(product._id);
    } catch (error) {
      toast.error('Failed to add item to cart');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
      {/* Colored header for domain */}
      <div className="
bg-gradient-to-r from-foundations-primary to-foundations-secondary p-4">
        <h2 className="text-xl font-bold text-white">
          {product.webDomain}
        </h2>
      </div>

      {/* Card content */}
      <div className="p-6 flex-grow flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b pb-2">
            <span className="font-bold">Category:</span>
            <span className="font-semibold">
              {Array.isArray(product.category) ? product.category[0] : product.category}
            </span>
          </div>

          <div className="flex items-center justify-between border-b pb-2">
            <span className="font-bold">Media Type:</span>
            <span className="font-semibold">{product.mediaType || '-'}</span>
          </div>

          <div className="flex items-center justify-between border-b pb-2">
            <span className="font-bold">Google News:</span>
            <span className="font-semibold">
              {product.googleNews ? 'Yes' : 'No'}
            </span>
          </div>

          <div className="flex items-center justify-between border-b pb-2">
            <span className="font-bold">Publication Time:</span>
            <span className="font-semibold">{product.averagePublicationTime || '-'}</span>
          </div>

          <div className="flex items-center justify-between border-b pb-2">
            <span className="font-bold">Language:</span>
            <span className="font-semibold">{product.language || '-'}</span>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xl font-bold">
              Price: {typeof product.price === 'object' ? 
                parseFloat(product.price.$numberInt).toFixed(2) : 
                parseFloat(product.price).toFixed(2)} €
            </span>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="flex justify-between items-center mt-6">
          <button 
            className="p-3 bg-foundations-primary rounded-full text-white hover:bg-foundations-secondary transition-colors"
            onClick={handleViewProduct}
          >
            <IoEye className="text-white text-xl" />
          </button>
          <button 
            className="bg-foundations-primary text-white px-6 py-3 rounded-lg text-lg font-bold"
            onClick={handleAddToCart}
          >
            + Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;