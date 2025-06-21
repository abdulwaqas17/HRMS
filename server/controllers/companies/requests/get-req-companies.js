const CompanyRequestModel = require("../../../models/companies/request.model");

let getCompaniesRequest = async (req, res) => {


    try {

        let companiesRequest = await CompanyRequestModel.find();
        if (!companiesRequest || companiesRequest.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No companies request found",
            });
        }
        return res.status(200).json({
            success: true,
            data: companiesRequest,
             message: "Getting companies request successfully",
        });



    } catch (error) {
        console.error("Error fetching companies request:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
}

module.exports = getCompaniesRequest;