# The BlueSense Project and Mr. Sans

🌈 BlueSense is a low-cost IoT platform for collecting and visualizing
environment data. It has been collecting climate data in Shanghai for over 2 years.

[Mr. Sans](https://github.com/skyzh/MrSans/) is the climate reporter 
of BlueSense. He makes regular report in Telegram channel 
[Sans loves Monitoring](https://t.me/thebluesense), alerts 
incidents and helps maintain firebase database.

Data on [BlueSense site](https://bluesense.skyzh.xyz) and from Mr. Sans are
collected from Alex Chi's home.

You may subscribe to [Sans loves Monitoring](https://t.me/thebluesense)
or visit [BlueSense site](https://bluesense.skyzh.xyz) for realtime
climate data.

## Chinese Intro

BlueSense 是一套收集处理并可视化环境数据的一站式解决方案。仅需购买一些硬件，并注册使用免费的
Google Firebase 数据库，您就可以搭建属于自己的环境监测平台。到现在为止，BlueSense
已经持续监测了两年上海气象情况。

小蓝 (Mr. Sans) 是一个气象数据播报机器人。他每个小时都会把实时气象数据推送到
[小蓝和他的 BlueSense](https://t.me/thebluesense) 这个 Telegram 频道里。

BlueSense 网站上的数据和小蓝在频道中推送的数据都是在 Alex Chi 家里收集的。

若需获取即时气象数据，请访问 [BlueSense 网站](https://bluesense.skyzh.xyz)
或者订阅 [小蓝和他的 BlueSense](https://t.me/thebluesense)。

## Legacy Branch

This branch is the next generation of BlueSense. For previous versions,
refer to [legacy](https://github.com/skyzh/BlueSense/tree/legacy) branch.
We're still working on this project.

This repo contains frontend of the BlueSense projet.

## Related Projects

[Mr. Sans](https://github.com/skyzh/MrSans/) is the climate reporter 
of BlueSense.

[BlueMarine](https://github.com/skyzh/BlueMarine) runs on Raspberry Pi. 
It collects data via Bluetooth from Arduino, and pushes them into
Prometheus.

[BlueSensor](https://github.com/skyzh/BlueSensor) runs on Arduino. 
It collects data from sensors.

## Devices Required for runnning BlueSense

* Arduino Uno or Arduino Mega: collecting data
* Raspberry Pi: collecting and analyzing data, running Mr. Sans
* Sensors: BME280, PM2.5 Sensor
* HC-42: trasmitting data to Raspberry Pi with Bluetooth Low Energy
