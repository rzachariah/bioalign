from __future__ import print_function # Python 2/3 compatibility
import boto3
import json
import decimal
from datetime import datetime

dynamodb = boto3.resource('dynamodb', region_name='us-east-1')

table = dynamodb.Table('alignment')

def storeAlignment(alignment):
    print("Storing alignment")
    table.put_item(
        Item={
            'id': alignment.id,
            'time': datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"),
            'sequence': alignment.sequence,
            'proteinName': alignment.proteinName,
            'proteinPosition': alignment.proteinPosition
        }
    )
