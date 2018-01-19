const admin = require('firebase-admin');
const moment = require('moment');
const _ = require('lodash');
const debug = require('debug')('bluesense:canvas*');
const Canvas = require('canvas-prebuilt');
const CANVAS_WIDTH = 1080, CANVAS_HEIGHT = 1080;

const TEST_DATASET = [21.23, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 1, 2, 3, 4, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 1, 2, 3, 4];

const draw_text_title = (ctx, x, y, t) => {
  ctx.save();
  ctx.fillStyle = '#000000';
  ctx.font = '20px Arial';
  ctx.fillText(t, x, y);
  ctx.restore();
}

const draw_text = (ctx, x, y, t, r) => {
  ctx.save();
  ctx.fillStyle = '#000000';
  ctx.font = '8px Arial';
  ctx.translate(x, y);
  ctx.rotate(r * Math.PI / 180);
  ctx.translate(-x, -y);
  ctx.fillText(t, x, y);
  ctx.restore();
}

const draw_text_header = (ctx, x, y, t) => {
  ctx.save();
  ctx.fillStyle = '#666666';
  ctx.font = '12px Arial';
  ctx.fillText(t, x, y);
  ctx.restore();
}

const draw_background = (ctx, w, h) => {
  ctx.save();
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, w, h);
  ctx.restore();
}

const __draw_bar = (ctx, x, y, w, h, c) => {
  ctx.fillStyle = c;
  ctx.fillRect(x, y, w, h);
};

const draw_bar = (ctx, x, y, w, h, m, n, d, c, t) => {
  __draw_bar(ctx, x + n * w + (n - 1) * m, y + h - d * h, w, d * h, c);
  draw_text(ctx, x + n * w + (n - 1) * m, y + h + 15, t, -20);
}

const draw_data = (ctx, x, y, dataset) => {
  const _min = _.min(dataset) - 0.05;
  const _max = _.max(dataset) + 0.05;
  const _delta = _max - _min;
  if (_delta == 0) {
    _delta = 1;
    _max += 0.5;
    _min -= 0.5;
  }
  _.forEach(dataset, (d, i) => {
    draw_bar(ctx, x, y, 18, 150, 2, i, (d - _min) / _delta, 'rgba(21,101,192,0.5)', Math.round(d * 10) / 10);
  });
}

module.exports = (query) => new Promise((resolve, reject) => {
  const canvas = new Canvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  const ctx = canvas.getContext('2d');
  ctx.antialias = 'gray';
  draw_background(ctx, CANVAS_WIDTH, CANVAS_HEIGHT);

  let feed_data = admin.database().ref('/stat/hourly').orderByKey().endAt(query).limitToLast(48);
  feed_data.once('value').then(snapshot => {
    let dataset = [];
    let current_y = 0;
    const move_forward_title = () => { current_y += 160 };
    const move_forward_chart = () => { current_y += 50 };

    snapshot.forEach(childSnapshot => { dataset.push(childSnapshot.val()) });
    draw_text_header(ctx, 50, 20, 'BlueSense 48hrs Data Report');

    draw_text_title(ctx, 50, current_y + 50, 'Temperature (°C) in the past 48 hrs');
    move_forward_chart();
    draw_data(ctx, 50, current_y, _.map(dataset, 'tc'));
    move_forward_title();
    draw_text_title(ctx, 50, current_y + 50, 'Humidity (%) in the past 48 hrs');
    move_forward_chart();
    draw_data(ctx, 50, current_y, _.map(dataset, 'hum'));
    move_forward_title();
    draw_text_title(ctx, 50, current_y + 50, 'Barometric Pressure (Pa) in the past 48 hrs');
    move_forward_chart();
    draw_data(ctx, 50, current_y, _.map(dataset, 'pressure'));
    move_forward_title();
    draw_text_title(ctx, 50, current_y + 50, 'PM10 (µg/m3) in the past 48 hrs');
    move_forward_chart();
    draw_data(ctx, 50, current_y, _.map(dataset, 'pm10'));
    move_forward_title();
    draw_text_title(ctx, 50, current_y + 50, 'PM2.5 (µg/m3) in the past 48 hrs');
    move_forward_chart();
    draw_data(ctx, 50, current_y, _.map(dataset, 'pm25'));
    let stream = canvas.pngStream({
      bufsize: 4096,
      quality: 100,
      progressive: true 
    });
    resolve(stream);
  });
});


