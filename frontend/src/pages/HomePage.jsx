import { Container, VStack, Text, SimpleGrid,Box} from '@chakra-ui/react'
import {Link} from 'react-router-dom';
import { useEffect } from 'react';
import { useUserStore } from "../store/user"
import UserCard from '../components/UserCard';

const HomePage = () => {
const {fetchUsers,users} = useUserStore();
useEffect(() =>{
fetchUsers();
}, [fetchUsers]);
 useEffect(() => {
        document.title = 'HomePage'; }, []);
  return (
   <Container maxW= 'container.xl' py={12}>
<VStack spacing={8}>
<Text fontSize={"30"}
    fontWeight={"bold"}
    textAlign={"center"} 
    bgGradient={"linear(to-r, cyan.400, blue.500)"}
    bgClip={"text"}>
Current Prodfile 🚀
</Text>
<SimpleGrid columns={{
base: 1,
md: 2,
lg: 3,
}}
spacing='10'
gap={5}
w={"full"}
mt={6}>
{users.map((user)=>(
  <UserCard key={user._id} user={user}/>
))}
</SimpleGrid>
{users.length === 0 && (
  <Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
  No Profile found 😪{""} <Link to = {"/create"}>
  <Text as= 'span' color= 'blue.500' _hover={{textDecoration: "underline"}}>
     Create a Profile
  </Text>
  </Link>
</Text>

)}

</VStack>

   </Container>
  )
}

export default HomePage
