import {create} from "zustand"


export const useUserStore = create((set) => ({
    users: [],
    setUsers: (users) => set({ users }),
    createUser: async (newUser) => {
        if(!newUser.name || !newUser.imageFile || !newUser.age) {
            return{success:false, message: "Please fill in all fields."};
        }
        try {
            const formData = new FormData();
            formData.append('name', newUser.name);
            formData.append('age', newUser.age);
            formData.append('image', newUser.imageFile);
            
            const res = await fetch("/api/users",
            {
                method:"POST",
                body: formData,
            });
            
            if (!res.ok) {
                return {success:false, message: `Server error: ${res.status}`};
            }
            
            const data = await res.json();
            if (data && data.data) {
                set((state) => ({users:[...state.users, data.data] }));
                return {success:true, message: "Profile created successfully"};
            } else {
                return {success:false, message: "Invalid server response"};
            }
        } catch (error) {
            console.error("Error creating user:", error);
            return {success:false, message: "Failed to create profile. Please try again."};
        }
    },
    fetchUsers: async () => {
        const res = await fetch("/api/users");
        const data = await res.json();
        set({users: data.data});
    },
    deleteUser: async (pid) => {
        const res = await fetch (`/api/users/${pid}`,{
            method: "DELETE",
        });
        const data = await res.json();
        if (!data.success) return {
            success: false, message: data.message};
            //update ui immediatetely
            set(state =>({users: state.users.filter(user => user._id !== pid)}));
            return {success: true, message: data.message};
        },
    updateUser: async (pid, updatedUser) =>{
        const formData = new FormData();
        formData.append('name', updatedUser.name);
        formData.append('age', updatedUser.age);
        
        if (updatedUser.imageFile) {
            formData.append('image', updatedUser.imageFile);
        }
        
        const res = await fetch(`/api/users/${pid}`,{
            method: "PUT",
            body: formData,
        });
const data = await res.json();
if (!data.success) return {
            success: false, message: data.message};
            //update ui immediatetely
            set(state =>({users: state.users.map((user) => (user._id === pid ? data.data : user)),}));
         return {success: true, message: data.message};
    }
}));

// const [state,setState]= useState([])

