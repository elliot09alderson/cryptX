import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom';
import { Container,Text,Image,VStack,HStack,Radio,RadioGroup, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Badge, Progress, Box, Button} from '@chakra-ui/react';
import Loader from './component/Loader';
import { server } from './index.js';
import axios from 'axios';
import { Chart } from 'react-chartjs-2';

const CoinDetails = () => {
  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1)
  const [currency, setCurrency] = useState('inr')
const [days,setDays]  = useState('24h');
const[chartArray,setChartArray] = useState([]);

const buttons = ['24h','7d','14d','30d','60d','200d','1y','max'];
const switchChartStats=(key)=>{
switch (key) {
  case '24h':
    setDays('24h');
    setLoading(true)
    break;
    
    case '7d':
      setDays('7d');
      setLoading(true);
      break;

      case '14d':
        setDays('14d');
        setLoading(true);
        break;

        case '30d':
          setDays('30d');
          setLoading(true);
          break;

          case '60d':
        setDays('60d');
        setLoading(true);
        break;

        case '200d':
        setDays('200d');
        setLoading(true);
        break;

        case '1y':
        setDays('365d');
        setLoading(true);
        break;

        case 'max':
          setDays('max');
          setLoading(true);
          break;


  default:
    case '24h':
      setDays('24h');
      setLoading(true)
      break
}
}

  const currencySymbol = currency==="inr"?"₹":currency==="eur"?"€":"$";
 
const params = useParams();

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);

        const {data:chartData} = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&{days}`)
        // console.log(data);
        setCoin(data);  
        setChartArray(chartData.prices);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoin();
  }, [params,currency,days]);


  return (
    <Container maxW={"container.xl"}>
        {loading ? (
          <Loader />
        ) : (

<>

<Box width={'full'} borderWidth={1}>
  <Chart arr={chartArray} currency={currencySymbol} days={days}/>  
</Box>

<HStack padding={'4'} overflowX={'auto'}>
{buttons.map((i)=>(
<Button key={i} onClick={()=>switchChartStats(i)}>

</Button>
))}
</HStack>

<RadioGroup value={currency} onChange={setCurrency} p={'8'}>
<HStack spacing={'4'}>
  <Radio value={'inr'}>₹ INR</Radio>
  <Radio value={'usd'}>$ USD</Radio>
  <Radio value={'eur'}>€ EUR</Radio>
</HStack>
</RadioGroup>
<VStack spacing={'4'} p={'16'} alignItems={'flex-start'}>
  <Text fontSize={'small'} alignSelf="center" opacity={0.7}>
    Last Updated on {Date(coin.market_data.last_updated).split("G")[0]}
  </Text>

<Image src={coin.image.large} w={'16'} h={'16'} objectFit={'contain'}/>


<Stat>
  <StatLabel>
    {coin.name}
  </StatLabel>
  <StatNumber>
{currencySymbol}{coin.market_data.current_price['inr']}
  </StatNumber>
  <StatHelpText>
    <StatArrow type={coin.market_data.price_change_percentage_24h >0 ?'increase':'decrease'}/>
    {coin.market_data.price_change_percentage_24h}%
  </StatHelpText>
</Stat>

<Badge fontSize={'2xl'} bgColor={'blackAlpha.800'} color={'white'}>
  {`#${coin.market_cap_rank}`}
</Badge>
<CustomBar 
high={`${coin.market_data.high_24h[currency]}`} 
low={`${coin.market_data.low_24h[currency]}`}/>
<Box w={'full'} p='4' alignItems={'flex-start'} justifyContent={'flex-start'}>
  <Item title={'Max Supply'} value={coin.market_data.max_supply}/>
  <Item title={"Circulating Supply"} value={coin.market_data.circulating_supply}/>
  <Item title={"Circulating Supply"} value={`${currencySymbol} ${coin.market_data.market_cap[currency]}`}/>
  <Item title={"All time Low"} value={`${currencySymbol} ${coin.market_data.atl[currency]}`}/>
  <Item title={"All time High"} value={`${currencySymbol} ${coin.market_data.ath[currency]}`}/>
</Box>
</VStack>
</>
  )}
        </Container>
  )
}


const Item=({title,value})=>{
  return(

    <HStack justifyContent={'space-between'} w={'full'} my={'4'}>
    <Text fontFamily={'Bebas Neue'} letterSpacing={'widest'}>
      {title}
    </Text>
    <Text>
      {value}
    </Text>
  </HStack>
    )
}
const CustomBar=({high,low})=>{
  return(
    <VStack w={'full'}>
      <Progress value={50} colorScheme={'teal'} w={'full'}/>
      <HStack justifyContent={'space-between'} w={'full'}>
        <Badge children={low} colorScheme={'red'}/>
        <Text fontSize={'sm'}> 24H change</Text>
        <Badge children={high} colorScheme={'green'}/>
      </HStack>
    </VStack>
  )
}
export default CoinDetails