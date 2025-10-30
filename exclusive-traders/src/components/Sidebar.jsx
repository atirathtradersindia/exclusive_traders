import React, { useState } from 'react';

const Sidebar = ({
  goBackToProducts,
  industryData,
  selectedBrand,
  handleBrandClick,
  clearBrandFilter,
  filteredProducts,
  isSidebarOpen,
  toggleSidebar
}) => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const toggleCategories = () => setIsCategoriesOpen(!isCategoriesOpen);

  // Extract unique product names for the current industry to display as sub-items
  const productNames = [...new Set(industryData.products.map(product => product.name))];

  return (
    <>
      {/* Sidebar container */}
      <div
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-56 lg:w-72 bg-dark transition-transform duration-300 ease-in-out z-40 shadow-xl border-r border-white/10 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:ml-8`}
      >
        <div className="bg-gradient-to-b from-white/10 to-white/5 rounded-none pt-6 px-4 pb-4 h-full overflow-y-auto">
          {/* Back Button - Goes back to All Products Page */}
          <button
            onClick={goBackToProducts}
            className="flex items-center text-secondary hover:text-accent transition-colors text-sm mb-4 w-full text-left py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Back to All Products
          </button>

          {/* Categories */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-semibold text-secondary flex items-center">
                <i className="fas fa-tags mr-2"></i> Categories / Products
              </h3>
              <button
                onClick={toggleCategories}
                className="text-secondary hover:text-accent transition-colors text-lg p-3 rounded-full bg-white/20 hover:bg-white/40 border border-secondary"
              >
                {isCategoriesOpen ? (
                  <i className="fas fa-chevron-up"></i>
                ) : (
                  <i className="fas fa-chevron-down"></i>
                )}
              </button>
            </div>

            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isCategoriesOpen ? 'max-h-full' : 'max-h-0'
              }`}
            >
              <div className="space-y-2">
                {productNames.length > 0 ? productNames.map((productName, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      console.log('Selected product:', productName); // Debug log
                      handleBrandClick(productName);
                    }}
                    className={`p-3 rounded-lg cursor-pointer border transition-all duration-300 transform ${
                      selectedBrand === productName
                        ? 'bg-secondary/30 border-secondary text-secondary scale-105'
                        : 'bg-white/10 border-white/5 text-light'
                    } hover:bg-white/20 hover:scale-105`}
                    style={{ transitionDelay: `${index * 40}ms` }}
                  >
                    <span className="font-medium text-sm">{productName}</span>
                  </div>
                )) : industryData.brands.map((brand, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      console.log('Selected brand:', brand); // Debug log
                      handleBrandClick(brand);
                    }}
                    className={`p-3 rounded-lg cursor-pointer border transition-all duration-300 transform ${
                      selectedBrand === brand
                        ? 'bg-secondary/30 border-secondary text-secondary scale-105'
                        : 'bg-white/10 border-white/5 text-light'
                    } hover:bg-white/20 hover:scale-105`}
                    style={{ transitionDelay: `${index * 40}ms` }}
                  >
                    <span className="font-medium text-sm">{brand}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Selected brand filter */}
          {selectedBrand && (
            <div className="p-2 bg-secondary/20 rounded-lg border border-secondary/30 mb-3">
              <div className="flex justify-between items-center">
                <span className="text-light text-xs">Active filter:</span>
                <div className="flex items-center">
                  <span className="text-secondary font-medium mr-1 text-sm">
                    {selectedBrand}
                  </span>
                  <button
                    onClick={clearBrandFilter}
                    className="text-accent hover:text-secondary text-xs"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
              <button
                onClick={clearBrandFilter}
                className="text-xs text-gray hover:text-light mt-1"
              >
                Clear filter
              </button>
            </div>
          )}

          {/* Product count */}
          <div className="mt-3 p-2 bg-white/10 rounded-lg">
            <p className="text-light text-xs text-center">
              Showing <span className="text-secondary font-bold">{filteredProducts.length}</span> of{' '}
              <span className="text-accent font-bold">{industryData.products.length}</span> products
            </p>
          </div>
        </div>
      </div>

      {/* Black overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden transition-opacity duration-300 ease-in-out"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;