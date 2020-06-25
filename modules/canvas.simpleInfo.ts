import { createCanvas, loadImage, registerFont } from 'canvas';
import { DOUBLE_BYTE_SPACE } from './constants';
import fs from 'fs';

interface SimpleInfo {
  characterId: string;
  serverId: string;
  
  serverName: string;
  characterName: string;
  level: number;
  jobGrowName: string;
  guildName: string;
  adventureName: string;
}

const getSimpleInfoBuffer = async ({ characterId, characterName, serverId, serverName, level, jobGrowName, guildName = '', adventureName }: SimpleInfo) => {

  // Remove Parameter

  // Load Font
  registerFont('.font/GmarketSans/GmarketSansTTFLight.ttf', { family: 'GmarketSansLight'});
  registerFont('.font/GmarketSans/GmarketSansTTFMedium.ttf', { family: 'GmarketSansMedium'});
  registerFont('.font/GmarketSans/GmarketSansTTFBold.ttf', { family: 'GmarketSansBold'});

  const fontBold = `GmarketSansBold`;
  const fontLight = `GmarketSansLight`;
  const fontMedium = `GmarketSansMedium`;

  // Load Image

  const characterBackgroundImage = await loadImage('static/character_background.jpg');
  const characterImage = await loadImage(`https://img-api.neople.co.kr/df/servers/${serverId}/characters/${characterId}?zoom=1`);
  
  
  // Init Constants
  
  const canvasWidth = 520;
  const canvasHeight = 290;
  
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const ctx = canvas.getContext('2d');
  
  const characterBackgroundImageSize = {
    width: 220,
    height: canvasHeight,
  };
  const characterImageSize = {
    width: 200,
    height: 230,
  }
  const characterDrawPosition = {
    x1: (characterBackgroundImageSize.width - characterImageSize.width) / 2,
    y1: (characterBackgroundImageSize.height - characterImageSize.height) / 2,
    x2: (characterBackgroundImageSize.width - characterImageSize.width) / 2 + characterImageSize.width,
    y2: (characterBackgroundImageSize.height - characterImageSize.height) / 2 + characterImageSize.height,
  };

  const fontTop = 50;
  const fontLeft = 250;

  // Drawing

  // 1 - Fill background
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // 2 - Draw Character
  ctx.drawImage(characterBackgroundImage, 0, 0, characterBackgroundImageSize.width, characterBackgroundImageSize.height);
  ctx.drawImage(characterImage, characterDrawPosition.x1, characterDrawPosition.y1, characterDrawPosition.x2, characterDrawPosition.y2);

  // 3 - Draw Simple Information
  // next font top -> prev font size * 1.5 + next font size / 2

  ctx.fillStyle = '#fff';

  // server
  ctx.font = `20px ${fontMedium}`;
  ctx.fillText(serverName, fontLeft, fontTop);
  // user
  ctx.font = `40px ${fontBold}`;
  ctx.fillText(characterName, fontLeft, fontTop + 50);
  // level, job
  ctx.font = `20px ${fontLight}`;
  ctx.fillText(`Lv.${level}`, fontLeft, fontTop + 100);
  ctx.fillText(`${jobGrowName}`, fontLeft + 82, fontTop + 100);

  ctx.fillText(guildName, fontLeft + 82, fontTop + 150);
  ctx.fillText(adventureName, fontLeft + 82, fontTop + 180);

  ctx.font = `18px ${fontLight}`;
  ctx.fillStyle = '#808080';
  ctx.fillText('길드', fontLeft, fontTop + 150);
  ctx.fillText('모험단', fontLeft, fontTop + 180);

  return canvas.toBuffer('image/png');
  
};

export { getSimpleInfoBuffer };