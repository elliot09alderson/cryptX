import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "./index";
import { Button, Container, HStack, Radio, RadioGroup } from "@chakra-ui/react";
import Loader from "./component/Loader";
import CoinCard from "./CoinCard";
import Error from "./component/Error";
const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1)
  const [currency, setCurrency] = useState('inr')

  const currencySymbol = currency==="inr"?"₹":currency==="eur"?"€":"$";

  const changePage=(page)=>{
setPage(page);
setLoading(true)
  };
  const btns = new Array(132).fill(1)
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
        console.log(data);
        setCoins(data);  

        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoins();
  }, [currency,page]);
  if (error) return <Error message={'Error occured while fetching coins'}/>;
  return (
    
      <Container maxW={"container.xl"}>
        {loading ? (
          <Loader />
        ) : (<div>
{/* "₹":currency==="eur"?"€":"$"; */}
          <RadioGroup value={currency} onChange={setCurrency} p={'8'}>
<HStack spacing={'4'}>
  <Radio value={'inr'}>₹ INR</Radio>
  <Radio value={'usd'}>$ USD</Radio>
  <Radio value={'eur'}>€ EUR</Radio>
</HStack>
          <HStack wrap={"wrap"} justifyContent={'space-evenly'}>
            {coins.map((item) => (
              <CoinCard
              currencySymbol={currencySymbol}
              id={item.id}
                key={item.id}
                name={item.name}
                image={item.image}
                id={item.id}
                url={item.url}
               price={item.current_price}
               symbol = {item.symbol}
              />
              ))}
          </HStack>
           </RadioGroup>
         
         <HStack w={'full'} overflowX={'auto'} p={'8'}>
        { btns.map((item,index)=>(
          <Button bgColor={'blackAlpha.900'} key={index} color={"white"} onClick={()=>changePage(index+1)}>
            {index+1}
          </Button>
        ))}
        </HStack>
        </div>
    
           )}
            
      </Container>

  );
};

export default Coins;
