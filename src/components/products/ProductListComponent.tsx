import { getProductList } from '../../api/productAPI.ts';
import { useEffect, useState } from 'react';

interface IProduct {
  pno: number;
  pname: string;
  pdesc: string;
  price: number;
}

const initialState = {
  pno: 0,
  pname: '',
  pdesc: '',
  price: 0
}

function ProductListComponent() {

  const [productList, setProductList] = useState<IProduct[]>([{...initialState}]);

  useEffect(() => {
    const fetchProductList = async () => {
      const response = await getProductList();
      setProductList(response.dtoList);  // Assuming dtoList is the key holding the products
    };

    fetchProductList();
  }, []);

  return (
    <div className="p-6 rounded-lg bg-white shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Product List</h2>
      <table className="min-w-full table-auto">
        <thead>
        <tr className="bg-gray-100 text-left">
          <th className="px-4 py-2 font-semibold text-gray-600">Product Name</th>
          <th className="px-4 py-2 font-semibold text-gray-600">Category</th>
          <th className="px-4 py-2 font-semibold text-gray-600">Price</th>
        </tr>
        </thead>
        <tbody>
        {productList.length > 0 ? (
          productList.map((product) => (
            <tr key={product.pno} className="border-b border-gray-200">
              <td className="px-4 py-4 text-gray-700 font-medium">{product.pname}</td>
              <td className="px-4 py-4 text-gray-600">{product.pdesc}</td>
              <td className="px-4 py-4 text-gray-700">${product.price.toLocaleString()}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3} className="text-center py-6 text-gray-500">No products available.</td>
          </tr>
        )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductListComponent;