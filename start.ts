"use strict"

import * as express from 'express';
import { WebApi } from './application';

let port = 9001;
let api = new WebApi(express(), port);
api.run();