import { useState, useEffect } from 'react'
import{Box, Image,Heading,Text, IconButton, HStack ,VStack, Input,useColorModeValue, Button} from '@chakra-ui/react';
import { useUserStore } from '../store/user';
import { useToast, useDisclosure} from '@chakra-ui/react'
import { DeleteIcon,EditIcon } from '@chakra-ui/icons'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

const UserCard = ({user}) => {
const toast = useToast()
const textColor = useColorModeValue("gray.600", "gray.200");
const bg = useColorModeValue ("white", "gray.800");
const [updatedUser, setUpdateUser] = useState(user);
const {deleteUser, updateUser} = useUserStore()
const { isOpen, onOpen, onClose } = useDisclosure()
const BASE_URL = import.meta.env.VITE_API_URL || "";
const handleDeleteUser = async(pid) =>{
  const {success,message} = await deleteUser(pid)
  if(!success){
    toast({
      title: "Error",
      description: message,
      type: "error",
      duration: 3000,
      isClosable: true});
  }else {
    toast({
      title: "Success",
      description: message,
      type: "success",
      duration: 3000,
      isClosable: true});
  }
};
const handleUpdateUser = async (pid, updatedUser) => {
    const {success} = await updateUser(pid, updatedUser);
    onClose();
     if(!success){
    toast({
      title: "Error",
      description: "Unable to update Profile",
      type: "error",
      duration: 3000,
      isClosable: true});
  }else {
    toast({
      title: "Success",
      description: "Profile updated Successfully",
      type: "success",
      duration: 3000,
      isClosable: true});
  }

}

  return (
    <Box 
    shadow= 'lg'
    rounded= 'lg'
    overflow= 'hidden'
    transition= 'all 0.3s'
    _hover={{ transform: "translateY(-5px)", shadow: "xl"}}
    bg={bg}
    >
<Image 
  src={user.image && user.image.startsWith('/uploads') ? `${BASE_URL}${user.image}` : user.image} 
  alt={user.name}  
  h={48} 
  w={'full'} 
  objectFit='cover'
  onError={(e) => {
    e.target.src = 'https://via.placeholder.com/150';
  }}
/>
<Box p={4}>
    <Heading as='h3' size='md' mb={2} textTransform={'capitalize'}>
        {user.name}
    </Heading>
<Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
    {user.age} years old
</Text>
<HStack spacing={2}>
 <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='blue'/>
<IconButton icon={<DeleteIcon />} onClick={() => handleDeleteUser(user._id)} colorScheme='red'/>
</HStack>
</Box>
<Modal isOpen={isOpen} onClose={onClose}>
<ModalOverlay />
<ModalContent>
    <ModalHeader>Update Profile</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
        <VStack>
           <Input placeholder='Profile Name'
    name ='name'
    value={updatedUser.name}
     onChange={(e) => setUpdateUser({...updatedUser, name: e.target.value})}
    />
    <Input 
    placeholder='Your age'
    name='age'
    type='number'
    value={updatedUser.age}
    onChange={(e) => setUpdateUser({...updatedUser, age: e.target.value})}
    />
    <Input 
    name='image'
    type='file'
    accept="image/*"
    onChange={(e) => {
      if (e.target.files[0]) {
        setUpdateUser({...updatedUser, imageFile: e.target.files[0]});
      }
    }}
   />
</VStack>
    </ModalBody>
<ModalFooter>
    <Button colorScheme='blue' mr={3} onClick={() => handleUpdateUser(user._id, updatedUser)}>
Update
    </Button>
     <Button variant='ghost' onClick={onClose}>
Cancel
    </Button>
</ModalFooter>
</ModalContent>
</Modal>
    </Box>
  );
};

export default UserCard
