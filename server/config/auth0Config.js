import { auth } from 'express-oauth2-jwt-bearer'

const jwtCheck = auth({
  // audience: 'http:///localhost:8000',
  audience: 'https://client-real-estate-react-vite-mongo-db-prisma.vercel.app/',
  issuerBaseURL: 'dev-pzsfvqymw322gi3g.us.auth0.com',
  tokenSigningAlg: 'RS256',
})

export default jwtCheck
