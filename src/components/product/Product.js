import ProductCard from "./ProductCard";

const Product = ({ productState }) => {
  const { loading, products, error } = productState;

  return (
    <div>
      <h2>List of the Products</h2>
      <div className="product__container">
        {loading ? (
          "Loading"
        ) : error ? (
          <h2 className="product__error">{error}</h2>
        ) : (
          <div className="product__card">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                productId={product.id}
                image={product.thumbnail}
                price={product.price}
                title={product.title}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
