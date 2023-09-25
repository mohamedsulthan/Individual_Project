import axios from "axios"

const JobData = {
    Authentication: async (token) => {
        try {
            const result = await axios.post("http://localhost:8080/jobs/authentication/", { token })
            if (result) {
                return result
            }
        }
        catch (err) {
            return err
        }
    },
    JobDataAll: async () => {
        try {
            const response = await axios.get('http://localhost:8080/jobs/JobDataAll');
            if (response) {
                return response;
            }
        }
        catch (err) {
            return err
        }
    },
    OwnJobData: async (UserID) => {
        try {
            const response = await axios.get('http://localhost:8080/jobs/JobData', {
                params: {
                    userID: UserID,
                }
            });
            if (response) {
                return response;
            }
        }
        catch (err) {

        }
    },
    Deletedata: async (job) => {
        try {
            const deleterecord = await axios.post("http://localhost:8080/jobs/Deletedata", job);
            if (deleterecord) {
                return deleterecord;
            }
        }
        catch (err) {
            return err;
        }
    },
    RegisterJobData: async (data) => {
        try {
            const RegistrationData = await axios.post("http://localhost:8080/jobs/registerjobdata", data);
            if (RegistrationData) {
                return RegistrationData;
            }
        }
        catch (err) {
            return err;
        }
    }
}

export default JobData;