const recipes = [
  { id: 1, name: 'Pizza' },
  { id: 2, name: 'Pasta' },
];

export async function GET() {
  return Response.json(recipes);
}

