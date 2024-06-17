import mongoose, { models } from "mongoose";

const promtSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
    },
    prompt: {
        type: String,
        required: [true, "Prompt is required"],
    },
    tag: {
        type: String,
        required: [true, "Tag is required"],
    },
});


const Prompt = models.Prompt || mongoose.model("Prompt", promtSchema);
export default Prompt