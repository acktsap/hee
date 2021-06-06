import { Formatter, FormatterType } from '../models';

import { CsvFormatter } from './csv-formatter';

function createFormatter(type: FormatterType): Formatter {
  switch (type) {
    case FormatterType.CSV:
      return new CsvFormatter();
  }
}

export { createFormatter };
