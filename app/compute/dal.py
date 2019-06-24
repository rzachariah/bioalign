from __future__ import print_function # Python 2/3 compatibility
import boto3
import json
import decimal
import datetime as dt

dynamodb = boto3.resource('dynamodb', region_name='us-east-1')

table = dynamodb.Table('Alignments')

def storeAlignment(alignment):
    print("Storing alignment")
    table.put_item(
        Item={
            'date': dt.datetime.utcnow().date().isoformat(),
            'time': dt.datetime.utcnow().isoformat()+'Z',
            'taskId': alignment.taskId,
            'sequence': alignment.sequence,
            'proteinName': alignment.proteinName,
            'proteinPosition': alignment.proteinPosition
        }
    )
