import dbConnect from "../../../../config/db";
import PostItem from "../../../../models/PostItem";

dbConnect();

export async function GET() {
    try {
        const PostItems = await PostItem.find().select('-__v');
        return new Response(JSON.stringify(PostItems), {
            headers: {
                'Content-Type': 'application/json',
            },
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'SERVER ERROR' }), {
            headers: {
                'Content-Type': 'application/json',
            },
            status: 500,
        });
    }
}

export async function POST(request: Request) {
    const postItem = await request.json();

    try {
        const saveItem = await new PostItem({...postItem}).save();
        return new Response(JSON.stringify(saveItem), {
            headers: {
                'Content-Type': 'application/json',
            },
            status: 201,
        });

    } catch (error){ 
        return new Response (JSON.stringify({message:'SERVER ERROR'}), {
            headers: {
                'Content-Type': 'application/json',
            },
            status: 500,
        });
    };
};
