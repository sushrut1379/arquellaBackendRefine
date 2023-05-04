


const addCareGroupCareHome = {
    async addCommentController(req, res, next) {
        
        console.log("add addCareGroupCareHome contoller")
        console.log("add comment contoller", req.user)
        const { body, parentId, userName, userId, courseId, createdAt } = req.body;
            return res.status(200).json({
                sucess: 'sucessful',
            })

        // const comment = new Comment({
        //     body, parentId, userName, userId, courseId, createdAt
        // })

        // try {

        //     await comment.save().then(ress => {
        //         console.log("add comment in database successfulley ", ress)
        //         res.status(200).json({
        //             success: 'add comment in Database successfully ......',
        //         })
        //     }).catch(ress => {
        //         console.log("add comment in database failled ", ress)
        //         res.status(500).json({
        //             error: 'add comment in Database unsuccessful error in db ......',
        //         })
        //     });



        // } catch (err) {
        //     return res.status(500).json({
        //         error: 'add comment in Database unsuccessful error in db catch ......',
        //     })
        // }
    }

}

module.exports = {
    addCareGroupCareHome,

}
