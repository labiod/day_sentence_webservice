import boto3
import os
from boto3.dynamodb.conditions import Key, Attr
from random import randint

def lambda_handler(event, context):

    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(os.environ['DB_TABLE_NAME'])
    catTable = dynamodb.Table(os.environ['CAT_TABLE_NAME'])
       
    items = table.scan()
    index = randint(0, items["Count"])
    print("rand: " + str(index))
    randItem = items["Items"][index]
    cat = catTable.query(KeyConditionExpression=Key('id').eq(randItem["category"]))
    randItem["category"] = cat["Items"][0]["name"]

    return randItem