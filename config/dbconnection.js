const mongoose = require('mongoose')

mongoose.connect(process.env.DB_CONNECTION, {)
.then((result)=>{console.log('Database connected')})
.catch((error)=>{console.log('There was an error connecting - '+error.message)})

