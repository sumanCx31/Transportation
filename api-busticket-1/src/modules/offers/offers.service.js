const OfferModel = require("./offers.model");

class OfferService{
    createPromo =async (promoData)=>{
       try {
        const createPromo = await OfferModel.create(promoData);
        return createPromo;
       } catch (exception) {
        throw exception;
       }
}
getPromoByCode=async(code)=>{
    try {
        const promo = await OfferModel.findOne({code:code});
        if(!promo)
        {
            throw({
                code:404,
                message:"Promo code not found!"
            })
        }
        return promo;
    } catch (exception) {
        throw exception;
}
    }
}

const offerSvc = new OfferService();
module.exports = {
    offerSvc
}