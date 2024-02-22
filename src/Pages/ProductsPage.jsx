import React, { useCallback, useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useLocation, useSearchParams } from "react-router-dom";
import { TbArrowLeft, TbArrowRight, TbX } from "react-icons/tb";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { request } from "../api/axios";

function ProductsPage() {
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(8);
  const [pageNum, setPageNum] = useState(1);
  // const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");
  const [category, setCategory] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const {
    data: products,
    isPending,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["products", sortBy, category, searchParams, pageNum],
    queryFn: ({ pageParam }) => {
      const url = addUrlParams(pageParam);
      return request({ url });
    },

    staleTime: 5 * 60 * 1000,
    initialPageParam: pageNum,
    maxPages: 3,
    getNextPageParam: (res, pages) => {
      if (res.headers.get("link").includes(`rel="next"`)) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });
  const handlePageNum = (e) => {
    setPageNum(e.target.value);
  };

  const addUrlParams = (pageParam) => {
    let url = `/products?_page=${pageParam}&_limit=${limit}`;
    if (searchParams.has("search")) {
      url += `&q=${searchParams.get("search")}`;
    }
    if (category) {
      url += `&category=${category}`;
    }
    if (sortBy !== "relevance") {
      url += sortBy;
    }
    return url;
  };

  const handleSortBy = (e) => {
    setSortBy(e.target.value);
    setPageNum(1);
  };
  const handleCategory = (e) => {
    setCategory(e.target.value);
    setPageNum(1);
  };

  const productsCards = products?.pages.map((group) => {
    return group.data.map((product) => <ProductCard key={product.id} product={product} />);
  });

  const skeletonCards = Array.from({ length: 8 }).map((_, index) => <div key={index} className="skeleton w-50 h-80 animate-fadein"></div>);
  return (
    <section className="my-20 container px-2">
      {searchParams.has("search") && (
        <div className="text-center mb-6 border border-lavender text-lg flex flex-col items-center gap-2 justify-center mx-auto">
          <span className="text-xl text-spaceCadet">Search results for : {searchParams.get("search")}</span>
          <span className="text-red cursor-pointer flex items-center border-b border-red-500" onClick={() => setSearchParams({})}>
            <TbX></TbX> Show All
          </span>
        </div>
      )}
      <div className="filter flex items-center gap-6">
        <div className="price-filter flex flex-col gap-2">
          <label htmlFor="price">Sort By</label>
          <select value={sortBy} onChange={handleSortBy} id="price" className="select select-info w-full max-w-[200px]">
            <option value="relevance">Relevancy</option>
            <option value="&_sort=price&_order=DESC">Highest Price</option>
            <option value="&_sort=price&_order=ASC">Lowest Price</option>
            <option value="&_sort=rating&_order=DESC">Highest Rating</option>
          </select>
        </div>
        <div className="rating-filter flex flex-col gap-2">
          <label htmlFor="category">Category</label>
          <select onChange={handleCategory} id="category" className="select select-info w-full max-w-[200px]">
            <option value="">All</option>
            <option className={`${category === "Sofas" ? "font-bold" : ""}`} value={"Sofas"}>
              Sofas
            </option>
            <option className={`${category === "Chairs" ? "font-bold" : ""}`} value={"Chairs"}>
              Chairs
            </option>
            <option className={`${category === "Bookshelves" ? "font-bold" : ""}`} value={"Bookshelves"}>
              Bookshelves
            </option>
          </select>
        </div>
      </div>

      <div className="products mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6 animate-fadein">{isPending ? skeletonCards : productsCards}</div>

      <div className="join my-6 max-w-xs content-center mx-auto grid grid-cols-2">
        {/* <button
          disabled={!hasPrevPage}
          className={`join-item btn btn-outline ${!hasPrevPage ? "invisible" : ""}`}
          onClick={() =>
            setPageNum((pre) => {
              return pre - 1;
            })
          }
        >
          <TbArrowLeft />
        </button> */}

        <button disabled={!hasNextPage || isFetchingNextPage} onClick={fetchNextPage} className={` btn btn-outline`}>
          {isFetchingNextPage ? "Loading more..." : hasNextPage ? "Load More" : "Nothing more to load"}
        </button>
      </div>
    </section>
  );
}

export default ProductsPage;
