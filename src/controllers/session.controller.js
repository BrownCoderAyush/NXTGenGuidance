const SessionService = require("../service/session.service");

const getSessions = async(req,res,next)=>{
    try {
        const filters = req.body;
        const sessions = await SessionService.getSessions(filters); 
        return res.status(200).json({
            nxtGenStatus : 0,
            response : sessions
        })
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getSessions
}
