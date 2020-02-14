# The BlueSense Project and Mr. Sans

[![Build Status](https://travis-ci.com/skyzh/BlueSense.svg?branch=master)](https://travis-ci.com/skyzh/BlueSense)

🌈 BlueSense is a low-cost IoT platform for collecting and visualizing
environment data. It has been collecting climate data in Shanghai for over 2 years.

[Mr. Sans](https://github.com/skyzh/MrSans/) is the climate reporter 
of BlueSense. He makes regular report in Telegram channel 
[Sans loves Monitoring](https://t.me/s/thebluesense), alerts 
incidents and helps maintain Firebase database.

This repo contains frontend part of the BlueSense project, and serves as
the main portal of issues and wikis for the whole BlueSense project.

Data on [BlueSense site](https://bluesense.skyzh.xyz) and from Mr. Sans are
collected from Alex Chi's home.

You may subscribe to [Sans loves Monitoring](https://t.me/s/thebluesense)
or visit [BlueSense site](https://bluesense.skyzh.xyz) for realtime
climate data.

## Any Question?

Feel free to create any issue [here](https://github.com/skyzh/BlueSense/issues) 
regarding the BlueSense project, Mr. Sans and the Telegram channel.
We're glad to help and will help sort your issues into related
projects including Mr. Sans, BlueMarine, BlueSensor.

## Legacy Branch

This branch is the next generation of BlueSense. For previous versions,
refer to [legacy](https://github.com/skyzh/BlueSense/tree/legacy) branch.
We're still working on this project.

This repo contains frontend part of the BlueSense project. The next generation of
BlueSense is built with Vue, which builds and deploys significantly faster
and has a smaller bundle size than the legacy version using Angular.
BlueSense site in this generation serves two main purposes: real-time report
and historical data archive. It's is aimed at reducing bundle size and speeding up loading.
Therefore, I substitute dependencies such as Angular, Firebase and chart.js for
Vue, Firebase REST API and hand-made chart component. Meanwhile I only import
a small part of Bootstrap.

## The BlueSense Project

The BlueSense Project includes multiple parts.

[Mr. Sans](https://github.com/skyzh/MrSans/) is the climate reporter 
of BlueSense.

[BlueMarine](https://github.com/skyzh/BlueMarine) runs on Raspberry Pi. 
It collects data via Bluetooth from Arduino, and pushes them into
Prometheus.

[BlueSensor](https://github.com/skyzh/BlueSensor) runs on Arduino. 
It collects data from sensors.

## Related Works

[BrownSense](https://github.com/PhotonQuantum/BrownSense)
is yet another environment monitoring tool made by a group
of students in our school. According to their intro, this is
a "distributed IoT platform for monitoring and improving
toilet's indoor air quality."

## Devices required for runnning BlueSense

### Legacy
<li><a href="https://www.raspberrypi.org/products/raspberry-pi-3-model-b/">Raspberry Pi 3 Model B</a></li>
<li> ↕️ Serial via BLE</li>
<li><a href="https://www.dfrobot.com/wiki/index.php/Bluno_Mega_2560_(SKU:DFR0323)">DFRobot Bluno Mega 2560</a></li>
<li> ↕️ Serial & I2C</li>
<li><a href="https://www.dfrobot.com/wiki/index.php/Gravity:_I2C_BME280_Environmental_Sensor_(Temperature,_Humidity,_Barometer)_SKU:_SEN0236">Gravity: I2C BME280 Environmental Sensor (Temperature, Humidity, Barometer)</a></li>
<li><a href="https://www.dfrobot.com/wiki/index.php/PM2.5_laser_dust_sensor_SKU:SEN0177">PM2.5 Laser Dust Sensor</a></li>

### Next Generation
* Arduino Uno or Arduino Mega: collecting data
* Raspberry Pi 4B: collecting and analyzing data, running Mr. Sans
* Sensors: BME280, PM2.5 Sensor
* HC-42: trasmitting data to Raspberry Pi with Bluetooth Low Energy

## Roadmap

The main goal of this project is to create an all-in-one platform for collecting, storing,
persisting and visualizing any time series. BlueSensor, BlueMarine, Mr. Sans and BlueSense,
these four projects fulfill those purposes.

- [ ] Polish BlueSense website
- [ ] Documentation on how data is stored
- [ ] Data migration from legacy BlueSense
- [ ] Documentation for self-hosting BlueSense
- [ ] Sense Config specification. One Sense Config can be deployed to all four projects, specifying which data to monitor and how to analyze.

## Milestones
* On February 13 2020, new BlueSense website built with Vue was set up.
* On February 10 2020, I developed Mr. Sans bot in one day. The Telegram reporting service recovered and
  came with a new plot design.
* On February 9 2020, the next generation BlueSense service was set up.
* On November 29 2019, constant device failure drived me mad, and I decided to stop the BlueSense service.
* On October 16 2019, I started to work on the next generation of BlueSense.
* On December 10 2017, Telegram bot and RSS feed were introduced to provide easier access to data.
* On November 11 2017, BlueSense got a new font applied to all pages and was upgraded to Angular 5.
* On August 4 2017, BlueSense was back with new sensor devices and new design.
* On July 26 2017, BlueSense was under maintenance due to constant sensor failure.
* On May 28 2017, BlueSense was set up.
* On Apr 2 2016, EnvMonitor was set up, but the service ended one month later. The development of
  EnvMonitor inspired me to develop the BlueSense project.

## Notice on Data Usage

Data on [BlueSense site](https://bluesense.skyzh.xyz) and from Mr. Sans are
collected from Alex Chi's home. You're free to use these data for any purpose.
I'll later add documentation on how to export data from BlueSense and Firebase.

To be clear, sensors are installed indoor, which means those collected data
may not reflect real climate situation of Shanghai. There're two main
causes of data incredibility. 

* Air-purifier may cause lower PM2.5 and PM10 data.
* Air-conditioner may cause inaccurate temperature data. Generally air-condition is only
  turned on in summer, so the temperature collected might seem lower than outdoor.

## Chinese Intro

BlueSense 是一套收集处理并可视化环境数据的一站式解决方案。仅需购买一些硬件，并注册使用免费的
Google Firebase 数据库，您就可以搭建属于自己的环境监测平台。到现在为止，BlueSense
已经持续监测了两年上海气象情况。

小蓝 (Mr. Sans) 是一个气象数据播报机器人。他每个小时都会把实时气象数据推送到
[小蓝和他的 BlueSense](https://t.me/s/thebluesense) 这个 Telegram 频道里。

BlueSense 网站上的数据和小蓝在频道中推送的数据都是在 Alex Chi 家里收集的。

若需获取实时气象数据，请访问 [BlueSense 网站](https://bluesense.skyzh.xyz)
或者订阅 [小蓝和他的 BlueSense](https://t.me/thebluesense)。
