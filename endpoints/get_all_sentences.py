import boto3
import os
from boto3.dynamodb.conditions import Key, Attr

def lambda_handler(event, context):

    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(os.environ['DB_TABLE_NAME'])
    catTable = dynamodb.Table(os.environ['CAT_TABLE_NAME'])
       
    items = table.scan()
    print(items["Count"])
    for item in items["Items"]:
        cat = catTable.query(KeyConditionExpression=Key('id').eq(item["category"]))
        item["category"] = cat["Items"][0]["name"]

    return items["Items"]