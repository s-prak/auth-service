#!./node_modules/.bin/ts-node

/*****
 License
 --------------
 Copyright © 2020-2025 Mojaloop Foundation
 The Mojaloop files are made available by the Mojaloop Foundation under the Apache License, Version 2.0 (the "License") and you may not use these files except in compliance with the License. You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, the Mojaloop files are distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

 Contributors
 --------------
 This is the official list of the Mojaloop project contributors for this file.
 Names of the original copyright holders (individuals or organizations)
 should be listed with a '*' in the first column. People who have
 contributed from an organization can be listed under the organization
 that actually holds the copyright for their contributions (see the
 Mojaloop Foundation for an example). Those individuals should have
 their names indented and be marked with a '-'. Email address can be added
 optionally within square brackets <email>.

 * Mojaloop Foundation
 - Name Surname <name.surname@mojaloop.io>

 - Paweł Marzec <pawel.marzec@modusbox.com>
 --------------
 ******/

// This is required so that once we compile to js
// the js `require()` can resolve the '~' paths
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('module-alias/register')

import Config, { PACKAGE } from './shared/config'
import ServiceServer from './server'
import { Command } from 'commander'

// handle script parameters
const program = new Command(PACKAGE.name)
// when unit tests are run commander runs process.exit on unknown option in jest's command line
program.exitOverride()
try {
  program
    .version(PACKAGE.version)
    .description('auth-service cli')
    .option('-p, --port <number>', 'listen on port', Config.PORT.toString())
    .option('-H, --host <string>', 'listen on host', Config.HOST)
    .parse(process.argv)
} catch (err) {
  console.error(err)
}
// overload Config with script parameters
const options = program.opts()
Config.PORT = options.port
Config.HOST = options.host

// setup & start @hapi server
ServiceServer.run(Config)
