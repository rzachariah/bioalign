const queue=[];

class QueueService
{
    constructor() {
    }

    enqueue(task) {
        queue.push(task);
    }

    dequeue() {
        if (queue.length > 0) {
            return queue.shift();
        }
        return null;
    }

}

module.exports = new QueueService();