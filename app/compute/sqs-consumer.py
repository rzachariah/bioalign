import boto3
import json
from biosearch import align
from dal import storeAlignment, putTaskStatus
from taskstatus import TaskStatus

sqs = boto3.resource('sqs', region_name='us-east-1')

queue = sqs.get_queue_by_name(
    QueueName='align-request', QueueOwnerAWSAccountId='848798434565')


def execute(task):
    # 0. validate task schema
    print("Task: {0}".format(task))
    # 1. mark task started
    taskStatus=TaskStatus(task["taskId"], task["sequence"], "Started")
    putTaskStatus(taskStatus)
    # 2. perform task: align
    searchSequence = task["sequence"]
    match = align(searchSequence)
    match.taskId = task["taskId"]
    print(match)
    # 3. store alignment
    storeAlignment(match)
    # 3. mark task completed
    taskStatus.status = "Completed"
    putTaskStatus(taskStatus)


while 1:
    print('Fetching messages...')
    messages = queue.receive_messages(WaitTimeSeconds=20)
    for message in messages:
        print("Message received: {0}".format(message.body))
        task = json.loads(message.body)
        execute(task)
        message.delete()
