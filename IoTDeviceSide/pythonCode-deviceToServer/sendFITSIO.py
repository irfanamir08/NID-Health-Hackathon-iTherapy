import requests
import time
import random
import serial


# url ='https://cryptic-journey-93975.herokuapp.com/fetch' # change route base on server url

url1 = 'http://localhost:8000/replay'    #for database
url = 'http://localhost:8000/live'       # for device
ser = serial.Serial('COM6',baudrate=115200)
raw = ser.readline().decode('ascii')
# time.sleep(.2)

# -----------------------data from file----------------
filename = r'C:\Users\HAZIQ SUHAIMI\Desktop\health hackathon\dataset_example\recorded2.txt'
f = open(filename,'r')
lines = f.readlines()
f.close()

for i in range(len(lines)):
    angle = lines[i].split(':')
    data = {
        'l_shoulderX' : float(angle[2]),
        'l_shoulderY' : float(angle[1]),
        'l_shoulderZ' : float(angle[0]),
        'l_elbowX' : float(angle[3])*-1,
        'l_elbowY' : float(angle[4])*-1,
        'l_elbowZ' : 0
    }
    # print (data)
    r = requests.post(url1,data)

    raw = ser.readline().decode('ascii')
    r = raw[:-2]
    angle = r.split(':')
    if (len(angle)==6):
        data = {
            'l_shoulderX' : float(angle[2]),
            'l_shoulderY' : float(angle[1]),
            'l_shoulderZ' : float(angle[0]),
            'l_elbowX' : float(angle[3])*-1,
            'l_elbowY' : float(angle[4])*-1,
            'l_elbowZ' : 0
        }
        r = requests.post(url,data)
        # print(data)
        ser.flush()
        ser.flushInput()
        ser.flushOutput()
    time.sleep(0.1)


# ----------------------realtime random data------------------



# while True:

    # time.sleep(.1)
# ---------------------------send random data----------------------------------
# while True:
#     data = {
#         'deviceID' : '0001',
#         'l_shoulderX': random.uniform(-180,90) ,
#         'l_shoulderY': random.uniform(0,270) ,
#         'l_shoulderZ': random.uniform(-180,0) ,
#         'l_elbowX': random.uniform(-180,0),
#         'l_elbowY': random.uniform(0,150)
#     }
#     r = requests.post(url,data)
#     time.sleep(1)










# ------------------------------------------------------------
