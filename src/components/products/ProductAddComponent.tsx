import React, { ChangeEvent, useRef, useState } from 'react';
import { postAdd } from '../../api/productAPI';
import { useNavigate } from 'react-router-dom';

const initialState = {
    pname: '',
    pdesc: '',
    price: '',
};

interface IProduct {
    pname: string;
    pdesc: string;
    price: string;
}

function ProductAddComponent() {
    const [product, setProduct] = useState<IProduct>({ ...initialState });
    const filesRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const files = filesRef?.current?.files;

        const formData: FormData = new FormData();

        if (files) {
            for (let i = 0; i < files.length; i++) {
                formData.append('files', files[i]);
            }
        }
        formData.append('pname', product.pname);
        formData.append('pdesc', product.pdesc);
        formData.append('price', product.price);

        postAdd(formData)
          .then((data) => {
              console.log(data);
              if (filesRef.current) {
                  filesRef.current.value = '';
              }
              navigate('/product/list'); // 등록이 완료되면 상품 리스트 페이지로 이동
          })
          .catch((error) => {
              console.error('Failed to add product:', error);
          });
    };

    return (
      <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">Product Add Page</h3>
              </div>

              <form>
                  <div className="p-6.5">
                      {/* 상품 이름 */}
                      <div className="mb-4.5">
                          <label className="mb-2.5 block text-black dark:text-white">
                              Product Name <span className="text-meta-1">*</span>
                          </label>
                          <input
                            type="text"
                            name="pname"
                            placeholder="Enter Product Name"
                            onChange={(e) => handleChange(e)}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          />
                      </div>

                      {/* 상품 가격 */}
                      <div className="mb-4.5">
                          <label className="mb-2.5 block text-black dark:text-white">
                              Price <span className="text-meta-1">*</span>
                          </label>
                          <input
                            type="number" // 숫자 입력 필드로 변경
                            name="price"
                            placeholder="Enter Price"
                            onChange={(e) => handleChange(e)}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          />
                      </div>

                      {/* 카테고리 선택 필드 */}
                      <div className="mb-4.5">
                          <label className="mb-2.5 block text-black dark:text-white">
                              Category <span className="text-meta-1">*</span>
                          </label>
                          <div className="relative z-20 bg-transparent dark:bg-form-input">
                              <select
                                className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                name="pdesc"
                                onChange={(e) => handleChange(e)}
                              >
                                  <option value="">Select category</option>
                                  <option value="Daily goods">Daily goods</option>
                                  <option value="Electronics">Electronics</option>
                                  <option value="Pharmaceuticals">Pharmaceuticals</option>
                                  <option value="Groceries">Groceries</option>
                                  <option value="Tourisms">Tourisms</option>
                              </select>
                          </div>
                      </div>

                      {/* 파일 업로드 */}
                      <div>
                          <label className="mb-2.5 block text-black dark:text-white">Attach File</label>
                          <input
                            type="file"
                            ref={filesRef}
                            multiple={true}
                            className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                          />
                      </div>

                      <button
                        className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray mt-12"
                        onClick={handleClick}
                      >
                          Add Product
                      </button>
                  </div>
              </form>
          </div>
      </div>
    );
}

export default ProductAddComponent;
