import serial
from time import time
import requests

ser = serial.Serial()
ser = serial.Serial('COM5', 9600)  # open the serial port

def send_to_firebase(stepcount: int):
    ms = str(int(time() * 1000))
    requests.post('https://lifetracker-mads-default-rtdb.firebaseio.com/steps.json',
    json={ "steps": stepcount, "time": ms })
while True:
    message = ser.readline()
    decode = message.decode().split()
    send_to_firebase(int(decode[0]))