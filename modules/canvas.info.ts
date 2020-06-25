import { createCanvas, loadImage, registerFont } from 'canvas';
import fs from 'fs';

const canvasInfo = async () => {
  registerFont('.font/GmarketSans/GmarketSansTTFLight.ttf', { family: 'GmarketSansLight'});
  const font = `12px GmarketSansLight`;

  const canvasWidth = 320;
  const canvasHalfWidth = 160;
  const canvasQuarterWidth = 80;

  const textMarginTop = 5;

  const textMarginLeft = canvasHalfWidth + 10;
  const defaultMargin = 20;

  const valueMarginLeft = canvasQuarterWidth + 10;
  const valueMarginLeft2 = canvasHalfWidth + canvasQuarterWidth + 10;

  const canvas = createCanvas(canvasWidth, textMarginTop * 3 + defaultMargin * 10);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvasWidth, textMarginTop * 3 + defaultMargin * 10);

  ctx.font = font;
  ctx.fillStyle = '#fff';

  ctx.fillText('힘', 10, textMarginTop + defaultMargin);
  ctx.fillText('지능', 10, textMarginTop + defaultMargin * 2);
  ctx.fillText('체력', 10, textMarginTop + defaultMargin * 3);
  ctx.fillText('정신력', 10, textMarginTop + defaultMargin * 4);

  ctx.fillText('물리 공격', 10, textMarginTop * 2 + defaultMargin * 5);
  ctx.fillText('마법 공격', 10, textMarginTop * 2 + defaultMargin * 6);
  ctx.fillText('독립 공격', 10, textMarginTop * 2 + defaultMargin * 7);

  ctx.fillText('물리 크리티컬', 10, textMarginTop * 3 + defaultMargin * 8);
  ctx.fillText('마법 크리티컬', 10, textMarginTop * 3 + defaultMargin * 9);

  ctx.fillText('공격 속도', textMarginLeft, textMarginTop + defaultMargin);
  ctx.fillText('캐스팅 속도', textMarginLeft, textMarginTop + defaultMargin * 2);
  ctx.fillText('이동 속도', textMarginLeft, textMarginTop + defaultMargin * 3);
  
  ctx.fillText('항마', textMarginLeft, textMarginTop * 2 + defaultMargin * 4);

  ctx.fillText('화속성 강화', textMarginLeft, textMarginTop * 3 + defaultMargin * 5);
  ctx.fillText('수속성 강화', textMarginLeft, textMarginTop * 3 + defaultMargin * 6);
  ctx.fillText('명속성 강화', textMarginLeft, textMarginTop * 3 + defaultMargin * 7);
  ctx.fillText('암속성 강화', textMarginLeft, textMarginTop * 3 + defaultMargin * 8);

  ctx.fillStyle = '#B9DA7C';

  ctx.fillText('1000', valueMarginLeft, textMarginTop + defaultMargin);
  ctx.fillText('1000', valueMarginLeft, textMarginTop + defaultMargin * 2);
  ctx.fillText('1000', valueMarginLeft, textMarginTop + defaultMargin * 3);
  ctx.fillText('1000', valueMarginLeft, textMarginTop + defaultMargin * 4);

  ctx.fillText('10000', valueMarginLeft, textMarginTop * 2 + defaultMargin * 5);
  ctx.fillText('10000', valueMarginLeft, textMarginTop * 2 + defaultMargin * 6);
  ctx.fillText('10000', valueMarginLeft, textMarginTop * 2 + defaultMargin * 7);

  ctx.fillText('100.5%', valueMarginLeft, textMarginTop * 3 + defaultMargin * 8);
  ctx.fillText('199.5%', valueMarginLeft, textMarginTop * 3 + defaultMargin * 9);

  ctx.fillText('61.5%', valueMarginLeft2, textMarginTop + defaultMargin);
  ctx.fillText('55.2%', valueMarginLeft2, textMarginTop + defaultMargin * 2);
  ctx.fillText('14%', valueMarginLeft2, textMarginTop + defaultMargin * 3);
  
  ctx.fillText('77777', valueMarginLeft2, textMarginTop * 2 + defaultMargin * 4);

  ctx.fillText('100', valueMarginLeft2, textMarginTop * 3 + defaultMargin * 5);
  ctx.fillText('131', valueMarginLeft2, textMarginTop * 3 + defaultMargin * 6);
  ctx.fillText('31', valueMarginLeft2, textMarginTop * 3 + defaultMargin * 7);
  ctx.fillText('21', valueMarginLeft2, textMarginTop * 3 + defaultMargin * 8);


  // const image = await loadImage('static/ornn.jpeg');
  // ctx.drawImage(image, 50, 0, 70, 70);

  const out = fs.createWriteStream(__dirname + '/test.png');
  const stream = canvas.createPNGStream();

  stream.pipe(out);
  out.on('finish', () => console.log('end'));

  // console.log(`<img src="${canvas.toDataURL()}" />`);
};

canvasInfo();

export { canvasInfo };