const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://Pap:hehehe@craftsconn.xbwzfxx.mongodb.net/?retryWrites=true&w=majority')
.then((result)=>{console.log('Database connected')})
.catch((error)=>{console.log('There was an error connecting - '+error.message)})

