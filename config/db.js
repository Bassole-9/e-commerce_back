import { connect } from "mongoose";


///function qui permet de connecter mon serveur a ma base de donnee
export const connecterDb = async ()=>{
    const secret = process.env.mongoo_uri
    if(!secret)throw new Error("url n'existe pas")
        await connect(secret,{
    dbName : "fin"
    })
}