import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "./index";
import { Container, HStack } from "@chakra-ui/react";
import Loader from "./component/Loader";
import ExchangeCard from "./ExchangeCard";
import Error from "./component/Error";
const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);
        // console.log(data);
        setExchanges(data);
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };
    fetchExchanges();
  }, []);
  if (error) return <Error message={'Error occured while fetching the exchanges '}/>;
  return (
    <>
      <Container maxW={"container.xl"}>
        {loading ? (
          <Loader />
        ) : (
          <HStack wrap={"wrap"} justifyContent={'space-evenly'}>
            {exchanges.map((item) => (
              <ExchangeCard
                key={item.id}
                name={item.name}
                image={item.image}
                url={item.url}
                trust={item.trust_score_rank}
              />
            ))}
          </HStack>
        )}
      </Container>
    </>
  );
};

export default Exchanges;
