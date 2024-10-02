import { useEffect, useState } from 'react';
import { getList } from '../../api/productAPI.ts';  // getList를 import
import { IProduct, IPageResponse } from '../../type/product.ts';

function ProductListComponent() {
  const [products, setProducts] = useState<IProduct[]>([]); // 빈 배열로 초기화
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data: IPageResponse = await getList(page, 10);  // 페이지와 사이즈로 호출
        setProducts(data.content || []);  // content가 없을 경우 빈 배열로 처리
        setTotalPages(data.totalPages || 1);  // totalPages가 없을 경우 기본값 1
      } catch (error) {
        console.error('Failed to fetch product list', error);
        setProducts([]);  // 에러 발생 시 빈 배열로 설정
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      setLoading(true);
    }
  };

  return (
    <div>
      <div>Product List Component</div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {products.length > 0 ? (  // products 배열이 비어있지 않은 경우만 map 실행
            <ul>
              {products.map((product) => (
                <li key={product.pno}>
                  <strong>{product.pname}</strong> - {product.price}원
                  <p>{product.pdesc}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No products available</p>  // products 배열이 비어있는 경우
          )}
          <div>
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              Previous
            </button>
            <span>{page} / {totalPages}</span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductListComponent;
