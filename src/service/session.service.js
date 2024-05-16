
const { Op } = require("sequelize");
const {Session} = require("../models/index");
const moment = require("moment");

class SessionService {

    static async createSession(sessionData) {
        const session = Session.create(sessionData);

        return session;
    }

    static async sessionExistsForTimeAndUser(userId, UTCTimestamp) {
        const session = await Session.findOne({
            where: {
                user_id: userId,
                time: UTCTimestamp
            }
        })

        console.log(session);

        if (session != null || session != undefined)
            return true;
        
        return false;
    }

    static async sessionExistsForIdAndUser(sessionId, userId) {
        const session = await Session.findOne({
            where: {
                id: sessionId,
                user_id: userId,
            }
        })

        console.log(session);

        if (session != null || session != undefined)
            return true;
        
        return false;
    }

    static async getSessions(filters){

        const type = filters.type;
        const from = filters.from;
        const mentor_id = filters.user_id;
        console.log(type , from  ,mentor_id  , 'params');
        let till = moment(new Date()).utc().add(1,'months');
        till = filters.till || till;

        if(type == null || from  == null){
            throw new Error("required parameters not present");
        }

        const sessions = await Session.findAll({
            raw : true,
            where:{
                typeOfSession : type,
                time: { 
                    [Op.between]: [from, till] 
                },
                user_id : mentor_id
            }
        })
        return sessions;
    }

    static async deleteSession(sessionId) {
        const session = await Session.findOne({
            where: {
                id: sessionId
            }
        });

        await session.destroy();
    }
} 

module.exports = SessionService
