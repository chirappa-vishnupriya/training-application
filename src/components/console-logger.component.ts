import {Component} from '@loopback/core';
import {LoggerProvider} from '../providers/logger.provider';

export class ConsoleLoggerComponent implements Component {
  providers: {'LOGGER.INJECT': typeof LoggerProvider};
  constructor() {
    this.providers = {
      'LOGGER.INJECT': LoggerProvider,
    };
  }
}
