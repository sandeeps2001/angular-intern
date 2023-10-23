const { Module } = require("module");
const dbconnect = require("./mongodb")

async function signuppost(email, password) {
    try {
      const db = await dbconnect()
        const existingUser = await db.collection('useraccess').findOne({ email });
        if (existingUser) {
            if (existingUser.password) {
                throw new Error('invalid user');
            }

            await db.collection('useraccess').updateOne({ email }, { $set: { password } });
            return 'password updated';
        }
        await db.collection('useraccess').insertOne({email,password})
        return 'user inserted'
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
}


const logincheck = async (e, p) => {
    try {
      const db = await dbconnect()
      console.log('insidelogin')
      const lresult = await db.collection("useraccess").findOne({ email: e});
      if(!lresult){
        return'please complete signup and comeback'
      }
      console.log(lresult);
      return 'login successfull';
    }
     catch (err) {
      console.log("error",err)
        return err
    }
  };

module.exports={
signuppost,
logincheck
  }