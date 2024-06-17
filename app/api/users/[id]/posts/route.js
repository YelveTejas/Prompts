import Prompt from "@/models/prompt.js";
import { connectDB } from "@/utils/database";

export const GET = async (request,{params}) => {
//console.log('checking')
  try {
    await connectDB();
    const promts = await Prompt.find({
        creator: params.id
    }).populate("creator");
 // console.log(promts,'promts')
    return new Response(JSON.stringify(promts), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
