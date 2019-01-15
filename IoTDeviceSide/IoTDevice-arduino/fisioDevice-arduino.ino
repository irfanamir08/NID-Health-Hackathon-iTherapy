
#include "I2Cdev.h"

#include "MPU6050_6Axis_MotionApps20.h"

#if I2CDEV_IMPLEMENTATION == I2CDEV_ARDUINO_WIRE
#include "Wire.h"
#endif

// class default I2C address is 0x68
// specific I2C addresses may be passed as a parameter here
// AD0 low = 0x68 (default for SparkFun breakout and InvenSense evaluation board)
// AD0 high = 0x69
MPU6050 mpu1 (0x68);
MPU6050 mpu2(0x69); // <-- use for AD0 high


// uncomment "OUTPUT_READABLE_QUATERNION" if you want to see the actual
// quaternion components in a [w, x, y, z] format (not best for parsing
// on a remote host such as Processing or something though)
#define OUTPUT_READABLE_QUATERNION

// uncomment "OUTPUT_READABLE_YAWPITCHROLL" if you want to see the yaw/
// pitch/roll angles (in degrees) calculated from the quaternions coming
// from the FIFO. Note this also requires gravity vector calculations.
// Also note that yaw/pitch/roll angles suffer from gimbal lock (for
// more info, see: http://en.wikipedia.org/wiki/Gimbal_lock)
//#define OUTPUT_READABLE_YAWPITCHROLL


#define INTERRUPT_PIN3 3 // 0x69
#define INTERRUPT_PIN2 2 // use pin 2 for 0x68
#define LED_PIN 13 // (Arduino is 13, Teensy is 11, Teensy++ is 6)
bool blinkState = false;

// MPU control/status vars
bool dmpReady1 = false;  // set true if DMP init was successful
bool dmpReady2 = false;  // set true if DMP init was successful
uint8_t mpuIntStatus1;   // holds actual interrupt status byte from MPU
uint8_t mpuIntStatus2;   // holds actual interrupt status byte from MPU
uint8_t devStatus1;      // return status after each device operation (0 = success, !0 = error)
uint8_t devStatus2;      // return status after each device operation (0 = success, !0 = error)
uint16_t packetSize1;    // expected DMP packet size (default is 42 bytes)
uint16_t packetSize2;    // expected DMP packet size (default is 42 bytes)
uint16_t fifoCount1;     // count of all bytes currently in FIFO
uint16_t fifoCount2;     // count of all bytes currently in FIFO
uint8_t fifoBuffer1[64]; // FIFO storage buffer
uint8_t fifoBuffer2[64]; // FIFO storage buffer

// orientation/motion vars
Quaternion q;           // [w, x, y, z]         quaternion container
VectorInt16 aa;         // [x, y, z]            accel sensor measurements
VectorInt16 aaReal;     // [x, y, z]            gravity-free accel sensor measurements
VectorInt16 aaWorld;    // [x, y, z]            world-frame accel sensor measurements
VectorFloat gravity;    // [x, y, z]            gravity vector
float euler[3];         // [psi, theta, phi]    Euler angle container
float ypr[3];           // [yaw, pitch, roll]   yaw/pitch/roll container and gravity vector


// ================================================================
// ===               INTERRUPT DETECTION ROUTINE                ===
// ================================================================

volatile bool mpuInterrupt1 = false;     // indicates whether MPU interrupt pin has gone high
void dmpDataReady1() {
  mpuInterrupt1 = true;
}

volatile bool mpuInterrupt2 = false;     // indicates whether MPU interrupt pin has gone high
void dmpDataReady2() {
  mpuInterrupt2 = true;
}



// ================================================================
// ===                      INITIAL SETUP                       ===
// ================================================================

void setup() {
  // join I2C bus (I2Cdev library doesn't do this automatically)
#if I2CDEV_IMPLEMENTATION == I2CDEV_ARDUINO_WIRE
  Wire.begin();
  Wire.setClock(400000); // 400kHz I2C clock. Comment this line if having compilation difficulties
#elif I2CDEV_IMPLEMENTATION == I2CDEV_BUILTIN_FASTWIRE
  Fastwire::setup(400, true);
#endif

  // initialize serial communication
  // (115200 chosen because it is required for Teapot Demo output, but it's
  // really up to you depending on your project)
  Serial.begin(115200);
  while (!Serial); // wait for Leonardo enumeration, others continue immediately

  // NOTE: 8MHz or slower host processors, like the Teensy @ 3.3V or Arduino
  // Pro Mini running at 3.3V, cannot handle this baud rate reliably due to
  // the baud timing being too misaligned with processor ticks. You must use
  // 38400 or slower in these cases, or use some kind of external separate
  // crystal solution for the UART timer.

  // initialize device
//  Serial.println(F("Initializing I2C devices..."));
  mpu1.initialize();
  pinMode(INTERRUPT_PIN2, INPUT);
  mpu2.initialize();
  pinMode(INTERRUPT_PIN3, INPUT);


  // verify connection
//  Serial.println(F("Testing device connections..."));
//  Serial.println(mpu1.testConnection() ? F("0x68 successful") : F("0x68 failed"));
//  Serial.println(mpu2.testConnection() ? F("0x69 successful") : F("0x69 failed"));

  // wait for ready
//  Serial.println(F("\nSend any character to begin DMP programming and demo: "));
//  while (Serial.available() && Serial.read()); // empty buffer
//  while (!Serial.available());                 // wait for data
//  while (Serial.available() && Serial.read()); // empty buffer again

  // load and configure the DMP
//  Serial.println(F("Initializing DMP..."));
  devStatus1 = mpu1.dmpInitialize();
  devStatus2 = mpu2.dmpInitialize();

  // supply your own gyro offsets here, scaled for min sensitivity
  mpu1.setXGyroOffset(15);
  mpu1.setYGyroOffset(28);
  mpu1.setZGyroOffset(26);
  mpu1.setXAccelOffset(-1413);
  mpu1.setYAccelOffset(-255);
  mpu1.setZAccelOffset(876); // 1688 factory default for my test chip

  mpu2.setXGyroOffset(-6);
  mpu2.setYGyroOffset(-32);
  mpu2.setZGyroOffset(19);
  mpu2.setXAccelOffset(-3255);
  mpu2.setYAccelOffset(2468);
  mpu2.setZAccelOffset(-220); // 1688 factory default for my test chip

  // make sure it worked (returns 0 if so)
  if (devStatus1 == 0) {
    // turn on the DMP, now that it's ready
//    Serial.println(F("Enabling DMP..."));
    mpu1.setDMPEnabled(true);

    // enable Arduino interrupt detection
//    Serial.print(F("Enabling interrupt detection (Arduino external interrupt "));
//    Serial.print(digitalPinToInterrupt(INTERRUPT_PIN2));
//    Serial.println(F(")..."));
    attachInterrupt(digitalPinToInterrupt(INTERRUPT_PIN2), dmpDataReady1, RISING);
    mpuIntStatus1 = mpu1.getIntStatus();

    // set our DMP Ready flag so the main loop() function knows it's okay to use it
//    Serial.println(F("DMP ready! Waiting for first interrupt..."));
    dmpReady1 = true;

    // get expected DMP packet size for later comparison
    packetSize1 = mpu1.dmpGetFIFOPacketSize();
  } else {
    // ERROR!
    // 1 = initial memory load failed
    // 2 = DMP configuration updates failed
    // (if it's going to break, usually the code will be 1)
//    Serial.print(F(":DMP 0x68 Initialization failed (code "));
//    Serial.print(devStatus1);
//    Serial.println(F(")"));
  }

  if (devStatus2 == 0) {
    // turn on the DMP, now that it's ready
//    Serial.println(F("Enabling DMP..."));
    mpu2.setDMPEnabled(true);

    // enable Arduino interrupt detection
//    Serial.print(F("Enabling interrupt detection (Arduino external interrupt "));
//    Serial.print(digitalPinToInterrupt(INTERRUPT_PIN3));
//    Serial.println(F(")..."));
    attachInterrupt(digitalPinToInterrupt(INTERRUPT_PIN3), dmpDataReady2, RISING);
    mpuIntStatus1 = mpu1.getIntStatus();

    // set our DMP Ready flag so the main loop() function knows it's okay to use it
//    Serial.println(F("DMP ready! Waiting for first interrupt..."));
    dmpReady2 = true;

    // get expected DMP packet size for later comparison
    packetSize2 = mpu2.dmpGetFIFOPacketSize();
  } else {
    // ERROR!
    // 1 = initial memory load failed
    // 2 = DMP configuration updates failed
    // (if it's going to break, usually the code will be 1)
//    Serial.print(F("DMP 0x69 Initialization failed (code "));
//    Serial.print(devStatus2);
//    Serial.println(F(")"));
  }

  // configure LED for output
  pinMode(LED_PIN, OUTPUT);
}



// ================================================================
// ===                    MAIN PROGRAM LOOP                     ===
// ================================================================

void loop() {
  // if programming failed, don't try to do anything
  if (!dmpReady1) return;
  if (!dmpReady2) return;

  // wait for MPU interrupt or extra packet(s) available
  while (!mpuInterrupt1) {
    if (mpuInterrupt1) {
      // try to get out of the infinite loop
      fifoCount1 = mpu1.getFIFOCount();
    }
  }
  while (!mpuInterrupt2) {
    if (mpuInterrupt2) {
      // try to get out of the infinite loop
      fifoCount2 = mpu2.getFIFOCount();
    }
  }

  // reset interrupt flag and get INT_STATUS byte
  mpuInterrupt1 = false;
  mpuInterrupt2 = false;
  mpuIntStatus1 = mpu1.getIntStatus();
  mpuIntStatus2 = mpu2.getIntStatus();

  // get current FIFO count
  fifoCount1 = mpu1.getFIFOCount();
  fifoCount2 = mpu2.getFIFOCount();

  // check for overflow (this should never happen unless our code is too inefficient)
  if ((mpuIntStatus1 & _BV(MPU6050_INTERRUPT_FIFO_OFLOW_BIT)) || (fifoCount1 >= 1024) || (mpuIntStatus2 & _BV(MPU6050_INTERRUPT_FIFO_OFLOW_BIT)) || (fifoCount1 >= 1024)) {
    // reset so we can continue cleanly
    mpu1.resetFIFO();
    mpu2.resetFIFO();
    fifoCount1 = mpu1.getFIFOCount();
    fifoCount2 = mpu2.getFIFOCount();
    Serial.println(F("FIFO overflow!"));

    // otherwise, check for DMP data ready interrupt (this should happen frequently)
  } else if ((mpuIntStatus1 & _BV(MPU6050_INTERRUPT_DMP_INT_BIT)) && (mpuIntStatus2 & _BV(MPU6050_INTERRUPT_DMP_INT_BIT))) {
    // wait for correct available data length, should be a VERY short wait
    while (fifoCount1 < packetSize1) fifoCount1 = mpu1.getFIFOCount();
    while (fifoCount2 < packetSize2) fifoCount2 = mpu2.getFIFOCount();

    // read a packet from FIFO
    mpu1.getFIFOBytes(fifoBuffer1, packetSize1);
    mpu2.getFIFOBytes(fifoBuffer2, packetSize2);

    // track FIFO count here in case there is > 1 packet available
    // (this lets us immediately read more without waiting for an interrupt)
    fifoCount1 -= packetSize1;
    fifoCount2 -= packetSize2;

#ifdef OUTPUT_READABLE_QUATERNION
    // display quaternion values in easy matrix form: w x y z
    mpu1.dmpGetQuaternion(&q, fifoBuffer1);
//    Serial.print("quat\t");
    Serial.print(q.w);
    Serial.print(":");
    Serial.print(q.x);
    Serial.print(":");
    Serial.print(q.y);
    Serial.print(":");
    Serial.print(q.z);
    mpu2.dmpGetQuaternion(&q, fifoBuffer2);
    Serial.print(":");
    Serial.print(q.w);
    Serial.print(":");
    Serial.print(q.x);
    Serial.print(":");
    Serial.print(q.y);
    Serial.print(":");
    Serial.println(q.z);
#endif

#ifdef OUTPUT_READABLE_YAWPITCHROLL
//     display Euler angles in degrees
    mpu1.dmpGetQuaternion(&q, fifoBuffer1);
    mpu1.dmpGetGravity(&gravity, &q);
    mpu1.dmpGetYawPitchRoll(ypr, &q, &gravity);
//    Serial.print("ypr\t");
    Serial.print(ypr[0] * 180 / M_PI);
    Serial.print(":");
    Serial.print(ypr[1] * 180 / M_PI);
    Serial.print(":");
    Serial.print(ypr[2] * 180 / M_PI);
    
    mpu2.dmpGetQuaternion(&q, fifoBuffer2);
    mpu2.dmpGetGravity(&gravity, &q);
    mpu2.dmpGetYawPitchRoll(ypr, &q, &gravity);
    Serial.print(":");
    Serial.print(ypr[0] * 180 / M_PI);
    Serial.print(":");
    Serial.print(ypr[1] * 180 / M_PI);
    Serial.print(":");
    Serial.println((ypr[2] * 180 / M_PI));
#endif

Serial.flush();

    // blink LED to indicate activity
//    blinkState = !blinkState;
//    digitalWrite(LED_PIN, blinkState);
  }
}
