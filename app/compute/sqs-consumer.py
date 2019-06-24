import boto3
import json
from biosearch import align
from dal import storeAlignment

sqs = boto3.resource('sqs', region_name='us-east-1')

queue = sqs.get_queue_by_name(QueueName='test-queue')

def execute(task):
    # 0. validate task schema
    print("Task: {0}".format(task))
    # 1. update task state
    # 2. perform task: align
    searchSequence = task["sequence"]
    match = align(searchSequence)
    match.id = task["taskId"]
    print(match)
    storeAlignment(match)


while 1:
    print('Fetching messages')
    messages = queue.receive_messages(WaitTimeSeconds=5)
    for message in messages:
        print("Message received: {0}".format(message.body))
        task = json.loads(message.body)
        execute(task)
        message.delete()


    