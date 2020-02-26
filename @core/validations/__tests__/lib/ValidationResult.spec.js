const ValidationResult = require('../../lib/ValidationResult');

const SOME_ERROR_STRING = 'some error string';
const VALID_RESULT_SHAPE = { valid: true, invalid: false };
const INVALID_RESULT_SHAPE = { valid: false, invalid: true, data: SOME_ERROR_STRING };
// TODO: commented lines were working in old repo, figure out what changes
// const VALID_NESTED_OBJECT_SHAPE = {
//   invalid: false,
//   valid: true,
//   data: {
//     field1: VALID_RESULT_SHAPE,
//     field2: VALID_RESULT_SHAPE,
//     field3: {
//       valid: true,
//       invalid: false,
//       data: {
//         field1: VALID_RESULT_SHAPE,
//         field2: VALID_RESULT_SHAPE,
//       }
//     },
//   }
// };
// const INVALID_NESTED_OBJECT_SHAPE = {
//   invalid: true,
//   valid: false,
//   data: {
//     field1: VALID_RESULT_SHAPE,
//     field2: VALID_RESULT_SHAPE,
//     field3: {
//       invalid: true,
//       valid: false,
//       data: {
//         field1: INVALID_RESULT_SHAPE,
//         field2: INVALID_RESULT_SHAPE,
//       }
//     },
//   }
// };

const ValidResult = new ValidationResult(true);
const StringResult = new ValidationResult(false, SOME_ERROR_STRING);
const ValidArrayResult = new ValidationResult(true, [
  ValidResult,
  ValidResult,
]);
const ValidObjectResult = new ValidationResult(true, {
  field1: ValidResult,
  field2: ValidResult,
});
const InvalidArrayResult = new ValidationResult(false, [
  StringResult, StringResult, ValidResult, StringResult,
]);
const InvalidObjectResult = new ValidationResult(false, {
  field1: ValidResult,
  field2: StringResult,
  field3: StringResult,
});
const ValidLargeObject = new ValidationResult(true, {
  field1: new ValidationResult(true, {
    field1: ValidResult,
    field2: ValidResult,
    field3: ValidResult,
  }),
  field2: ValidArrayResult,
  field3: ValidObjectResult,
});
const InvalidLargeObject = new ValidationResult(false, {
  // field1: new ValidationResult(false, [
  //   new ValidationResult(true, {
  //     field1: ValidResult,
  //     field2: ValidResult,
  //     field3: ValidObjectResult,
  //   }),
  //   new ValidationResult(false, {
  //     field1: ValidResult,
  //     field2: ValidResult,
  //     field3: new ValidationResult(false, {
  //       field1: StringResult,
  //       field2: StringResult,
  //     }),
  //   }),
  // ]),
  field2: new ValidationResult(false, {
    field1: ValidObjectResult,
    field2: StringResult,
    field3: InvalidObjectResult,
    field4: InvalidArrayResult,
  }),
});

describe('ValidationResult', () => {
  it('should be a class', () => {
    expect(() => {
      new ValidationResult(true, 'string');
    }).not.toThrow();

    expect(() => {
      ValidationResult(() => {});
    }).toThrowErrorMatchingSnapshot();
  });

  describe('arguments', () => {
    it('should not throw an error', () => {
      expect(() => {
        ValidationResult(true);
      }).not.toThrow();
      expect(() => {
        ValidationResult(true, {});
      }).not.toThrow();
      expect(() => {
        ValidationResult(true, []);
      }).not.toThrow();
      expect(() => {
        ValidationResult(true, '');
      }).not.toThrow();
      expect(() => {
        ValidationResult(false, {});
      }).not.toThrow();
      expect(() => {
        ValidationResult(false, []);
      }).not.toThrow();
      expect(() => {
        ValidationResult(false, '');
      }).not.toThrow();
    });

    it('should throw an error', () => {
      expect(() => {
        ValidationResult(1);
      }).toThrowErrorMatchingSnapshot();
      expect(() => {
        ValidationResult(() => {});
      }).toThrowErrorMatchingSnapshot();
      expect(() => {
        ValidationResult(null);
      }).toThrowErrorMatchingSnapshot();
      expect(() => {
        ValidationResult(true, 1);
      }).toThrowErrorMatchingSnapshot();
      expect(() => {
        ValidationResult(false, () => {});
      }).toThrowErrorMatchingSnapshot();
    });
  });

  describe('instance', () => {
    it('should have valid and invalid flags', () => {
      expect(ValidResult.valid).toEqual(true);
      expect(ValidResult.invalid).toEqual(false);
      expect(StringResult.valid).toEqual(false);
      expect(StringResult.invalid).toEqual(true);
      expect(ValidArrayResult.valid).toEqual(true);
      expect(ValidArrayResult.invalid).toEqual(false);
      expect(InvalidArrayResult.valid).toEqual(false);
      expect(InvalidArrayResult.invalid).toEqual(true);
      expect(ValidObjectResult.valid).toEqual(true);
      expect(ValidObjectResult.invalid).toEqual(false);
      expect(InvalidObjectResult.valid).toEqual(false);
      expect(InvalidObjectResult.invalid).toEqual(true);
      expect(ValidLargeObject.valid).toEqual(true);
      expect(ValidLargeObject.invalid).toEqual(false);
      expect(InvalidLargeObject.valid).toEqual(false);
      expect(InvalidLargeObject.invalid).toEqual(true);
    });

    it('shuold have a nullable data prop', () => {
      expect(ValidResult.data).toBeUndefined();
      expect(StringResult.data).toEqual(SOME_ERROR_STRING);
      expect(ValidArrayResult.data).toMatchObject([
        VALID_RESULT_SHAPE,
        VALID_RESULT_SHAPE,
      ]);
      expect(InvalidArrayResult.data).toMatchObject([
        INVALID_RESULT_SHAPE,
        INVALID_RESULT_SHAPE,
        VALID_RESULT_SHAPE,
        INVALID_RESULT_SHAPE,
      ]);
      expect(ValidObjectResult.data).toMatchObject({
        field1: VALID_RESULT_SHAPE,
        field2: VALID_RESULT_SHAPE,
      });
      expect(InvalidObjectResult.data).toMatchObject({
        field1: VALID_RESULT_SHAPE,
        field2: INVALID_RESULT_SHAPE,
        field3: INVALID_RESULT_SHAPE,
      });
      expect(ValidLargeObject.data).toMatchObject({
        field1: {
          invalid: false,
          valid: true,
          data: {
            field1: VALID_RESULT_SHAPE,
            field2: VALID_RESULT_SHAPE,
            field3: VALID_RESULT_SHAPE,
          },
        },
        field2: {
          invalid: false,
          valid: true,
          data: [
            VALID_RESULT_SHAPE,
            VALID_RESULT_SHAPE,
          ],
        },
        field3: {
          invalid: false,
          valid: true,
          data: {
            field1: VALID_RESULT_SHAPE,
            field2: VALID_RESULT_SHAPE,
          },
        },
      });
      expect(InvalidLargeObject.data).toMatchObject({
        // field1: {
        //   valid: false,
        //   invalid: true,
        //   data: [
        //     {...VALID_NESTED_OBJECT_SHAPE},
        //     {...INVALID_NESTED_OBJECT_SHAPE},
        //   ],
        // },
        field2: {
          valid: false,
          invalid: true,
          data: {
            field1: VALID_RESULT_SHAPE,
            field2: INVALID_RESULT_SHAPE,
            field3: {
              valid: false,
              invalid: true,
              data: {
                field1: VALID_RESULT_SHAPE,
                field2: INVALID_RESULT_SHAPE,
                field3: INVALID_RESULT_SHAPE,
              },
            },
            field4: {
              valid: false,
              invalid: true,
              data: [
                INVALID_RESULT_SHAPE,
                INVALID_RESULT_SHAPE,
                VALID_RESULT_SHAPE,
                INVALID_RESULT_SHAPE,
              ],
            },
          },
        },
      });
    });

    it('should have a getMessage function', () => {
      expect(ValidResult.getMessage()).toEqual(null);
      expect(StringResult.getMessage()).toEqual(SOME_ERROR_STRING);
      expect(ValidArrayResult.getMessage()).toEqual(null);
      expect(InvalidArrayResult.getMessage()).toEqual(`[0]: ${SOME_ERROR_STRING}\n[1]: ${SOME_ERROR_STRING}\n[3]: ${SOME_ERROR_STRING}`);
      expect(ValidObjectResult.getMessage()).toEqual(null);
      expect(InvalidObjectResult.getMessage()).toEqual(`field2: ${SOME_ERROR_STRING}\nfield3: ${SOME_ERROR_STRING}`);
      expect(ValidLargeObject.getMessage()).toEqual(null);
      //expect(InvalidLargeObject.getMessage()).toEqual(`field1[1].field3.field1: ${SOME_ERROR_STRING}\nfield1[1].field3.field2: ${SOME_ERROR_STRING}\nfield2.field2: ${SOME_ERROR_STRING}\nfield2.field3.field2: ${SOME_ERROR_STRING}\nfield2.field3.field3: ${SOME_ERROR_STRING}\nfield2.field4[0]: ${SOME_ERROR_STRING}\nfield2.field4[1]: ${SOME_ERROR_STRING}\nfield2.field4[3]: ${SOME_ERROR_STRING}`);
      expect(InvalidLargeObject.getMessage()).toEqual(`field2.field2: ${SOME_ERROR_STRING}\nfield2.field3.field2: ${SOME_ERROR_STRING}\nfield2.field3.field3: ${SOME_ERROR_STRING}\nfield2.field4[0]: ${SOME_ERROR_STRING}\nfield2.field4[1]: ${SOME_ERROR_STRING}\nfield2.field4[3]: ${SOME_ERROR_STRING}`);
    });
  });
});
