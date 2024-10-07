import { getProductList } from '../../api/productAPI.ts';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { IProduct, IPageResponse } from '../../types/product.ts';
import PageComponent from '../../common/PageComponent';

const initialState = {
  dtoList: [], // 초기값은 빈 배열
  current: 0,
  prev: false,
  next: false,
  prevPage: 0,
  nextPage: 0,
  pageNumList: [], // 초기값은 빈 배열
  totalCount: 0,
  totalPage: 0,
  pageRequestDTO: { page: 0, size: 10 } // 요청 페이지 정보
}

function ProductListComponent() {
  const navigate = useNavigate();

  const [pageResponse, setPageResponse] = useState<IPageResponse>({...initialState});

  const [query, setQuery] = useSearchParams();
  const page = Number(query.get("page")) || 1;

  const changePage = (pageNum: number) => {
    query.set("page", String(pageNum));
    setQuery(query);
  };

  const moveToRead = (pno: number | undefined) => {
    navigate(`/product/read/${pno}`);
  };

  const moveToAdd = () => {
    navigate('/product/add');
  };

  useEffect(() => {
    const fetchProductList = async () => {
      const response = await getProductList(page);
      setPageResponse(response); // 응답 데이터를 pageResponse에 직접 설정
      console.log(response);
    };

    fetchProductList();
  }, [page]);

  // 카테고리 분류
  const [sort, setSort] = useState<string>('ALL');

  const changeSort = (choice: string): void => {
    setSort(choice);
  };

  const filterKind = (): IProduct[] => {
    if (sort === 'ALL') {
      return pageResponse.dtoList; // pageResponse에서 dtoList 가져오기
    }
    return pageResponse.dtoList.filter(p => p.pdesc === sort);
  };

  return (
    <div className="p-6 rounded-lg bg-white shadow-md">
      <div className="flex justify-between items-center gap-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">PRODUCT LIST</h2>

        <button
          onClick={moveToAdd}
          className="bg-primary w-1/12 h-full p-4 text-white font-semibold rounded-lg">
          ADD
        </button>
      </div>

      {/* 카테고리 선택 버튼 */}
      <div className='flex m-4 p-2 justify-center gap-8'>
        <button className='p-2 underline' onClick={() => changeSort('ALL')}>ALL</button>
        <button className='p-2 underline' onClick={() => changeSort('Daily goods')}>Daily goods</button>
        <button className='p-2 underline' onClick={() => changeSort('Electronics')}>Electronics</button>
        <button className='p-2 underline' onClick={() => changeSort('Pharmaceuticals')}>Pharmaceuticals</button>
        <button className='p-2 underline' onClick={() => changeSort('Groceries')}>Groceries</button>
        <button className='p-2 underline' onClick={() => changeSort('Tourisms')}>Tourisms</button>
      </div>

      <table className="min-w-full table-auto">
        <thead>
        <tr className="bg-gray-100 text-left">
          <th className="px-4 py-2 font-semibold text-gray-600 cursor-default">Product</th>
          <th className="px-4 py-2 font-semibold text-gray-600 cursor-default">Product Name</th>
          <th className="px-4 py-2 font-semibold text-gray-600 cursor-default">Category</th>
          <th className="px-4 py-2 font-semibold text-gray-600 cursor-default">Price</th>
        </tr>
        </thead>

        {/* 필터링된 제품 목록 표시 */}
        <tbody>
        {filterKind().length > 0 ? (
          filterKind().map((product) => (
            <tr onClick={() => moveToRead(product.pno)} key={product.pno} className="border-b border-gray-200 cursor-pointer">
              <td className="px-4 py-4 text-gray-700 font-medium w-1/12">
                <img src={`http://localhost:8089/api/products/view/s_${product.uploadFileNames[0]}`} alt="Product"/>
              </td>
              <td className="px-4 py-4 text-gray-700 font-medium w-1/6">{product.pname}</td>
              <td className="px-4 py-4 text-gray-600 w-1/6">{product.pdesc}</td>
              <td className="px-4 py-4 text-gray-700 w-1/6">${product.price.toLocaleString()}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4} className="text-center py-6 text-gray-500">No products available.</td>
          </tr>
        )}
        </tbody>
      </table>

      {/* Pagination */}
      <PageComponent pageResponse={pageResponse} changePage={changePage}></PageComponent>
    </div>
  );
}

export default ProductListComponent;
