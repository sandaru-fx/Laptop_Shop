
import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, ChevronDown, Monitor } from 'lucide-react';
import { mockStore } from '../services/mockStore';
import { Laptop } from '../types';
import { BRANDS, CATEGORIES } from '../constants';

interface ShopPageProps {
  onProductClick: (id: string) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({ onProductClick }) => {
  const [laptops, setLaptops] = useState<Laptop[]>(mockStore.getLaptops());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredLaptops = laptops
    .filter(l => {
      const matchesSearch = l.model.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          l.brand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBrand = selectedBrand === 'All' || l.brand === selectedBrand;
      const matchesCategory = selectedCategory === 'All' || l.category === selectedCategory;
      return matchesSearch && matchesBrand && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return 0; // default newest
    });

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-extrabold mb-2">The Collection</h1>
          <p className="text-slate-400">Exploring {filteredLaptops.length} premium devices</p>
        </div>

        <div className="flex w-full md:w-auto items-center space-x-4">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search model, brand..."
              className="w-full glass bg-white/5 border-white/10 rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`p-3 rounded-2xl transition-all ${isFilterOpen ? 'bg-blue-600' : 'glass bg-white/5 border-white/10'}`}
          >
            <SlidersHorizontal size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Filters Sidebar */}
        <div className={`lg:block ${isFilterOpen ? 'block' : 'hidden'} space-y-10`}>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">Brands</h3>
            <div className="flex flex-col space-y-3">
              <button 
                onClick={() => setSelectedBrand('All')}
                className={`text-left px-4 py-2 rounded-xl transition-all ${selectedBrand === 'All' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'hover:bg-white/5'}`}
              >
                All Brands
              </button>
              {BRANDS.map(brand => (
                <button 
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`text-left px-4 py-2 rounded-xl transition-all ${selectedBrand === brand ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'hover:bg-white/5'}`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">Categories</h3>
            <div className="flex flex-col space-y-3">
              <button 
                onClick={() => setSelectedCategory('All')}
                className={`text-left px-4 py-2 rounded-xl transition-all ${selectedCategory === 'All' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'hover:bg-white/5'}`}
              >
                All Categories
              </button>
              {CATEGORIES.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-left px-4 py-2 rounded-xl transition-all ${selectedCategory === cat ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'hover:bg-white/5'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">Sort By</h3>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full glass bg-slate-800 border-white/10 rounded-xl px-4 py-3 outline-none"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredLaptops.map((laptop) => (
            <div 
              key={laptop.id}
              onClick={() => onProductClick(laptop.id)}
              className="group glass rounded-3xl overflow-hidden cursor-pointer transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 border-white/5"
            >
              <div className="relative h-56">
                <img 
                  src={laptop.images[0]} 
                  alt={laptop.model}
                  className="w-full h-full object-cover"
                />
                {laptop.stock < 5 && laptop.stock > 0 && (
                  <div className="absolute bottom-4 left-4 bg-orange-600 text-[10px] font-black uppercase px-2 py-1 rounded">Low Stock</div>
                )}
                {laptop.stock === 0 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center font-bold text-white uppercase tracking-widest">Out of Stock</div>
                )}
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{laptop.brand}</p>
                    <h4 className="text-lg font-bold leading-tight group-hover:text-blue-400 transition-colors">{laptop.model}</h4>
                  </div>
                  <div className="text-xl font-black text-blue-400">${laptop.price}</div>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="bg-white/5 text-[10px] px-2 py-1 rounded-full border border-white/10">{laptop.cpu}</span>
                  <span className="bg-white/5 text-[10px] px-2 py-1 rounded-full border border-white/10">{laptop.ram}</span>
                </div>
              </div>
            </div>
          ))}
          {filteredLaptops.length === 0 && (
            <div className="col-span-full py-24 flex flex-col items-center justify-center space-y-4 text-slate-500">
               <div className="bg-white/5 p-6 rounded-full"><Monitor size={48} className="opacity-20" /></div>
               <p className="text-lg">No matching laptops found.</p>
               <button 
                onClick={() => { setSearchTerm(''); setSelectedBrand('All'); setSelectedCategory('All'); }}
                className="text-blue-400 hover:underline"
               >
                 Clear all filters
               </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
