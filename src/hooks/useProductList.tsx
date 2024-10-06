// import { createSearchParams, useLocation, useNavigate, useSearchParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { IPageResponse } from '../types/product.ts';
// import { getProductList } from '../api/productAPI.ts';
//
// const initialState: IPageResponse = {
//   dtoList: [],
//   prev: false,
//   next: false,
//   current: 0,
//   totalCount: 0,
//   totalPage: 0,
//   pageRequestDTO: {page: 0, size: 0},
// };
//
// const useProductList = () => {
//   const [query] = useSearchParams();
//   const location = useLocation();
//   const navigate = useNavigate();
//
//   let page: number = Number(query.get("page")) || 1;
//   let size: number = Number(query.get("size")) || 10;
//
//   if (isNaN(page)) page = 1;
//   if (isNaN(size)) size = 10;
//
//   const [loading, setLoading] = useState<boolean>(false);
//   const [pageResponse, setPageResponse] = useState<IPageResponse>({ initialState });
//   const queryStr = createSearchParams({ page: String(page), size: String(size) });
//
//
//   const refreshProductList = () => {
//     setLoading(true);
//     getProductList(page, size)
//       .then((data) => {
//         setPageResponse(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Failed to refresh product list:", error);
//         setLoading(false);
//       });
//   };
//
//   useEffect(() => {
//     refreshProductList();
//   }, [page, size, query, location.key, navigate]);
//
//   return { loading, pageResponse, refreshProductList };
// };
//
// export default useProductList();
