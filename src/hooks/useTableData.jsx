import { useEffect, useState } from "react";

export default function useTableData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      // fetch data from "https://dummyjson.com/products"
      const res = await fetch("https://dummyjson.com/products");
      const { products } = await res.json();

      // calculate discountedPrice from price and discountPercentage
      products.forEach((product) => {
        product.discountedPrice = +(
          product.price -
          (product.price * product.discountPercentage) / 100
        ).toFixed(2);
      });

      console.log("data", products);
      setData(products);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading };
}
