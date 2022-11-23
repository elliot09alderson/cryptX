import { Button, color, HStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
   <HStack p={'4'} shadow={'base'}  bgColor={'blackAlpha.700'}>
<Button variant={'unstyled'} fontFamily={'Montserrat'} color={'white'}>
    <Link to={'/'} >
Home
    </Link>
    </Button>
    <Button variant={'unstyled'} fontFamily={'Montserrat'} paddingLeft={'3'}  color={'white'}>
        <Link to={'/exchange'}>
        
Exchanges
        </Link>
    </Button>
    <Button variant={'unstyled'} fontFamily={'Montserrat'} paddingLeft={'3'} color={'white'}>
        <Link to={'/coins'}>

Coins
            </Link>

    </Button>
    <Button variant={'unstyled'} fontFamily={'Montserrat'} paddingLeft={'3'} color={'white'}>
    <Link to={'/help'} >

Help

            </Link>
    </Button>

   </HStack>
  )
}

export default Header