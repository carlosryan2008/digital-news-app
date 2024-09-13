import dbConnect from "../../../../../config/db";
import PostItem from "../../../../../models/PostItem";

dbConnect();

export async function GET(
  _request: Request, 
  { params }: { params: { id: string } }
) {
  try {
    const postItem = await PostItem.findById(params.id).select('-__v');
    return new Response(JSON.stringify(postItem), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Nenhum Item Encontrado por esse ID' }),
      { status: 404 }
    );
  }
}

export async function PUT(
  request: Request, 
  { params }: { params: { id: string } }
) {
  try {
    const requestBody = await request.json();
    
    const updatedPostItem = await PostItem.findByIdAndUpdate(
      params.id,
      requestBody, // Inclui o campo 'content'
      { new: true, runValidators: true }
    ).select('-__v');
    
    if (!updatedPostItem) {
      return new Response(
        JSON.stringify({ message: 'Nenhum Item Encontrado para atualizar com esse ID' }),
        { status: 404 }
      );
    }
    
    return new Response(
      JSON.stringify(updatedPostItem),
      { status: 200 }
    );
  } catch (error) {
    let errorMessage = 'Erro ao atualizar o item';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return new Response(
      JSON.stringify({ message: errorMessage }),
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const deletedPostItem = await PostItem.findByIdAndDelete(params.id).select('-__v');
    
    if (!deletedPostItem) {
      return new Response(
        JSON.stringify({ message: 'Nenhum Item Encontrado para deletar com esse ID' }),
        { status: 404 }
      );
    }
    
    return new Response(
      JSON.stringify({ message: 'Item deletado com sucesso' }),
      { status: 200 }
    );
  } catch (error) {
    let errorMessage = 'Erro ao deletar o item';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return new Response(
      JSON.stringify({ message: errorMessage }),
      { status: 500 }
    );
  }
}

