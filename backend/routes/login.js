const express = require('express')
const router = express.Router()
// const data = require('../data')
// const taskData = data.tasks
const admin = require('firebase-admin');

// admin.initializeApp({
//   credential: admin.credential.applicationDefault(),
//   databaseURL: 'https://cs554-awesome-final.firebaseio.com'
// });

module.exports.postLogin = async (request, response, next) => {
  const reqData = request.body
  console.log(reqData, '123123')

  if (!reqData || !reqData.idToken) {
    response.status(400).json({ error: 'You must provide data to create task' })
    return;
  }
  
  // idToken comes from the client app
  admin.auth().verifyIdToken(reqData.idToken)
  .then(function(decodedToken) {
    var uid = decodedToken.uid;
    // ...
    console.log(decodedToken)
    response.json({
      title: `${decodedToken}`,
    })
  }).catch(function(error) {
    // Handle error
    console.log(error)
    response.status(500).json({ error: 'Internal error' })
  });
}

// router.post('/', async (req, res) => {
//   const dataObj = req.body
//   if (!newTaskData) {
//     res.status(400).json({ error: 'Data error' })
//     return
//   }
//   try {
//     const { idToken } = dataObj
//     // const newTask = await taskData.createTask(title, description, hoursEstimated, completed, comments)
//     res.json({idToken:idToken})
//   } catch (e) {
//     res.status(500).json({
//       message: e.toString()
//     })
//   }
// })

// GET /api/tasks
// router.get('/', async (req, res) => {
//   const srcSkip = req.query.skip
//   const srcTake = req.query.take
//   const skip = parseInt(req.query.skip)
//   const take = parseInt(req.query.take)
//   if (srcSkip && srcSkip.length >= 1 && !Number.isInteger(skip)) {
//     res.status(400).json({ error: `Param 'skip' is not a integer. skip: ${srcSkip}` })
//     return
//   }
//   if (srcTake && srcTake.length >= 1 && !Number.isInteger(take)) {
//     res.status(400).json({ error: `Param 'take' is not a integer. take: ${srcTake}` })
//     return
//   }
//   if (srcTake && take === 0) {
//     res.status(400).json({ error: `param 'take' can't be 0. take: ${srcTake}` })
//     return
//   }
//   try {
//     const taskList = await taskData.getTasksList(skip, take)
//     res.json(taskList)
//   } catch (e) {
//     res.status(500).json({
//       message: e.toString()
//     })
//   }
// })

// // GET /api/tasks/:id
// router.get('/:id', async (req, res) => {
//   try {
//     const task = await taskData.getTaskById(req.params.id)
//     res.json(task)
//   } catch (e) {
//     res.status(404).json({ message: `Task id: ${req.params.id} not found` })
//   }
// })

// // POST /api/tasks
// router.post('/', async (req, res) => {
//   const newTaskData = req.body
//   if (!newTaskData) {
//     res.status(400).json({ error: 'You must provide data to create task' })
//     return
//   }
//   try {
//     const { title, description, hoursEstimated, completed, comments } = newTaskData
//     const newTask = await taskData.createTask(title, description, hoursEstimated, completed, comments)
//     res.json(newTask)
//   } catch (e) {
//     res.status(500).json({
//       message: e.toString()
//     })
//   }
// })

// // PUT /api/tasks/:id
// router.put('/:id', async (req, res) => {
//   const newTaskData = req.body
//   if (!newTaskData) {
//     res.status(400).json({ error: 'You must provide data to update task' })
//     return
//   }

//   try {
//     const { title, description, hoursEstimated, completed, comments } = newTaskData
//     if (title === undefined || description === undefined ||
//       hoursEstimated === undefined || completed === undefined) {
//       res.status(400).json({ error: `Not all params supplied. title:${title} description:${description} completed:${completed} comments:${comments}` })
//       return
//     }
//     let id = req.params.id
//     try {
//       await taskData.getTaskById(id)
//     } catch (e) {
//       res.status(404).json({ error: `Task not found. id: ${id}` })
//       return
//     }
//     const updatedTask = await taskData.updateTaskById(id, title, description, hoursEstimated, completed)
//     res.json(updatedTask)
//   } catch (e) {
//     res.status(500).json({
//       message: e.toString()
//     })
//   }
// })

// // PATCH /api/tasks/:id
// router.patch('/:id', async (req, res) => {
//   const newTaskData = req.body
//   if (!newTaskData) {
//     res.status(400).json({ error: 'You must provide data to patch task' })
//     return
//   }

//   try {
//     const { title, description, hoursEstimated, completed } = newTaskData
//     if (title === undefined && description === undefined &&
//       hoursEstimated === undefined && completed === undefined) {
//       res.status(400).json({
//         error: `You must supply at least one valide value to patch. title: ${title} description: ${description} completed: ${completed}`
//       })
//       return
//     }
//     let id = req.params.id
//     try {
//       await taskData.getTaskById(id)
//     } catch (e) {
//       res.status(404).json({ error: `Task not found. id: ${id}` })
//       return
//     }

//     let updatedParams = {
//       id: id,
//       title: title,
//       description: description,
//       hoursEstimated: hoursEstimated,
//       completed: completed
//     }
//     const updatedTask = await taskData.updateTaskByIdPatch(id, updatedParams)
//     res.json(updatedTask)
//   } catch (e) {
//     res.status(500).json({
//       message: e.toString()
//     })
//   }
// })

// // POST /api/tasks
// router.post('/:id/comments', async (req, res) => {
//   const newComment = req.body
//   if (!newComment) {
//     res.status(400).json({ error: 'You must provide data to create comment' })
//     return
//   }
//   const { name, comment } = newComment
//   if (name === undefined && comment === undefined) {
//     res.status(400).json({
//       error: `Params Error. Parameters got: name ${name} comment ${comment} `
//     })
//     return
//   }
//   let id = req.params.id
//   try {
//     await taskData.getTaskById(id)
//   } catch (e) {
//     res.status(404).json({ error: `Task not found. id: ${id}` })
//     return
//   }
//   try {
//     const updatedTask = await taskData.addComment(id, newComment)
//     res.json(updatedTask)
//   } catch (e) {
//     res.status(500).json({
//       message: e.toString()
//     })
//   }
// })

// // DELETE /api/tasks/:taskId/:commentId
// router.delete('/:taskId/:commentId', async (req, res) => {
//   const taskId = req.params.taskId
//   const commentId = req.params.commentId
//   try {
//     await taskData.getTaskById(taskId)
//   } catch (e) {
//     res.status(404).json({ error: `Task not found. taskId: ${taskId}` })
//     return
//   }
//   try {
//     await taskData.getCommentById(commentId)
//   } catch (e) {
//     res.status(404).json({ error: `Comment of Task not found. commentId: ${commentId}` })
//     return
//   }
//   try {
//     const updatedTask = await taskData.deleteComment(taskId, commentId)
//     res.json(updatedTask)
//   } catch (e) {
//     res.status(500).json({
//       message: e.toString()
//     })
//   }
// })

// module.exports = router
