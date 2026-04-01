const { offerSvc } = require("./offers.service");

class OfferController {
    createPromo=async (req,res)=>{
        try {
            const promoData = req.body;
            const newPromo = await offerSvc.createPromo(promoData);
            if(!newPromo){
                throw({
                    code:400,
                    message:"Failed to create promo!"
                })
            }
            
            res.json({
                data:newPromo,
                message:"Promo created successfully!",
                status:"success"
            })
        } catch (exception) {
            throw exception;
        }
    }
}

const offerCltr = new OfferController();
module.exports = {
    offerCltr
}