"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';

interface Product {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  image: string[];
  color: string[];
}

interface ProductViewProps {
  id: string;
}

const ViewProduct = ({ id }: ProductViewProps) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/tools/${id}`);
        const productData = response.data.data;
        setProduct(productData);
        if (productData.image.length > 0) {
          setMainImage(productData.image[0]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500 bg-red-50 rounded-md">
        Error: {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-4 text-gray-500">
        Product not found
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-secondary/50 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div>
          {/* Main Image */}
          <div className=" rounded-lg overflow-hidden mb-4 flex items-center justify-center">
            {mainImage ? (
              <Image
                src={mainImage}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-auto object-cover aspect-square"
                priority
              />
            ) : (
              <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-400">
                No Image Available
              </div>
            )}
          </div>

          {/* Thumbnail Gallery */}
          {product.image.length > 0 && (
            <div className="grid grid-cols-4 gap-2">
              {product.image.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(img)}
                  className={`rounded-md overflow-hidden border-2 transition-all ${
                    mainImage === img ? 'border-primary' : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    width={100}
                    height={100}
                    className="w-full h-24 object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>

          <div className="flex items-center mb-4">
            <span className="text-2xl font-semibold text-gray-800">
              KES {product.price.toLocaleString()}
            </span>
            <span className={`ml-4 px-2 py-1 text-sm rounded-full ${
              product.quantity > 0 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          {/* Color Display */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Color(s)</h3>
            <div className="flex items-center gap-2">
              {product.color.length > 0 ? (
                product.color.map((clr, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full border border-gray-300"
                    style={{ backgroundColor: clr }}
                    title={clr}
                  />
                ))
              ) : (
                <span className="text-gray-500 text-sm">No colors specified</span>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Description</h3>
            <p className="text-gray-700 whitespace-pre-line">{product.description}</p>
          </div>

          {/* Additional Info */}
          <div className="border-t  border-primary pt-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-800">Product ID</p>
                <p className="text-gray-500 font-mono text-xs">{product._id}</p>
              </div>
              <div>
                <p className="text-gray-900">Quantity Available</p>
                <p className="text-gray-700">{product.quantity}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
