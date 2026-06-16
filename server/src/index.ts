import { Hono } from 'hono'
import { connectDb } from './util/connectDb.js'

const app = new Hono()
app.get("/",async (c)=>{
  await connectDb()
  return c.json({
    message:"hello"
  });
 })
 
const welcomeStrings = [
  'Hello Hono!',
  'To learn more about Hono on Vercel, visit https://vercel.com/docs/frameworks/backend/hono'
]



export default app
