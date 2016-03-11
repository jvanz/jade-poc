import requests

api_url = "http://localhost:8080/api/0.9.0"

def get_user(id=None):
	url = api_url + "/user"
	response = requests.get(url, params={"id": id})
	return response.json()

def get_device(id=None):
	url = api_url + "/device"
	response = requests.get(url, params={"id": id})
	return response.json()
