const SessionService = require("../service/session.service");
const RoleService = require("../service/role.service");
const AuthService = require("../service/auth.service");

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

const createSession = async (req, res, next) => {
    try {
        const authToken = req.headers.authorization.replace("Bearer ", "");
        const user = AuthService.verifyToken(authToken);
        const role = await RoleService.getRoleNameById(user.roleId);
        if (role.roleName != 'Mentor') {
            res.status(401).json({nxtGenStatus: 1, 'error': 'user not a mentor' });
            return;
        }
        const requestBody = req.body;
        if (await SessionService.sessionExistsForTimeAndUser(user.id, requestBody.time)) {
            res.status(409).json({nxtGenStatus: 1, 'error': 'session already exists for that time'});
            return;
        }
        const session = await SessionService.createSession({
            user_id: user.id,
            time: requestBody.time,
            price: requestBody.price,
            typeOfSession: requestBody.typeOfSession
        });

        res.status(200).json(session.dataValues)
    } catch (error) {
        next(error)
    }
}

const deleteSession = async (req, res, next) => {
    try {
        const sessionId = req.params.id;
        const authToken = req.headers.authorization.replace("Bearer ", "");
        const user = AuthService.verifyToken(authToken);
        
        const session = await SessionService.getSession({
            id: sessionId
        });

        if (!session) {
            res.status(404).json({ nxtGenStatus: 1, error: 'session not found' });
            return;
        }

        if (user.id != session.user_id) {
            res.status(401).json({ nxtGenStatus: 1, error: 'session doesn\'t belong to the user' });
            return;
        }
        
        await session.destroy();

        res.status(200).json({nxtGenStatus: 0, 'result' : 'success'})

    } catch (error) {
        next(error)
    }
}


module.exports = {
    createSession,
    deleteSession,
    getSessions
}
