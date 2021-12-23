const axios = require('axios');

async function getTasks(){
    try {
        const res = await axios.get('/api/tasks')
        let result = res.data.sort((a,b) => a.sequenceNo-b.sequenceNo)
        console.log("result",result)
        result.map(task => {
            task._id = task.id
            task.text = task.title
            task.id = task.sequenceNo
            if (task.status === "DONE"){
                task.isComplete = true;
            }else{
                task.isComplete = false;
            }
        })
        // console.log("result",result)
        return result;
    } catch (error) {
        throw new Error(error)
    }
}
async function delTasks(todo){
    try {
        const res = await axios.delete('/api/tasks/'+todo._id)
        return res;
    } catch (error) {
        throw new Error(error)
    }
}
async function delAllTasks(){
    try {
        const res = await axios.delete('/api/tasks/all')
        return res;
    } catch (error) {
        throw new Error(error)
    }
}



async function createTasks(todo){
    try {
        const params = new URLSearchParams()
        const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
        params.append('title', todo.text)
        params.append('sequenceNo', todo.id)
        const res = await axios.post('/api/tasks', params, config)
        return res.data;
    } catch (error) {
        throw new Error(error)
    }
}
async function completeTasks(todo){
    try {
        const params = new URLSearchParams()
        const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
        params.append('status',"DONE")
        const res = await axios.patch('/api/tasks/'+todo._id+'/update', params, config)
        return res.data;
    } catch (error) {
        throw new Error(error)
    }
}
async function updateTask(todo){
    try {
        const params = new URLSearchParams()
        const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
        params.append('sequenceNo',todo.id)
        params.append('title',todo.text)
        const res = await axios.patch('/api/tasks/'+todo._id+'/update', params, config)
        return res.data;
    } catch (error) {
        throw new Error(error)
    }
}
export {getTasks, delTasks, createTasks,completeTasks,updateTask,delAllTasks};
