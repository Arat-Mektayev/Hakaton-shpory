from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import json
import os
from rustore import models
AppList : list[models.AppInfo] = []
# Load `list_of_apps.json` from the same directory as this views.py file
_json_path = os.path.join(os.path.dirname(__file__), 'list_of_apps.json')
try:
    with open(_json_path, 'r', encoding='utf-8') as f:
        AppList = json.load(f)
        print(AppList)
        AppList = list(map(lambda app: models.AppInfo(**app), AppList))
except FileNotFoundError:
    AppList = []

def concreteapp(request, id):
    filtered_app = list(filter(lambda app: app.ID == id, AppList))
    return JsonResponse(filtered_app[0],safe=False, encoder=models.ModelEncoder)

def apps(request):  
    return JsonResponse(AppList, safe=False, encoder=models.ModelEncoder)


    
# Create your views here.
