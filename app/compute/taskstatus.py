class TaskStatus:
    def __init__(self, taskId, sequence, status):
        self.taskId=taskId
        self.sequence = sequence
        self.status = status

    def __str__(self):
        return "Task %s for %s is %s" %(self.taskId, self.sequence, self.status)