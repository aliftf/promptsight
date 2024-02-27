import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt"; 

// GET
export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate('creator');

    if(!prompt) return new Response("Prompt not found", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (err) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
}

// PATCH
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();

  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id);

    if(!existingPrompt) return new Response("Prompt not found", { status: 404 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (err) {
    return new Response("Failed to update prompt", { status: 500 });
  }

}

// DELETE
export const DELETE = async (request, { params }) => {
  try {
      console.log('Deleting prompt with ID:', params.id);

      await connectToDB();

      // Find the prompt by ID and remove it
      const deletedPrompt = await Prompt.findByIdAndDelete(params.id);

      if (!deletedPrompt) {
          // Console logging for debugging purposes
          console.log('Prompt not found');
          return new Response("Prompt not found", { status: 404 });
      }

      console.log('Prompt deleted successfully:', deletedPrompt);
      return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
      console.error('Error deleting prompt:', error);
      return new Response("Error deleting prompt", { status: 500 });
  }
};
