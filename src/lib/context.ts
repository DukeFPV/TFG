import { Pinecone } from '@pinecone-database/pinecone';
import { convertToAscii } from './utils';
import { getEmbeddings } from './embeddings';
//*REVISADO*//

export async function getMatchesFromEmbeddings(embeddings: number[], fileKey: string) {
  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
  });

  try {
    const pineconeIndex = pinecone.Index('sara-ia');
    const namespace = pineconeIndex.namespace(convertToAscii(fileKey));
    
    const queryResult = await namespace.query({
        topK: 5,
        vector: embeddings,
        includeMetadata: true,
    });
    
    return queryResult.matches || [];
  } catch (error) {
    console.log('Error en context obteniendo la petición', error);
    throw error;
  }
}

export async function getContext(query: string, fileKey: string) {
  const queryEmbeddings = await getEmbeddings(query);
  console.log('Query Embeddings:', queryEmbeddings); //Log Debug

  const matches = await getMatchesFromEmbeddings(queryEmbeddings, fileKey);
  console.log('Matches:', matches); //Log Debug

  const qualifyingDocs = matches.filter(
    (match) => match.score && match.score > 0.5
  );
  console.log('Qualifying Docs:', qualifyingDocs); //Log Debug

  type Metadata = {
    text: string,
    pageNumber: number,
  };

  const docs = qualifyingDocs.map(match => (match.metadata as Metadata).text);
  console.log('Docs:', docs); //Log Debug

  return docs.join('\n').substring(0, 3000);
}

