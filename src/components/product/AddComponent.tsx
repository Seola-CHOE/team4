
function AddComponent() {


    return (
        <div className="flex flex-col gap-9">
            {/* 상품 등록 페이지 */}
            <div
                className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        Product Add Page
                    </h3>
                </div>

                <form action="#">
                    <div className="p-6.5">
                        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">


                        </div>
                        {/*상품 이름*/}
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Product Name <span className="text-meta-1">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Product Name"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                        </div>

                        {/*상품 가격*/}
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Price <span className="text-meta-1">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Price"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                        </div>


                        {/*카테고리 선택*/}
                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Category <span className="text-meta-1">*</span>
                            </label>
                            <div className="relative z-20 bg-transparent dark:bg-form-input">
                                <select
                                    className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                                    <option value="">Select category</option>
                                    <option value="">Daily goods</option>
                                    <option value="">Electronics</option>
                                    <option value="">Pharmaceuticals</option>
                                    <option value="">Groceries</option>
                                    <option value="">Tourisms</option>
                                </select>
                                <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                      <svg
                          className="fill-current"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                              fill=""
                          ></path>
                        </g>
                      </svg>
                    </span>
                            </div>
                        </div>

                        {/*파일 업로드*/}
                        <div>
                            <label className="mb-2.5 block text-black dark:text-white">
                                Attach File
                            </label>
                            <input
                                type="file"
                                className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                            />
                        </div>


                        <button
                            className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray mt-12">
                            Add Product
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
}

export default AddComponent;