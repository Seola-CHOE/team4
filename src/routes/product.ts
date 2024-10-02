import { lazy } from 'react';
import ProductReadPage from '../pages/Product/ProductReadPage.tsx';

const ProductIndex  = lazy(() => import('../pages/Product/IndexPage'));
const ProductList = lazy(() => import('../pages/Product/ProductListPage'));
const ProductAdd = lazy(() => import('../pages/Product/AddPage.tsx'));

const productRouter = [

  {
    path: '/product',
    title: 'Product Index',
    component: ProductIndex
  },

  {
    path: '/product/list',
    title: 'Product List',
    component: ProductList
  },
  {
    path: '/product/add',
    title: 'Product Add',
    component: ProductAdd
  },
  {
    path: '/product/read/:pno',
    title: 'Product read',
    component: ProductReadPage
  }
]

export default productRouter