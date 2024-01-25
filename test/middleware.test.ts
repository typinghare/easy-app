import { EasyConfigurationStack, EasyApplication, EasyConfiguration } from '../src'
import { EasyMiddleware } from '../src/EasyMiddleware'
import { Datum, Metadata } from '@typinghare/extrum'

describe('Test middleware', () => {
    interface Config {
        name: string
    }

    class Middleware extends EasyMiddleware<Application> {}

    class Application extends EasyApplication<Middleware> {
        protected readonly configurationStack

        public constructor() {
            super([])

            this.configurationStack = new EasyConfigurationStack<Config, Metadata>(
                'Default',
                new EasyConfiguration<Config, Metadata>({
                    name: Datum.of('0'),
                })
            )
        }

        public getConfiguration(): EasyConfiguration<Config, Metadata> {
            return this.configurationStack.getCurrentConfiguration()
        }
    }

    class CommonMiddleware extends Middleware {
        public override init(): void {
            const configuration = this.application.getConfiguration()
            configuration.getDatum('name').setValue('1')
        }
    }

    it('Test middleware', () => {
        const application = new Application()
        application.registerMiddleware(CommonMiddleware)

        expect(application.getConfiguration().getValue('name')).toBe('1')
    })
})
