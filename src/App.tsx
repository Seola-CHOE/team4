import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Modal from 'react-modal';

import ECommerce from './pages/Dashboard/ECommerce';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Loader from './common/Loader';
import ListPage from './components/products/ProductListComponent.tsx'; // ListPage import 추가
import routes from './routes';
import ReadPage from './components/products/ProductReadComponent.tsx';

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

// 애플리케이션의 루트 요소 설정
Modal.setAppElement('#root');

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Toaster position="top-right" reverseOrder={false} containerClassName="overflow-auto" />
      <Routes>
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route element={<DefaultLayout />}>
          <Route index element={<ECommerce />} />
          {/* ReadPage와 ListPage에 대한 라우트 추가 */}
          <Route path="/product/list" element={<ListPage />} />
          <Route path="/product/read/:pno" element={<ReadPage />} />
          {/* 기존의 routes 배열을 통해 나머지 페이지 설정 */}
          {routes.map((route, index) => {
            const { path, component: Component } = route;
            return (
              <Route
                key={index}
                path={path}
                element={
                  <Suspense fallback={<Loader />}>
                    <Component />
                  </Suspense>
                }
              />
            );
          })}
        </Route>
      </Routes>
    </>
  );
}

export default App;
