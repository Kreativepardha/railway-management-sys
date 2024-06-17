import Train from "../models/trainsModel";


// get all trains////////////////////////
export const getTrains = async (req:any, res:any) => {
    try {
    const trains = await Train.find({}).sort({ startDate:-1 });
return res.status(200).json({trains}) 
    } catch (err) {
        console.error(err);
    return res.status(500).json({ msg: "Server Error" });
    }

}

//post add new train /////////////////////////////////////////

export const postTrain = async (req:any, res:any) =>{
    const {
        name,destination,
        price,source
    } = req.body;

    if ( !name || !destination|| !source  || !price) {
        return res.status(400).json({msg:"enter all fields credentials"})
    }
    const startTime = new Date();
    const reachTime = new Date();
    
    try {
        const existingTrain = await Train.findOne({
            name,
        })

        if(existingTrain) {
            return res.status(409).json({msg:" train with same name already exists"})
        }

        const newTrain = await new Train({
            name,destination,
            startTime,
            reachTime ,
            price,source
        });

       await newTrain.save();
       await newTrain.populate("users");

       return res.status(200).json({
        name:newTrain.name,
        users:newTrain.users,
        destination:newTrain.destination,
        source:newTrain.source,
        startTime:newTrain.startTime,
        reachTime:newTrain.reachTime,
        price:newTrain.price,
        id:newTrain.id
       })


    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server Error" });
    }

        
}   

//get single train ///////////////////////////////

export const getTrain = async (req:any, res:any) => {
const { id } = req.params;

if(!id) {
    return res.status(400).json({msg:"Id not found"});
}
 
    try {
        const outTrain = await Train.findOne({
            _id:id,
        })
        if(!outTrain) {
            return res.status(404).json({msg:"TRain does not exist"})
        }
    
        res.json({
            id: outTrain._id,
            name:outTrain.name,
            users: outTrain.users,
            destination: outTrain.destination,
            source:outTrain.source,
            startTime:outTrain.startTime,
            reachTime:outTrain.reachTime,
            price:outTrain.price,
        })
     
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server Error" });
    }
 
  
}

export const deleteTrain = async(req:any, res:any) => {
    const { id } = req.body;

    if(!id) {
        return res.status(400).json({msg: "id not found"})
    }

    try {
        const traindel = await Train.findOne({ _id:id })

        if(!traindel) {
            return res.status(404).json({
                msg:"invalid ID "
            })
        }
    
        await traindel.deleteOne();
        res.json({ msg: "Train deleted successfullly" })
    } catch (err) {
        console.error(err);
    return res.status(500).json({msg :" Server Error"})
        
    }
  
}