
const { Op } = require("sequelize");
const {Session} = require("../models/index");
const moment = require("moment");

class SessionService {

    static async createSession(sessionData) {
        const session = Session.create(sessionData);

        return session;
    }

    static async sessionExistsForTimeAndUser(userId, UTCTimestamp) {
        const session = this.getSessions({user_id: userId, time: UTCTimestamp});

        if (session)
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
}

module.exports = SessionService
