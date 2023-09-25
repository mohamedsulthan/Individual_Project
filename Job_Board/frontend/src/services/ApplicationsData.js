import axios from "axios"

const ApplicationData = {
    JobApplication: async (data) => {
        try {
            const RegisterRequest = await axios.post(
                "http://localhost:8080/jobs/jobApplication", data)
            if (RegisterRequest) {
                return RegisterRequest
            }
        }
        catch (err) {
            return err
        }
    },
    SendMail: async (data) => {
        try {
            const SendEMail = await axios.post(
                "http://localhost:8080/jobs/appliedmail", data);
            if (SendEMail) {
                return SendEMail;
            }
        }
        catch (err) {
            return err
        }

    }
}
export default ApplicationData;