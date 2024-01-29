import axios from "axios"


const api = axios.create({
    //localhost:3012
    baseURL:"https://mystockbackend.onrender.com/"  ,
})

export default api