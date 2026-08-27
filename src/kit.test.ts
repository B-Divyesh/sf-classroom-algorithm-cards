import { describe, expect, it } from 'vitest';
import { challengeCount, chunk, sanitizeSettings, sheetCount, themes } from './kit';

describe('kit settings', () => {
  it('provides safe defaults for missing and malformed input', () => {
    expect(sanitizeSettings({ teams: Number.NaN })).toEqual({
      minutes: 30,
      teams: 4,
      theme: 'robot-rescue',
      inkSaver: true,
    });
  });

  it('clamps the supported team count', () => {
    expect(sanitizeSettings({ teams: 0 }).teams).toBe(1);
    expect(sanitizeSettings({ teams: 99 }).teams).toBe(8);
    expect(sanitizeSettings({ teams: 3.7 }).teams).toBe(4);
  });

  it('falls back when an unknown runtime theme is supplied', () => {
    expect(sanitizeSettings({ theme: 'unknown' as never }).theme).toBe('robot-rescue');
  });
});

describe('print pack calculations', () => {
  it('adds challenge cards as the lesson gets longer', () => {
    expect([challengeCount(20), challengeCount(30), challengeCount(40)]).toEqual([1, 2, 3]);
  });

  it('accounts for guide, challenge, role, and command sheets', () => {
    const settings = sanitizeSettings({ teams: 4, theme: 'robot-rescue' });
    expect(sheetCount(settings)).toBe(11);
  });

  it('keeps every generated card when paginating', () => {
    const cards = themes['shape-machine'].commands;
    expect(chunk(cards, 8).flat()).toEqual(cards);
    expect(chunk(cards, 8)).toHaveLength(2);
  });
});
