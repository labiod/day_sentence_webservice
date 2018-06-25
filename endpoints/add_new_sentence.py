import boto3
import os
import uuid

def lambda_handler(event, context):
    
    recordId = str(uuid.uuid4())
    title = event["title"]
    content = event["content"]
    author = event["author"]
    category = event["category"]

    print('Generating new DynamoDB record, with ID: ' + recordId)
    print('Title: ' + title)
    print('Input Text: ' + content)
    print('Author: ' + author)
    
    #Creating new record in DynamoDB table
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(os.environ['DB_TABLE_NAME'])
    table.put_item(
        Item={
            'id'      : recordId,
            'title'   : title,
            'content' : content,
            'author'  : author,
            'category': category
        }
    )
    
    #Sending notification about new post to SNS
    client = boto3.client('sns')
    client.publish(
        TopicArn = os.environ['SNS_TOPIC'],
        Message = recordId
    )
    
    return recordId
