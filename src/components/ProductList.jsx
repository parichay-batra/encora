import { useEffect, useState } from "react";
import { PRODUCT_DATA } from "../data/productData";

const ProductList = () => {
  const [productData, setProductData] = useState(PRODUCT_DATA);
  const [selectedIndex, changeSelectedIndex] = useState(0);

  const handleChangeVariant = (variant, index) => {
    const data = [...productData];
    data.forEach((product, productIndex) => {
      product.variants.forEach((item, index) => {
        if (item.sku_id === variant.sku_id) {
          const selectedElement = product.variants.splice(index, 1);
          product.variants.unshift(selectedElement[0]);
        }
      });
    });
    console.log({ data });

    setProductData(data);
  };

  useEffect(() => {
    console.log(productData);
    debugger;
  }, [productData]);

  return (
    <div className="p-4 m-4">
      <div>
        <h1 className="text-3xl font-bold underline">Product List</h1>
      </div>
      <div className="flex">
        {productData.map((product, index) => {
          return (
            <div className="m-4 p-4  border border-black" key={product.item_id}>
              <div>Name : {product.variants[0].sku_name}</div>
              <div>Price : {product.variants[0].price}</div>
              <div>
                Variants :
                {product.variants.map((variant, index) => {
                  return (
                    <div key={variant.sku_id}>
                      <span onClick={() => handleChangeVariant(variant, index)}>
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
