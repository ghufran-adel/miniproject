  const morganlogger=((req, res)=> {
    return  JSON.stringify(req.body)})

    const unknownEndpoint =((request, response) => {
        response.status(404).json({ error: 'Unknown endpoint' })
      })

  module.exports={
    morganlogger,
    unknownEndpoint
  }