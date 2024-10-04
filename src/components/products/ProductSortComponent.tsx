import {IProduct} from "../../types/product.ts";

interface ProductSortProps {
    products: IProduct[];
    changeSort: (choice:string) => void;
}


function ProductSortComponent({changeSort}: ProductSortProps) {



    return (
        <div>
            <div className='flex m-2 p-2 bg-blue-500 border-2 font-extrabold'>
                <div className='p-2' onClick={() => changeSort('ALL')}>ALL</div>
                <div className='p-2' onClick={() => changeSort('Daily goods')}>Daily goods</div>
                <div className='p-2' onClick={() => changeSort('Electronics')}>Electronics</div>
                <div className='p-2' onClick={() => changeSort('Pharmaceuticals')}>Pharmaceuticals</div>
                <div className='p-2' onClick={() => changeSort('Groceries')}>Groceries</div>
                <div className='p-2' onClick={() => changeSort('Tourisms')}>Tourisms</div>
            </div>

        </div>
    );
}

export default ProductSortComponent;