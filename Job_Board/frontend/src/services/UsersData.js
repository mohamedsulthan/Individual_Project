import axios from "axios"
const UserData = {
    Login: async (data) => {
        console.log("services folder:", data);
        const response = await axios.post("http://localhost:8080/users/login", data);
        return response
    },

    RegisterUser: async (data) => {
        console.log("services folder:", data);
        const RegisterRequest = await axios.post(
            "http://localhost:8080/users/register",
            data
        );

        if (RegisterRequest) {
            return RegisterRequest
        }
        else {
            return 'error'
        }
    }
}

export default UserData;