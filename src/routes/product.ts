import { lazy } from 'react';


const ProductIndex  = lazy(() => import('../pages/Product/IndexPage'));
const ProductList = lazy(() => import('../pages/Product/ListPage'));
const ProductAdd = lazy(() => import('../pages/Product/AddPage'));

const productRoute = [

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
  }
]

export default productRoute