import { EasyConfiguration, ConfigurationStack, EasyApplication } from '../src'
import { Middleware } from '../src/Middleware'
import { Datum, Metadata } from '@typinghare/extrum'

describe('Test middleware', () => {
    interface Config {
        name: string
    }

    class MyApplication extends EasyApplication {
        protected readonly configurationStack

        public constructor() {
            super([])

            this.configurationStack = new ConfigurationStack<Config, Metadata>(
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

    class CommonMiddleware extends Middleware<MyApplication> {
        public override init(): void {
            const configuration = this.application.getConfiguration()
            configuration.getDatum('name').setValue('1')
        }
    }

    it('', () => {
        const application = new MyApplication()
        application.registerMiddleware(CommonMiddleware)

        expect(application.getConfiguration().getValue('name')).toBe('1')
    })
})
