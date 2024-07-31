import { useReducer, useEffect } from "react";
import { PRODUCT_DATA } from "../data/productData";

// Define the initial state
const initialState = {
  productData: PRODUCT_DATA,
  selectedIndex: 0,
};

// Define the reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_VARIANT":
      const updatedData = [...state.productData];
      updatedData.forEach((product) => {
        product.variants.forEach((item, index) => {
          if (item.sku_id === action.payload.sku_id) {
            const selectedElement = product.variants.splice(index, 1);
            product.variants.unshift(selectedElement[0]);
          }
        });
      });
      return {
        ...state,
        productData: updatedData,
      };
    default:
      return state;
  }
};

const ProductList = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChangeVariant = (variant) => {
    dispatch({ type: "CHANGE_VARIANT", payload: variant });
  };

  useEffect(() => {
    console.log(state.productData);
    debugger;
  }, [state.productData]);

  return (
    <div className="p-4 m-4">
      <div>
        <h1 className="text-3xl font-bold underline">Product List</h1>
      </div>
      <div className="flex">
        {state.productData.map((product) => {
          return (
            <div className="m-4 p-4 border border-black" key={product.item_id}>
              <div>Name: {product.variants[0].sku_name}</div>
              <div>Price: {product.variants[0].price}</div>
              <div>
                Variants:
                {product.variants.map((variant) => {
                  return (
                    <div key={variant.sku_id}>
                      <span onClick={() => handleChangeVariant(variant)}>
                        {variant.sku_name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
