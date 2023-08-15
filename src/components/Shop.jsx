import ProductList from "./ProductList"

//Fix pagination & filters

function Shop() {
    return (
        <section className="products-shop section border-top py-4">
            <div className="container">
                <ProductList />
            </div>
        </section >
    )
}

export default Shop;