// app/products/page.tsx
"use client";
import { useState } from 'react';
import { FiEdit, FiTrash2, FiPlus, FiX, FiEye } from 'react-icons/fi';
import { tools, Tool } from '@/lib/data';
import Tables from '../components/Tables';
import Image from 'next/image';

const Page = () => {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: { header: string; accessor: keyof Tool; className: string }[] = [
    {
      header: "Product",
      accessor: "name",
      className: "min-w-[200px]",
    },
     {
      header: "QTY",
      accessor: "quantity",
      className: "text-left min-w-[20px]",
    },
    {
      header: "Brand",
      accessor: "brand",
      className: "hidden md:table-cell min-w-[100px]",
    },
    {
      header: "Category",
      accessor: "category",
      className: "hidden md:table-cell min-w-[150px]",
    },
    {
      header: "Price",
      accessor: "price",
      className: "text-left min-w-[70px]",
    },
   
    {
      header: "Actions",
      accessor: "id",
      className: "text-left min-w-[100px]",
    },
  ];

  const renderRow = (tool: Tool) => (
    <tr key={tool.id} className="hover:bg-gray-50">
      <td className={`px-6 py-4 whitespace-nowrap ${columns[0].className}`}>
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <Image
              width={40}
              height={40}
              className="h-10 w-10 rounded-md object-cover"
              src={tool.image[0]}
              alt={tool.name}
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{tool.name}</div>
            <div className="text-sm text-gray-500">{tool.color.join(', ')}</div>
          </div>
        </div>
      </td>
       <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${columns[1].className}`}>
        {tool.quantity}
      </td>
      <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${columns[2].className}`}>
        {tool.brand}
      </td>
      <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${columns[3].className}`}>
        {tool.category}
      </td>
      <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${columns[4].className}`}>
        KES {tool.price.toLocaleString()}
      </td>
      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${columns[5].className}`}>
        <div className="flex justify-start space-x-2">
          <button
            onClick={() => {
              setSelectedTool(tool);
              setIsModalOpen(true);
            }}
            className="text-primary hover:text-primary/80"
          >
            <FiEdit className="h-5 w-5" />
          </button>
          <button className="text-red-600 hover:text-red-900">
            <FiTrash2 className="h-5 w-5" />
          </button>
            <button className="text-red-600 hover:text-red-900">
            <FiEye className="h-5 w-5" />
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
          <FiPlus className="-ml-1 mr-2 h-5 w-5" />
          Add Product
        </button>
      </div>

      <Tables
        columns={columns}
        data={tools}
        renderRow={renderRow}
        itemsPerPage={5}
      />

      {/* Product Detail Modal */}
      {isModalOpen && selectedTool && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedTool.name}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Product Images */}
                <div>
                  <div className="mb-4 h-64 bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      width={500}
                      height={500}
                      className="w-full h-full object-contain"
                      src={selectedTool.image[0]}
                      alt={selectedTool.name}
                    />
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {selectedTool.image.map((img, index) => (
                      <div key={index} className="h-20 bg-gray-100 rounded-md overflow-hidden">
                        <Image
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                          src={img}
                          alt={`${selectedTool.name} ${index + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Product Details */}
                <div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Brand</h4>
                      <p className="text-lg text-gray-900">{selectedTool.brand}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Category</h4>
                      <p className="text-lg text-gray-900">{selectedTool.category}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Price</h4>
                      <p className="text-2xl font-bold text-primary">
                        KES {selectedTool.price.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Colors</h4>
                      <div className="flex space-x-2 mt-1">
                        {selectedTool.color.map((color) => (
                          <span
                            key={color}
                            className="inline-block h-6 w-6 rounded-full border border-gray-300"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Description</h4>
                      <p className="text-gray-700">{selectedTool.description}</p>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t">
                    <div className="flex space-x-3">
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                      >
                        <FiEdit className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
                        Edit Product
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                      >
                        Update Inventory
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;