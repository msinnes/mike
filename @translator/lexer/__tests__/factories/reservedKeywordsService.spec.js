const Token = require('@shared/classes/Token');

const reservedKeywordServiceFactory = require('../../src/factories/reservedKeywordService');

describe('reservedKeywordServiceFactory', () => {
  let reservedKeywordService;

  beforeEach(() => {
    reservedKeywordService = reservedKeywordServiceFactory(['RESERVED']);
  });

  it('should be a function', () => {
    expect(reservedKeywordServiceFactory).toBeDefined();
    expect(reservedKeywordServiceFactory).toBeInstanceOf(Function);
  });

  describe('isReservedKeyword', () => {
    it('should be a function', () => {
      expect(reservedKeywordService.isReservedKeyword).toBeDefined();
      expect(reservedKeywordService.isReservedKeyword).toBeInstanceOf(Function);
    });

    it('should return true for configured reserved keywords', () => {
      expect(reservedKeywordService.isReservedKeyword('RESERVED')).toBe(true);
      expect(reservedKeywordService.isReservedKeyword('not reserved')).toBe(false);
    });

    it('should not match any case by default', () => {
      expect(reservedKeywordService.isReservedKeyword('RESERVED')).toBe(true);
      expect(reservedKeywordService.isReservedKeyword('reserved')).toBe(false);
    });

    it('should match any case if caseSensitive is set to false', () => {
      reservedKeywordService = reservedKeywordServiceFactory(['RESERVED'], false);
      expect(reservedKeywordService.isReservedKeyword('RESERVED')).toBe(true);
      expect(reservedKeywordService.isReservedKeyword('reserved')).toBe(true);
      expect(reservedKeywordService.isReservedKeyword('not reserved')).toBe(false);
    });
  });

  describe('getReservedToken', () => {
    it('should be a function', () => {
      expect(reservedKeywordService.getReservedToken).toBeDefined();
      expect(reservedKeywordService.getReservedToken).toBeInstanceOf(Function);
    });

    it('should return for configured reserved keywords', () => {
      const token = reservedKeywordService.getReservedToken('RESERVED');

      expect(token).toBeInstanceOf(Token);
      expect(token).toMatchObject({
        type: 'RESERVED',
        value: 'RESERVED',
      });
    });

    it('sould not return a configured keyword if case sensitive', () => {
      const token = reservedKeywordService.getReservedToken('reserved');

      expect(token).toBeUndefined();
    });

    it('should return for configured reserved keywords when not case sensitive', () => {
      reservedKeywordService = reservedKeywordServiceFactory(['RESERVED'], false);
      const token = reservedKeywordService.getReservedToken('reserved');

      expect(token).toBeInstanceOf(Token);
      expect(token).toMatchObject({
        type: 'RESERVED',
        value: 'RESERVED',
      });
    });
  });
});
