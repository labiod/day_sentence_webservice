import boto3
import os
from boto3.dynamodb.conditions import Key, Attr

def lambda_handler(event, context):
    
    sentenceId = event["id"]
    
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(os.environ['DB_TABLE_NAME'])
    
    items = table.query(
        KeyConditionExpression=Key('id').eq(sentenceId)
    )
    
    return items["Items"][0]
