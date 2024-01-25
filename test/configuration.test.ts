import { EasyConfiguration, ConfigurationNotFoundException, EasyConfigurationStack } from '../src'
import { DatumCreator } from '@typinghare/extrum'

describe('Basic tests', () => {
    interface Config {
        name: string
        age: number
        isCitizen: boolean
    }

    interface ConfigMetadata {
        description: string
    }

    it('Test configuration stack', () => {
        const datumCreator = new DatumCreator({ description: '' })
        const basicConfiguration = new EasyConfiguration<Config, ConfigMetadata>({
            name: datumCreator.create('James Chan'),
            age: datumCreator.create(24),
            isCitizen: datumCreator.create(false),
        })

        const userConfiguration = new EasyConfiguration<Config, ConfigMetadata>({
            name: datumCreator.create('Zhuojian Chen'),
            age: datumCreator.create(25),
            isCitizen: datumCreator.create(false),
        })

        const configurationStack = new EasyConfigurationStack('basic', basicConfiguration)
        configurationStack.push('user', userConfiguration)

        const currentConfiguration = configurationStack.getCurrentConfiguration()
        expect(currentConfiguration.getValue('name')).toBe('Zhuojian Chen')
        expect(currentConfiguration.getValue('isCitizen')).toBe(false)

        const myBasicConfiguration = configurationStack.getConfiguration('basic')
        expect(myBasicConfiguration.getValue('age')).toBe(24)

        expect(() => {
            configurationStack.getConfiguration('not-exist')
        }).toThrow(ConfigurationNotFoundException)

        try {
            configurationStack.getConfiguration('not-exist')
        } catch (e) {
            expect((e as ConfigurationNotFoundException).getNameOfConfiguration()).toBe('not-exist')
        }
    })
})
