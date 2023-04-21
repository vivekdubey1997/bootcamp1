const express = require(`express`)
const bootcampRouter = express.Router()
const {createBootcamp,
        getBootcamp,   
        getSingleBootcamp,
        updateBootcamp,
        deleteBootcamp} = require(`../controllers/bootcamp.js`)

        bootcampRouter.route(`/`)
                                .post(createBootcamp) 
                                .get(getBootcamp)

        bootcampRouter.route(`/:id`)
                                    .get(getSingleBootcamp)
                                    .put(updateBootcamp)
                                    .delete(deleteBootcamp)

                                    
module.exports = bootcampRouter                               