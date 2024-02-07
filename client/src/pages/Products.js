import React, { useState } from "react";
import { useSelector } from "react-redux";
import Layout from "../components/Layout/Layout";
import ProductListItem from "../components/ProductListItem";

const Products = () => {
  const [query, setQuery] = useState("");
  const { products } = useSelector((state) => state.product);
  const [filteredData, setFilteredData] = useState(products);

  const handleSearchInputChange = (e) => {
    const inputValue = e.target.value;
    setQuery(inputValue);

    // Filter the data based on the search query
    const filteredResults = products.filter((item) =>
      item.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredData(filteredResults);
  };

  return (
    <Layout>
      <div className="row my-4">
        <div className="row align-items-start p-3">
          <div className="col">
            <label>
              Search By name:
              <input
                onChange={handleSearchInputChange}
                value={query}
                className="job-select"
              />
            </label>
          </div>
        </div>
        {filteredData.map((product) => (
          <ProductListItem key={product.id} product={product} />
        ))}
      </div>
    </Layout>
  );
};

export default Products;
