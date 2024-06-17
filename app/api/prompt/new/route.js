import Prompt from "@/models/prompt.js";
import { connectDB } from "@/utils/database";


export const POST = async (req) => {
    const { prompt, userId, tag } = await req.json();
    console.log(prompt, userId, tag)
    try{
     await connectDB();
     const newPrompt =  new Prompt({
        creator: userId,
        prompt,
        tag
     })

     await newPrompt.save()
 return new Response(JSON.stringify(newPrompt), { status: 201 });
    }catch(error){
      return new Response(JSON.stringify(error), { status: 500 });
    }
}