
const Cart = require("../../models/cart")
const Course = require("../../models/course")


const getCoursesController = {
    async getCourses(req, res, next) {
        console.log("get  course contoller")
        try {
            await Course.find({}).select('-__v').then(ress => {
                console.log("get from course database successfulley ",)
                res.status(200).json({
                    success: 'get from course database successfulley...',
                    courseList: ress
                })
            }).catch(ress => {
                console.log("get from course database failled ", ress)
                res.status(500).json({
                    error: 'get from course database unsuccessful error in db ......',
                })
            });

        } catch (error) {
            return res.status(500).json({
                error: 'erron while getting course list catchBlock ......',
            })
        }
    }
}

const addCourseController = {
    async addCourse(req, res, next) {

        console.log("user credential", req.user._id, req.user.role)
        if (req.user.role == "user") {
            return res.status(400).json({
                error: 'you have no permission for this service',
                reqbody: req.body
            })
        }
        console.log("add course contoller", req.body)
        const { courseName, courseDescription, courseImage, courseLike, courseDislike, } = req.body;
        const course = new Course({
            courseName, courseDescription, courseImage, courseLike, courseDislike
        })
        try {
            if (req.user.role == "admin") {
                await course.save().then(ress => {
                    console.log("add course database successfulley ", ress)
                    res.status(200).json({
                        success: 'add in Database successfully ......',
                    })
                }).catch(ress => {
                    console.log("add course database failled ", ress)
                    res.status(500).json({
                        error: 'add in Database unsuccessful error in db ......',
                    })
                });

            }

        } catch (err) {
            return res.status(500).json({
                error: 'add course in Database unsuccessful error in db catch ......',
            })
        }

    }

}

const deleteCourseController = {
    async deleteCourseById(req, res, next) {
        console.log("delete course contoller +++", req.body)
        console.log("user credential delete course controller", req.user._id, req.user.role)
        if (req.user.role == "user") {
            return res.status(400).json({
                error: 'you have no permission for this service',
                reqbody: req.body
            })
        }
        console.log("delete course contoller", req.body)

        try {
            if (req.user.role == "admin") {
                await Course.findByIdAndDelete(req.body.courseId).then(ress => {
                    console.log("delete course in database successfulley ", ress)
                    res.status(200).json({
                        success: 'delete course in Database successfully ......',
                    })
                }).catch(ress => {
                    console.log("delete course in database failled ", ress)
                    res.status(500).json({
                        error: 'delete course in database unsuccessful error in db ......',
                    })
                });

            }

        } catch (err) {
            return res.status(500).json({
                error: 'delete course in Database unsuccessful error in db catch ......',
            })
        }

    }


}

const updateCourseController = {
    async updateCourseById(req, res, next) {

        console.log("user credential update course controller", req.user._id, req.user.role)
        if (req.user.role == "user") {
            return res.status(400).json({
                error: 'you have no permission for this service',
                reqbody: req.body
            })
        }
        console.log("add course contoller", req.body)

        try {
            if (req.user.role == "admin") {
                await Course.findByIdAndUpdate(req.body.courseId, {
                    courseName: req.body.courseName,
                    courseDescription: req.body.courseDescription,
                    courseImage: req.body.courseImage,
                    $addToSet: {
                        courseLike: req.body.courseLike,
                        courseDislike: req.body.courseDislike
                    }
                }).then(ress => {
                    console.log("update course in database successfulley ", ress)
                    res.status(200).json({
                        success: 'update course in Database successfully ......',
                    })
                }).catch(ress => {
                    console.log("update course in database failled ", ress)
                    res.status(500).json({
                        error: 'update course in database unsuccessful error in db ......',
                    })
                });

            }

        } catch (err) {
            return res.status(500).json({
                error: 'update course in Database unsuccessful error in db catch ......',
            })
        }

    }
}

const likeCourse={
    async updateCourseById(req, res, next) {

        console.log("user credential like course controller", req.user._id, req.user.role)
        
        console.log("like  course contoller", req.body)

        try {
            
                await Course.findByIdAndUpdate(req.body.courseId, {
                    $addToSet: {
                        courseLike: req.body.courseLike,
                    }
                }).then(ress => {
                    console.log("like course in database successfulley ", ress)
                    res.status(200).json({
                        success: 'like course in Database successfully ......',
                    })
                }).catch(ress => {
                    console.log("like course in database failled ", ress)
                    res.status(500).json({
                        error: 'like course in database unsuccessful error in db ......',
                    })
                });        

        } catch (err) {
            return res.status(500).json({
                error: 'like course in Database unsuccessful error in db catch ......',
            })
        }

    }

}

const disLikeCourse={
    async updateCourseById(req, res, next) {

        console.log("user credential like course controller", req.user._id, req.user.role)
        
        console.log("disLike  course contoller", req.body)

        try {
            
                await Course.findByIdAndUpdate(req.body.courseId, {
                    $addToSet: {
                        courseDislike: req.body.courseDislike
                    }
                }).then(ress => {
                    console.log("disLike course in database successfulley ", ress)
                    res.status(200).json({
                        success: 'dislike course in Database successfully ......',
                    })
                }).catch(ress => {
                    console.log("disLike course in database failled ", ress)
                    res.status(500).json({
                        error: 'dislike course in database unsuccessful error in db ......',
                    })
                });        

        } catch (err) {
            return res.status(500).json({
                error: 'dislike course in Database unsuccessful error in db catch ......',
            })
        }

    }

}

const addCourseToCart = {
    async addCourseToCart(req, res, next) {
        console.log("add course to cart contoller")
        console.log("add course contoller", req.body)
        const { courseId, userId, courseName, courseDescription, courseImage } = req.body;
        const cart = new Cart({
            courseId, userId, courseName, courseDescription, courseImage
        })
        try {

            await cart.save().then(ress => {
                console.log("add course in cart in database successfulley ", ress)
                res.status(200).json({
                    success: 'add course in cart in Database successfully ......',
                })
            }).catch(ress => {
                console.log("add  course in cart database failled ", ress)
                res.status(500).json({
                    error: 'add  course in cart Database unsuccessful error in db ......',
                })
            });



        } catch (err) {
            return res.status(500).json({
                error: 'add course in cart in Database unsuccessful error in db catch ......',
            })
        }
    }
}

const deleteCourseFromCart = {
    async deleteCourseFromCart(req, res, next) {
        console.log("delete course from cart contoller")
        console.log("delete course from cart  contoller", req.body)
        const { courseId, courseName, courseDescription, courseImage } = req.body;

        try {

            await Cart.findByIdAndDelete(courseId).then(ress => {
                console.log("delete course from cart in database successfulley ", ress)
                res.status(200).json({
                    success: 'delete course from cart in Database successfully ......',
                })
            }).catch(ress => {
                console.log("delete course from cart in database failled ", ress)
                res.status(500).json({
                    error: 'delete course from cart in Database unsuccessful error in db ......',
                })
            });

        } catch (err) {
            return res.status(500).json({
                error: 'delete course from cart in Database unsuccessful error in db catch ......',
            })
        }
    }

}

const getCoursesOfCartController = {
    async getCoursesOfCart(req, res, next) {
        console.log("get  course from cart contoller")
        try {
            await Cart.find({}).select('-__v').then(ress => {
                console.log("get from course from cart database successfulley ",)
                res.status(200).json({
                    success: 'get from course from cart database successfulley...',
                    cartCourseList: ress
                })
            }).catch(ress => {
                console.log("get from course from cart database failled ", ress)
                res.status(500).json({
                    error: 'get from course from cart database unsuccessful error in db ......',
                })
            });

        } catch (error) {
            return res.status(500).json({
                error: 'erron while getting course list catchBlock ......',
            })
        }
    }
}

module.exports = {
    getCoursesController, addCourseController,
    deleteCourseController, updateCourseController,
    addCourseToCart, deleteCourseFromCart, getCoursesOfCartController,
    likeCourse,disLikeCourse
};