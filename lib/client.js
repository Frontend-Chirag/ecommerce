import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';



export const client = sanityClient({
    projectId:'d8ca2r59',
    dataset:'production',
    apiVersion:'2023-04-27',    
    useCdn:true,
    token:'skBmj4UFMAvXOhSDmALsOCkx8eQRZhUqQen3Pxsnjz85rT4Tf1mr0PqOwdvyM1HtbASLvfVcql0ykTJK811sooTyh23bPRJZLSgxBFb5cevmMcLjJWdZUmWHUAU7YL1442luXi51in9biTh3Z7qpD9clVD3aYMHtMXTw0ER7rylXeTJ9Aqr8',

});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);