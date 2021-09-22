import express from 'express'
import { Game, User } from '../models'
const router = express.Router();
router.get('/',async (req,res)=> res.send("Thank you god"));
router.post('/', async (req, res)=>{
    const {title,image,owner} = req.body
    res.send(title)
    try{
        if(title){
            const game = new Game({
                title,
                image,
                owner
            })
            const savedGame = await game.save()
            res.send(savedGame.toJSON())
        } else{
            res.send("Need a name for the game.")
        }
    }catch(err){
        res.send(err)
    }
})
module.exports = router;