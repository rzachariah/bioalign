from __future__ import print_function # Python 2/3 compatibility
import boto3
import json
import decimal
import datetime as dt

dynamodb = boto3.resource('dynamodb', region_name='us-east-1')

alignments_store = dynamodb.Table('Alignments')
tasks_store = dynamodb.Table('Tasks')

def storeAlignment(alignment):
    print("Storing alignment | " + str(alignment))
    alignments_store.put_item(
        Item={
            'date': dt.datetime.utcnow().date().isoformat(),
            'time': dt.datetime.utcnow().isoformat()+'Z',
            'taskId': alignment.taskId,
            'sequence': alignment.sequence,
            'proteinName': alignment.proteinName,
            'proteinPosition': alignment.proteinPosition
        }
    )

def putTaskStatus(taskStatus):
    print("Storing taskStatus | " + str(taskStatus))
    tasks_store.put_item(
        Item={
            'taskId': taskStatus.taskId,
            'sequence': taskStatus.sequence,
            'status': taskStatus.status
        }
    )
