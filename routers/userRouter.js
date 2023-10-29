const express=require("express")
const router=express.Router()
const {createUser,getUser,deleteUser,updateUser}=require("../controllers/userController")

router.post('/create',createUser)
router.get('/getuser',getUser)
router.put('/deleteuser',deleteUser)
router.patch('/update/:id',updateUser)

module.exports=router