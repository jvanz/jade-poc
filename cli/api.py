import requests
import logging

api_url = "http://localhost:8080/api/0.9.0"

def get_user(id=None):
	url = api_url + "/user"
	response = requests.get(url, params={"id": id})
	return response.json()

def get_device(id=None):
	url = api_url + "/device"
	response = requests.get(url, params={"id": id})
	return response.json()

def edit_device(payload):
	url = api_url + "/device"
	response = requests.post(url, data=payload)
	return response.status_code == 200

def edit_user(payload):
	url = api_url + "/user"
	response = requests.post(url, data=payload)
	return response.status_code == 200

def delete_user(user):
	if user is None:
		return
	url = api_url + "/user"
	response = requests.delete(url, params={"id": user["id"]})
	return response.status_code == 200

def delete_device(device):
	if device is None:
		return
	url = api_url + "/device"
	response = requests.delete(url, params={"id": device["id"]})
	return response.status_code == 200
