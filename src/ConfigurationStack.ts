import { Data, Metadata } from '@typinghare/extrum'
import { EasyConfiguration } from './EasyConfiguration'

/**
 * Configuration stack. New configuration covers the old configuration.
 */
export class ConfigurationStack<C extends Data, M extends Metadata> {
    /**
     * Current configuration.
     * @private
     */
    private readonly currentConfiguration: EasyConfiguration<C, M>

    /**
     * Mapping from names to configurations.
     * @private
     */
    private readonly byName = new Map<string, EasyConfiguration<C, M>>()

    /**
     * Creates a configuration stack.
     * @param name The name of the basic configuration.
     * @param configuration The basic configuration.
     */
    public constructor(name: string, configuration: EasyConfiguration<C, M>) {
        this.currentConfiguration = configuration.clone()
        this.byName.set(name, configuration)
    }

    /**
     * Pushes a configuration to this stack.
     * @param name
     * @param configuration
     */
    public push(name: string, configuration: EasyConfiguration<C, M>): void {
        this.byName.set(name, configuration)
        this.currentConfiguration.load(configuration.getData())
    }

    /**
     * Returns the current configuration.
     */
    public getCurrentConfiguration(): EasyConfiguration<C, M> {
        return this.currentConfiguration
    }

    /**
     * Gets a configuration by a specific name.
     * @param name The name of the configuration to get.
     */
    public getConfiguration(name: string): EasyConfiguration<C, M> {
        const configuration = this.byName.get(name)
        if (configuration === undefined) {
            throw new ConfigurationNotFoundException(name)
        }

        return configuration
    }
}

/**
 * Configuration not found exception.
 */
export class ConfigurationNotFoundException extends Error {
    public constructor(private readonly nameOfConfiguration: string) {
        super(`Configuration not found: ${nameOfConfiguration}`)
    }

    /**
     * Returns the name of configuration not found.
     */
    public getNameOfConfiguration(): string {
        return this.nameOfConfiguration
    }
}
