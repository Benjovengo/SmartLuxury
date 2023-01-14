import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";

import CommonSection from "../components/ui/Common-section/CommonSection";
import NftCard from "../components/ui/Nft-card/NftCard";

import { NFT__DATA } from "../assets_test/data/data";



import "../styles/market.css";

const Market = () => {
  const [data, setData] = useState(NFT__DATA);

  const handleCategory = () => {};

  const handleItems = () => {};

  // ====== SORTING DATA BY HIGH, MID, LOW RATE =========
  const handleSort = (e) => {
    const filterValue = e.target.value;

    if (filterValue === "all") {
      const filterData = NFT__DATA.filter((item) => item.currentBid >= 0);
      setData(filterData);
    }

    if (filterValue === "high") {
      const filterData = NFT__DATA.filter((item) => item.currentBid >= 1.5);
      setData(filterData);
    }

    if (filterValue === "mid") {
      const filterData = NFT__DATA.filter(
        (item) => item.currentBid >= 1.0 && item.currentBid < 1.5
      );
      setData(filterData);
    }

    if (filterValue === "low") {
      const filterData = NFT__DATA.filter(
        (item) => item.currentBid >= 0.20 && item.currentBid < 1.0
      );

      setData(filterData);
    }
  };

  return (
    <>
      <CommonSection title={"MarketPlace"} />

      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <div className="market__product__filter d-flex align-items-center justify-content-between">
                <div className="filter__left d-flex align-items-center gap-5">
                  <div className="all__category__filter">
                    <select onChange={handleCategory}>
                      <option>All Categories</option>
                      <option value="bags">Bags</option>
                      <option value="shoes">Shoes</option>
                      <option value="accessories">Accessories</option>
                      <option value="eyewear">Eyewear</option>
                      <option value="watches">Watches</option>
                    </select>
                  </div>

                  <div className="all__items__filter">
                    <select onChange={handleItems}>
                      <option>All Items</option>
                      <option value="single-item">Single Item</option>
                      <option value="bundle">Bundle</option>
                    </select>
                  </div>
                </div>

                <div className="filter__right">
                  <select onChange={handleSort}>
                    <option>Sort By</option>
                    <option value="all">Any Price</option>
                    <option value="high">High Price</option>
                    <option value="mid">Mid Price</option>
                    <option value="low">Low Price</option>
                  </select>
                </div>
              </div>
            </Col>

            {data?.map((_item) => (
              <Col lg="3" md="4" sm="6" className="mb-4" key={_item.id}>
                <NftCard item={_item} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Market;