from django.db import models
from dataclasses import dataclass
from django.core.serializers.json import DjangoJSONEncoder

@dataclass
class AppInfo:
    ID: int
    Name : str
    Developer : str
    Age : str
    Description : str
    popularityScore : int
    Screenshots : list[str]
    Category : str
    IconPath : str
    FilePath : str
    Rate : float
    isNew : bool
    tags : list[str]
    isEditorChoice : bool
    
class ModelEncoder(DjangoJSONEncoder):
    def default(self, obj):
        if isinstance(obj, AppInfo):
            return obj.__dict__
        return super().default(obj)
# Create your models here.
