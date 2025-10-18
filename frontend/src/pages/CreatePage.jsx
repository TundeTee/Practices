import {useState} from 'react';
import{Box,Container,Heading,VStack,Button,Input,useColorModeValue} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useToast } from '@chakra-ui/react'
import { useUserStore } from '../store/user';
import { useEffect } from 'react';

const CreatePage = () => {
     const toast = useToast()
    const [newUser, setNewUser] = useState({
        name: "",
        age: "",
        image: "",
  });
  useEffect(() => {
        document.title = 'CreatePage'; }, []);

  const {createUser} = useUserStore();

  const handleAddUser = async() => {
    const {success,message} = await createUser(newUser);
   if(!success){
    toast({
  title: "Error",
  description: message,
  status: "error",
   isClosable: true,
});
   }else{
    toast({
  title: "Success",
  description: message,
  status: "success",
  isClosable: true,
   });
  } setNewUser({name: "", age: "", image: ""});
};
  return( <Container maxW={"container.sm"}>
<VStack spacing = {8}>
    <Heading as={"h1"} size={"2xl"} textAlign={"center"}mb={8} bgGradient={"linear(to-0)"} 
    bgClip={"text"}>
    Create New Profile
</Heading>
<Box bg={useColorModeValue("white", "gray.800")} w={"full"} p={"6"} rounded={"lg"} shadow={"md"} >
<VStack spacing={4}>
    <Input placeholder='Profile Name'
    name ='name'
    value= {newUser.name}
    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
    />
    <Input 
    placeholder='Your age'
    name='age'
    type='number'
    value={newUser.age}
    onChange={(e) => setNewUser({...newUser, age: e.target.value})}
    />
    <Input 
    placeholder='Upload Image'
    name='image'
    type='file'
    accept="image/*"
    onChange={(e) => {
      if (e.target.files[0]) {
        setNewUser({...newUser, imageFile: e.target.files[0]});
      }
    }}
    />
    <Button colorScheme='blue' onClick= {handleAddUser}  w='full'>Add Profile</Button>

     <Button colorScheme='green'  w='full'> <Link to={"/"}>Show Added Profile</Link></Button>

</VStack>
</Box>
</VStack>

</Container>

  );
};

export default CreatePage





