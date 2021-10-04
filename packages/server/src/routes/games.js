import express from 'express'
import { Game, User } from '../models'
const router = express.Router();
router.get('/:id', async (req, res) => {

    console.log(req.params.id)
    try {
        const gameFound = await Game.findOne({

            _id: req.params.id
        }
        )
        res.send(gameFound)
    } catch (err) {
        res.send("could not elmo")
    }
});
router.post('/', async (req, res) => {
    const { title, image, owner } = req.body
    const gameExists = await Game.exists({
        title
    })
    let newTitle = null
    let stillExists = true
    while (gameExists && stillExists) {
        if(newTitle === null){
            newTitle = `${title}_new`
        }else{
            newTitle = `${newTitle}_new`
        }
        stillExists = await Game.exists({
            title: newTitle
        })

    }
    console.log(newTitle)
    try {
        if (title) {
            if (newTitle !== null) {
                const game = new Game({
                    title: newTitle,
                    image,
                    owner
                })
                const savedGame = await game.save()
                res.send(savedGame)
            } else {
                const game = new Game({
                    title,
                    image,
                    owner
                })
                const savedGame = await game.save()
                res.send(savedGame)
            }
        } else {
            res.send("Need a name for the game.")
        }
    } catch (err) {
        res.send(err)
    }
})
router.delete('/', async(req, res)=>{
    const {gameId, userId} = req.body
    const game = await Game.findOne({_id: gameId})
    console.log(game.owner.toString() === userId)
    if(!game){
        return res.send({error: "game doesn't exist"})
    }
    if (game.owner.toString() === userId){
        try{
            const deleteGame = await game.remove()
            const updateUser = await User.updateOne(
                {_id: userId},
                {$pull: {games: gameId}}
            )
            res.send(deleteGame)

        }catch(err){
            res.send(err)
        }
    }
})
module.exports = router;