from locust import HttpUser, between, task
from random import randrange
import json

class readFile():
    def __init__(self):
        self.data = []

    def getData(self):
        size = len(self.data)
        if size > 0:
            index = randrange(0, size - 1) if size > 1 else 0
            return self.data.pop(index)
        else:
            print(f'Información: No quedan más registros')
            return None
    
    def loadFile(self):
        try:
            with open("traffic.json", 'r') as file:
                self.data = json.loads(file.read())
                print(f'Información: El archivo ha sido leido')
        except Exception:
            print(f'Error: {Exception}')
            return None

class trafficData(HttpUser):
    wait_time = between(0.1, 0.9) #Tiempo de espera entre registros
    reader = readFile()
    reader.loadFile()

    @task
    def sendMessage(self):
        data = self.reader.getData()
        if data is not None:
            endpoint = "/grpc" if randrange(2) == 0 else "/redis"
            res = self.client.post(endpoint, json=data, headers={"Host": "proyecto.com"})
        else:
            return None


'''from locust import HttpUser, between, task
from random import randrange
import json

class readFile():
    def __init__(self):
        self.data = []

    def getData(self):
        size = len(self.data)
        if size > 0:
            index = randrange(0, size - 1) if size > 1 else 0
            return self.data.pop(index)
        else:
            print(f'Información: No quedan más registros')
            return None
    
    def loadFile(self):
        try:
            with open("traffic.json", 'r') as file:
                self.data = json.loads(file.read())
                print(f'Información: El archivo ha sido leido')
        except Exception:
            print(f'Error: {Exception}')
            return None

class trafficData(HttpUser):
    wait_time = between(0.1, 0.9) #Tiempo de espera entre registros
    reader = readFile()
    reader.loadFile()

    @task
    def sendMessage(self):
        data = self.reader.getData()
        if data is not None:
            res = self.client.post("/redis", json=data, headers={"Host": "proyecto.com"})
        else:
            return None
'''