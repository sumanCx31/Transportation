const BusSvc = require("./bus.service");

class BusController {
  Create = async (req, res, next) => {
    try {
      const transformData = await BusSvc.transformBus(req);
      const createBus1 = await BusSvc.createBus(transformData);

      res.json({
        data: createBus1,
        message: "Bus Added SucessFully!!",
        option: null,
      });
    } catch (exception) {
      throw exception;
    }
  };

  getAllBus = async (req, res) => {
    try {
      const busData = await BusSvc.getAllBus();
      res.json({
        data: busData,
        message: "Buses fetched successfully",
        status: "Success",
        options: null,
      });
      console.log("Buses Fetched Sucessfully!!");
    } catch (exception) {
      throw exception;
    }
  };

  getBusById = async (req, res) => {
    try {
      let id = req.params.id;
      const data = await BusSvc.getById(id);

      res.json({
        data: data,
        message: `Bus Fetched with ${id} successfully`,
      });
    } catch (exception) {
      throw exception;
    }
  };

  deleteBusById = async(req,res)=>{
    try {
        let id = req.params.id;
        const data = await BusSvc.getById;
        await BusSvc.deleteById(id);

        res.json({
            data:{
                id:data.id,
                name:data.name,
            },
            message:"Bus Deleted Successfully!!",
            status:"success"
        })
    } catch (exception) {
        throw exception
    }
  }
}
const BusCltr = new BusController();
module.exports = BusCltr;
