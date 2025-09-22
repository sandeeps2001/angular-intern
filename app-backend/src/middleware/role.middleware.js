//middleware to check if user is admin or user

const checkAdmin = async (req,res,next) => {

    if(req.user.role === 'admin'){
        next()
    }
    else {
        res.status(400).send({error: 'Unauthorized Access'})
    }

}

module.exports = checkAdmin