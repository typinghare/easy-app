import { Data, DataCollection, DataMapping, Datum, Metadata } from '@typinghare/extrum'

/**
 * Easy application configuration is based on extrum.
 * @template C The config object type.
 * @link https://www.npmjs.com/package/@typinghare/extrum
 */
export class EasyConfiguration<C extends Data, M extends Metadata> extends DataCollection<C, M> {
    /**
     * Creates a configuration.
     * @param configMapping config mapping.
     */
    public constructor(configMapping: DataMapping<C, M>) {
        super(configMapping)
    }

    /**
     * Loads a config; new config items covers the original ones.
     * @param config The new config.
     */
    public load(config: Partial<C>): void {
        const dataMapping = this.getDataMapping()
        Object.keys(dataMapping)
            .filter((key) => key in config)
            .forEach((key) => {
                ;(dataMapping[key] as Datum).value = config[key]
            })
    }

    /**
     * Clones this configuration, and return the clone.
     */
    public clone(): EasyConfiguration<C, M> {
        return new EasyConfiguration(this.map((datum) => datum.clone())) as EasyConfiguration<C, M>
    }
}
