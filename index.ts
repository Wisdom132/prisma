import express,{Request,Response,NextFunction} from 'express'
import {PrismaClient} from '@prisma/client'

const app = express();

app.use(express.json())
const prisma = new PrismaClient();


app.post('/create-cars', async (req:Request, res:Response) => {
    const { carList } = req.body;
    console.log(carList)
    try {

        const cars = await prisma.car.createMany({
            data: carList
        })
        res.json(cars)
    }catch(err) {
        console.log(err)
        res.json(err)
    }
})


app.post('/', async (req:Request, res: Response,next:NextFunction) => {
    try {
        const {username, password} = req.body;
        let user = await prisma.user.create({
            data: {
                username, password
            }
        })
        res.json(user)
    }catch(err) {
       res.json(err)
    }
})

app.get('/', async (req:Request, res: Response) => {
    try {
        let users = await prisma.user.findMany({
            include:{
                cars:true
            }
        });
        res.json(users)
    }catch(err) {
        console.log(err)
    }
})


app.get('/:id', async (req:Request, res: Response) => {
    try {
        let id = req.params.id
        let user = await prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        })

        res.json(user)
    }catch(err) {
        console.log(err)
    }
})

app.put('/:id', async (req:Request, res: Response) => {
    const {id} = req.params
    const {username} = req.body;
try {
    const updatedUser = await prisma.user.update({
        where: {
            id: Number(id)
        },
        data:{
            username:username
        }
    })
    res.json(updatedUser)
}catch(err) {
    res.json(err)
}
})
app.delete('/:id', async (req:Request, res: Response) => {
const id = req.params.id;
try {
    const deletedUser = await prisma.user.delete({
        where:{
            id: Number(id)
        }
    })
    res.json(deletedUser)
}catch(err)  {
    res.json(err)
}
})




app.listen(3030, () => {
    console.log('App is running on 3030')
})