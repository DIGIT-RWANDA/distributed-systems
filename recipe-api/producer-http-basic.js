const server = require('fastify')()
const HOST = process.env.HOST || '127.0.0.1'
const PORT = process.env.PORT || 4000

console.log(`worker pid=${process.pid}`)

server.get(`/recipes/:id`, async (req, reply) => {
  console.log(`Worker request pid=${process.pid}`)
  const id = Number(req.params.id)
  if (id !== 42) {
    reply.statusCode = 404
    return { error: `not__found`}
  }
  return {
    producer__pid: process.pid,
    recipe: {
      id,
      name: 'Chicken Tikka Masala',
      steps: 'Throw it in a pot',
      ingredients: [
        {id: 1, name: 'Chicken', quantity: '1 lb'},
        {id: 2, name: 'Source', quantity: '2 cups'},
      ]

    }
  }
})

server.listen(PORT, HOST, () => {
  console.log(`Producer running at http://${HOST}:${PORT}`)
})
