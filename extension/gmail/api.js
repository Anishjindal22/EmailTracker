require("dotenv").config();
const BASE_URL = process.env.BASE_URL;
const generateTrackingId = async (emailData) =>{
    try{
        const response = await fetch(`$BASE_URL/generate`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(emailData)
        });
        if(!response.ok){
            throw new Error =("Failed to generate tracking id");
        }
        const data = await response.json();
        return data;
    }
    catch(err){
        console.log(err);
        return null;
    }
}

window.generateTrackingId = generateTrackingId;