import { getProductList } from '../../api/productAPI.ts';
import { useEffect, useState } from 'react';
import { IPageResponse } from '../../types/product.ts';
import { useSearchParams } from 'react-router-dom';
import PageComponent from '../../common/PageComponent.tsx';

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
  price: 0,
};

function ProductListComponent() {
  const [productList, setProductList] = useState<IProduct[]>([]); // 초기값을 빈 배열로 설정
  const [pageResponse, setPageResponse] = useState<IPageResponse>();
  const [query, setQuery] = useSearchParams(); // useSearchParams를 추가
  const page = Number(query.get("page")) || 1; // query에서 page 값을 가져옴

  const changePage = (pageNum: number) => {
    query.set("page", String(pageNum));
    setQuery(query);
  };

  useEffect(() => {
    const fetchProductList = async () => {
      const response: IPageResponse = await getProductList(page);
      console.log(response);
      setProductList(response.dtoList); // Assuming dtoList is the key holding the products
      setPageResponse(response);
    };

    fetchProductList();
  }, [page]);

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
      {pageResponse && <PageComponent pageResponse={pageResponse} changePage={changePage} />} {/* changePage 전달 */}
    </div>
  );
}

export default ProductListComponent;
